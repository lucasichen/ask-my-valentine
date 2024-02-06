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
const upload = multer({ storage: storage });

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.post('/save', upload.single('gif'), async (req, res) => {
  try {
    const name = req.body.name
    const gifData = req.file.buffer; 
    const base64Gif = gifData.toString('base64');
    let obj = {};
    obj["name"] = name;
    obj["gif"] = base64Gif;

    const dataRef = await db.collection('valentines').add(obj);
    console.log(gifData);

    res.status(201).json({ message: 'new link is' + dataRef.id,
    ID: dataRef.id,
    data: base64Gif});
  } catch (error) {
    console.error('Error saving data to Database:', error);
    res.status(500).send('Internal Server Error');
  }
})

// Export the Express API
module.exports = app;