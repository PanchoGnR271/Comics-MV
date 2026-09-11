import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDwvPmUsM_hH6jd8qijgBiOhJWBCiDiSus",
  authDomain: "comics-mv-react.firebaseapp.com",
  projectId: "comics-mv-react",
  storageBucket: "comics-mv-react.firebasestorage.app",
  messagingSenderId: "2867310882",
  appId: "1:2867310882:web:10f5d135ac3d262258357b"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);