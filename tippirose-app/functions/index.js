const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: "https://tippirose-london.firebaseio.com"
});
let db = admin.firestore();


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//


exports.login = functions.https.onCall(async (data, context) => {


    admin.auth().getUserByEmail(email)






});
