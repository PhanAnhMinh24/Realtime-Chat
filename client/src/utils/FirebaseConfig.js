import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyCW0RdQQWawkghelIVD7C9N_gnW623dgwo",
    authDomain: "realtime-chat-45493.firebaseapp.com",
    projectId: "realtime-chat-45493",
    storageBucket: "realtime-chat-45493.firebasestorage.app",
    messagingSenderId: "64666228967",
    appId: "1:64666228967:web:9a9fd8766b1ee359a76a42",
    measurementId: "G-5RE3M5QR6D"
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);