import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBGa257kKYT4zJcUSyeu7aITZ0Y3D6AYk0",
  authDomain: "bhartiya-jan-kalyan-party-org.firebaseapp.com",
  projectId: "bhartiya-jan-kalyan-party-org",
  storageBucket: "bhartiya-jan-kalyan-party-org.firebasestorage.app",
  messagingSenderId: "715864126578",
  appId: "1:715864126578:web:9f9901e4c2a119b225beeb"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };