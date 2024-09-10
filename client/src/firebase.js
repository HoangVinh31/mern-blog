// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-ba7d7.firebaseapp.com",
  projectId: "mern-blog-ba7d7",
  storageBucket: "mern-blog-ba7d7.appspot.com",
  messagingSenderId: "392033925079",
  appId: "1:392033925079:web:f257ba57b7c81f5ebcbd92",
  measurementId: "G-2J8JP7FM0E",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
