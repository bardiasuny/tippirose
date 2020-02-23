// var admin = require('firebase-admin');


// var firebaseConfig = {
//   apiKey: "AIzaSyCuQ8xAlhyK27XUUZ2whOKTjhTQjI5C2Ps",
//   authDomain: "tippirose-london.firebaseapp.com",
//   databaseURL: "https://tippirose-london.firebaseio.com",
//   projectId: "tippirose-london",
//   storageBucket: "tippirose-london.appspot.com",
//   messagingSenderId: "1059883041713",
//   appId: "1:1059883041713:web:1e98080ea17d1e041d7390",
//   measurementId: "G-CHZ99DPED4"
// };


var firebaseAdmin = require("firebase-admin");

var serviceAccount = require("../tippirose-london-firebase-adminsdk-s0t8m-be83e393dc.json");

const admin = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: "https://tippirose-london.firebaseio.com"
});


//const firebase = admin.initializeApp(firebaseConfig);
// firebase.initializeApp(firebaseConfig);
// firebase.firestore();

module.exports = admin;
