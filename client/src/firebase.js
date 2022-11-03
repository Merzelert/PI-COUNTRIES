// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATJCjBr4T_dMBFFM7etUiACFkZo2yyyeA",
  authDomain: "pi-henry-5d80b.firebaseapp.com",
  projectId: "pi-henry-5d80b",
  storageBucket: "pi-henry-5d80b.appspot.com",
  messagingSenderId: "137458909171",
  appId: "1:137458909171:web:b177e0f975ca3e528c5c86"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)