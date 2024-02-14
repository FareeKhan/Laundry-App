// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC_ul70c2_YDxu3p8_pOhdkp6V61ZtBG-Q",
  authDomain: "laundryapp-e9445.firebaseapp.com",
  projectId: "laundryapp-e9445",
  storageBucket: "laundryapp-e9445.appspot.com",
  messagingSenderId: "215425111588",
  appId: "1:215425111588:web:1f805ac1554c1a50dfeab1",
  measurementId: "G-YB0028WFJT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const auth = getAuth(app)
const db = getFirestore(app)

export {auth,db,app}