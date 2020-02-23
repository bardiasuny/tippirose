import { initializeApp } from 'firebase';


var firebaseConfig = {
  apiKey: "AIzaSyCuQ8xAlhyK27XUUZ2whOKTjhTQjI5C2Ps",
  authDomain: "tippirose-london.firebaseapp.com",
  databaseURL: "https://tippirose-london.firebaseio.com",
  projectId: "tippirose-london",
  storageBucket: "tippirose-london.appspot.com",
  messagingSenderId: "1059883041713",
  appId: "1:1059883041713:web:1e98080ea17d1e041d7390",
  measurementId: "G-CHZ99DPED4"
};



const firebase = initializeApp(firebaseConfig);


//const firebase = admin.initializeApp(firebaseConfig);
// firebase.initializeApp(firebaseConfig);
// firebase.firestore();

export default firebase;
