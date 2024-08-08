// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCtNTwskXqNh8q9ulahUmUtujMDNpnxtkk",
  authDomain: "writtingbuddy-79925.firebaseapp.com",
  projectId: "writtingbuddy-79925",
  storageBucket: "writtingbuddy-79925.appspot.com",
  messagingSenderId: "511184935982",
  appId: "1:511184935982:web:b6d7ef4d189a19ddf553bf",
  measurementId: "G-MVG6T9EJCE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleAuth = new GoogleAuthProvider();
