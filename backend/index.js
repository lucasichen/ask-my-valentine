const express = require('express');
const multer = require('multer');
const app = express();
app.use(express.json());
require('dotenv').config();
// cors is needed to allow cross-origin requests
const cors = require('cors');
app.use(cors());
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');


// Set up Firebase Admin SDK
const admin = require('firebase-admin');
const serviceAccount = {
  "type": "service_account",
  "project_id": process.env.FIREBASE_PROJECT_ID,
  "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID.replace(/\\n/g, '\n'),
  "private_key": process.env.FIREBASE_PRIVATE_KEY,
  "client_email": process.env.FIREBASE_CLIENT_EMAIL,
  "client_id": process.env.FIREBASE_CLIENT_ID,
  "auth_uri": process.env.FIREBASE_AUTH_URI,
  "token_uri": process.env.FIREBASE_TOKEN_URI,
  "auth_provider_x509_cert_url": process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  "client_x509_cert_url": process.env.FIREBASE_CLIENT_X509_CERT_URL,
  "universe_domain": process.env.FIREBASE_UNIVERSE_DOMAIN,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET
});

const bucket = admin.storage().bucket();
const curDate = Date.now();
// Set up Multer for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Destination directory
  },
  filename: function (req, file, cb) {
    cb(null, curDate + '-' + file.originalname); // File naming convention
  }
});

const upload = multer({ storage: storage });

// Route to handle file upload
app.post('/api/save', async (req, res) => {
  upload.array('files', 2)(req, res, async (err) => {
    if (err) {
      console.error('Error uploading files:', err);
      return res.status(500).send('Error uploading files.');
    }

    try {
      if (!req.files || req.files.length !== 2) {
        return res.status(400).send('Please upload exactly 2 files.');
      }

      const uploadedFiles = [];
      console.log('Initiating upload');
      // Generate a unique folder name using uuid
      const folderName = uuid.v4();

      // Upload files to Firebase Storage
      for (const file of req.files) {
        const filePath = 'uploads/' + curDate + '-' + file.originalname; // Include folder name in the file path
        const fileName = curDate + '-' + file.originalname; // Include folder name in the file path
        console.log('Uploading file:', fileName);
        await bucket.upload(filePath, {
          destination: `${folderName}/${fileName}`,
        });
      };

      // delete temporary files
      req.files.forEach(file => {
        fs.unlinkSync(file.path
        );
      });
      console.log('Successfully uploaded files')
      // Respond with uploaded file URLs
      res.status(201).json({ valentineId: folderName });
    } catch (error) {
      console.error('Error uploading files:', error);
      res.status(500).send('Error uploading files.');
    }
  });
});

app.get('/api/get-valentine/:folderName', async (req, res) => {
  try {
    const folderName = req.params.folderName;
    console.log('Retrieving files from folder:', folderName);
    const [files] = await bucket.getFiles({ prefix: folderName + '/' });
    console.log('Successfully retrieved files');
    const gifs = []
    const fileData = await Promise.all(files.map(async file => {
      const [fileData] = await file.download();
      const base64Data = fileData.toString('base64');
      gifs.push(base64Data);
    }));
    console.log('Returning file data');
    res.json({ gif1: gifs[0], gif2: gifs[1] });
  } catch (error) {
    console.error('Error retrieving files:', error);
    res.status(500).send('Error retrieving files.');
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Export the Express API
module.exports = app;
