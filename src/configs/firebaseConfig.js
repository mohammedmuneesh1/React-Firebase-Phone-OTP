// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCB2ChxGfnhBjOPgkIvvruI1GWel4aXejg",
    authDomain: "otp-verification-ef8c6.firebaseapp.com",
    projectId: "otp-verification-ef8c6",
    storageBucket: "otp-verification-ef8c6.appspot.com",
    messagingSenderId: "499616065181",
    appId: "1:499616065181:web:029e295ec956f6f813d674",
    measurementId: "G-NYTRE6G2N9"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)