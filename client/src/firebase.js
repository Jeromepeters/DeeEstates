// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "dee-estate.firebaseapp.com",
  projectId: "dee-estate",
  storageBucket: "dee-estate.appspot.com",
  messagingSenderId: "787770417855",
  appId: "1:787770417855:web:6acc67d25fcf40d5e51c0a",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
