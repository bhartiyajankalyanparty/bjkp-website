import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyBIq9s8Ix225swy8U8KAxTYduGcBcMoQQQ",
  authDomain: "bjkp-official-website.firebaseapp.com",
  projectId: "bjkp-official-website",
  storageBucket: "bjkp-official-website.firebasestorage.app",
  messagingSenderId: "640178809634",
  appId: "1:640178809634:web:a0b1f0665037ad3844d37b",
  measurementId: "G-VZ01W7XJRS"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };