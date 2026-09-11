// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwvPmUsM_hH6jd8qijgBiOhJWBCiDiSus",
  authDomain: "comics-mv-react.firebaseapp.com",
  projectId: "comics-mv-react",
  storageBucket: "comics-mv-react.firebasestorage.app",
  messagingSenderId: "2867310882",
  appId: "1:2867310882:web:10f5d135ac3d262258357b"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
export default appFirebase;