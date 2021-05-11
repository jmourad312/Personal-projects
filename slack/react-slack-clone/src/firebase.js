import '../node_modules/@firebase/auth'
import '../node_modules/@firebase/database'
import '../node_modules/@firebase/storage'
import firebase from '../node_modules/@firebase/app'

const firebaseConfig = {
  apiKey: "AIzaSyDi3gyPeWX0vE-scSBHYdAFmAw33VduPZY",
  authDomain: "react-slack-858da.firebaseapp.com",
  databaseURL:
    "https://react-slack-858da-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "react-slack-858da",
  storageBucket: "react-slack-858da.appspot.com",
  messagingSenderId: "1588932417",
  appId: "1:1588932417:web:a9b9772311c3ed936ebbc0",
  measurementId: "G-EE3R8YZKTM",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;