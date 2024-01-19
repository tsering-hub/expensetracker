// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNmWT_lXQOhc7Qckpc4F8wZMm6IZSmqFY",
  authDomain: "expense-tracker-app-f62a3.firebaseapp.com",
  projectId: "expense-tracker-app-f62a3",
  storageBucket: "expense-tracker-app-f62a3.appspot.com",
  messagingSenderId: "8902503497",
  appId: "1:8902503497:web:d6af1a4f95e2a998096398",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
