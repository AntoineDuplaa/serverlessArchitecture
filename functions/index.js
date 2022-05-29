// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

exports.addUser = functions.https.onCall(async (data, context) => {
  return await admin.firestore().collection('Users').add(data);
});

exports.addMessage = functions.https.onCall(async (data, context) => {
  return await admin.firestore().collection('Users').add(data);
});
