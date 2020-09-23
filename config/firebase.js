var admin = require("firebase-admin");
require('dotenv').config();

var serviceAccount = JSON.parse(process.env.FIREBASE_KEY);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_URL,
});

const db = admin.firestore();

module.exports = db;