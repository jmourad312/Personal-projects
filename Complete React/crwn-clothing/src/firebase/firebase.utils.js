import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAuvVI16Owz_eUGtxwGlSeIvv886pDHT24",
  authDomain: "crwn-clothing-24ce7.firebaseapp.com",
  projectId: "crwn-clothing-24ce7",
  storageBucket: "crwn-clothing-24ce7.appspot.com",
  messagingSenderId: "368452182892",
  appId: "1:368452182892:web:dc69120994b9616c048949",
  measurementId: "G-STFYQ4L92E",
};

firebase.initializeApp(config);

export const auth = firebase.auth();

export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
