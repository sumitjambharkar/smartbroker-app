import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBIKz2MQ2l4iQJdo4Fu5mPXOK5bXtkIdyY",
  authDomain: "smartbroker-5118e.firebaseapp.com",
  projectId: "smartbroker-5118e",
  storageBucket: "smartbroker-5118e.appspot.com",
  messagingSenderId: "695445896125",
  appId: "1:695445896125:web:4b034addf03f2ee8c7f0d4"
};

// firebase.initializeApp(firebaseConfig);


// export default firebase

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

export { auth,db };
export default firebase;
