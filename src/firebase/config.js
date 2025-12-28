// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCt7XjeSaDt__g8hfnSgQ5lSARtBG-RL4s",
  authDomain: "project-management-81881.firebaseapp.com",
  projectId: "project-management-81881",
  storageBucket: "project-management-81881.firebasestorage.app",
  messagingSenderId: "844213359176",
  appId: "1:844213359176:web:8fa292e5c8df79edf2be7d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()
const db = getFirestore(app)

export { auth, googleProvider, db }