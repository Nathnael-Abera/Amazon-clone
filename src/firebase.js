// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import  "firebase/compat/auth";
import  "firebase/compat/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWwS5mbx21Fb9pgDYY5KLTpestjrWW2Cc",
  authDomain: "clone-147f6.firebaseapp.com",
  projectId: "clone-147f6",
  storageBucket: "clone-147f6.appspot.com",
  messagingSenderId: "735955620429",
  appId: "1:735955620429:web:1fa3c7e7be259c72d40204",
  measurementId: "G-QFR1WYQ752"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = app.firestore();
export {auth,database}