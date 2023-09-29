import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDjI_rxKnpVO7hnTQ_ldqKc4jZzaRs277w",
    authDomain: "passwordmanager-b5459.firebaseapp.com",
    projectId: "passwordmanager-b5459",
    storageBucket: "passwordmanager-b5459.appspot.com",
    messagingSenderId: "1038763486844",
    appId: "1:1038763486844:web:475f952e8fedb56a3f63f9",
    measurementId: "G-NX2MWNRG44"
  };

  export const FIREBASE_APP = initializeApp(firebaseConfig) ;
  export const FIREBASE_AUTH = getAuth(FIREBASE_APP) ;
  export const FIRESTORE_DB = getFirestore(FIREBASE_APP) 