// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD-jvqlxkX4k8smfiRLjU8JFLTr5YHqvtQ",
    authDomain: "nutrifit-auth.firebaseapp.com",
    projectId: "nutrifit-auth",
    storageBucket: "nutrifit-auth.appspot.com",
    messagingSenderId: "232612976408",
    appId: "1:232612976408:web:91ae27b5a2e74e3e8d306d",
    measurementId: "G-MFZV18QEDP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;