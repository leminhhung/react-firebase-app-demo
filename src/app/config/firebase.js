import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/database';
import 'firebase/compat/auth';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAgr9lr0UcoUma7QdGgUHYPbgxWpTnvHJE",
    authDomain: "react-firesrtore-research.firebaseapp.com",
    projectId: "react-firesrtore-research",
    storageBucket: "react-firesrtore-research.appspot.com",
    messagingSenderId: "106890949839",
    appId: "1:106890949839:web:6d956eef46a07e138cb3ba",
    measurementId: "G-9R84N6HDQV"
  }

  firebase.initializeApp(firebaseConfig);
  firebase.firestore();

  export default firebase;