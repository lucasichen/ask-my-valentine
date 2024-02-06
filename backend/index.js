const express = require('express');
const multer = require('multer');
const app = express();
app.use(express.json());
require('dotenv').config();
// cors is needed to allow cross-origin requests
const cors = require('cors');
app.use(cors());


// Set up Firebase Admin SDK
const admin = require('firebase-admin');
const serviceAccount = {
  "type": "service_account",
  "project_id": process.env.FIREBASE_PROJECT_ID,
  "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID.replace(/\\n/gm, "\n"),
  "private_key": process.env.FIREBASE_PRIVATE_KEY,
  "client_email": process.env.FIREBASE_CLIENT_EMAIL,
  "client_id": process.env.FIREBASE_CLIENT_ID,
  "auth_uri": process.env.FIREBASE_AUTH_URI,
  "token_uri": process.env.FIREBASE_TOKEN_URI,
  "auth_provider_x509_cert_url": process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  "client_x509_cert_url": process.env.FIREBASE_CLIENT_X509_CERT_URL,
  "universe_domain": process.env.FIREBASE_UNIVERSE_DOMAIN,
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Set up Firestore
const db = admin.firestore();

// Set up multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).array('gifs', 2);

app.post('/api/save', async (req, res) => {
  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      // Handle multer errors
      console.error('Multer Error:', err.message);
      return res.status(400).json({ error: 'File upload error' });
    } else if (err) {
      // Handle other errors
      console.error('Error:', err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    // Get binary data for each GIF
    const gifData1 = req.files[0].buffer;
    const gifData2 = req.files[1].buffer;

    // Convert binary GIF data to base64
    const base64Gif1 = gifData1.toString('base64');
    const base64Gif2 = gifData2.toString('base64');

    let obj = {};
    obj["name"] = "name";
    obj["gif"] = base64Gif1;
    obj["end_gif"] = base64Gif2;

    const dataRef = await db.collection('valentines').add(obj);
    res.status(201).json({ message: 'new link is ' + dataRef.id,
    ID: dataRef.id});
  })
})

app.get('/api/getGifs/:docID', async(req, res) => {
  const documentId = req.params.docID;

  // Retrieve document from Firestore
  const documentSnapshot = await db.collection('valentines').doc(documentId).get();

  if (!documentSnapshot.exists) {
    return res.status(404).json({ error: 'Document not found' });
  }

  // Extract base64 GIF data from the document
  const base64Gif1 = documentSnapshot.data().gif;
  const base64Gif2 = documentSnapshot.data().end_gif;

  // Convert base64 data to binary buffers
  const gifBuffer1 = Buffer.from(base64Gif1, 'base64');
  const gifBuffer2 = Buffer.from(base64Gif2, 'base64');

  // Set the response content type to "application/json"
  res.contentType('application/json');

  res.json({
    gif1: gifBuffer1,
    gif2: gifBuffer2,
  });
})

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Export the Express API
module.exports = app;