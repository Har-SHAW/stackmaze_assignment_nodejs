var admin = require("firebase-admin");

var serviceAccount = require("./key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://stackmaze-database.firebaseio.com",
});

const db = admin.firestore();

module.exports = db;
