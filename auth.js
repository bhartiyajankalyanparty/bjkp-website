import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

// =========================
// Firebase Config
// =========================

const firebaseConfig = {
  apiKey: "AIzaSyBGa257kKYT4zJcUSyeu7aITZ0Y3D6AYk0",
  authDomain: "bhartiya-jan-kalyan-party-org.firebaseapp.com",
  projectId: "bhartiya-jan-kalyan-party-org",
  storageBucket: "bhartiya-jan-kalyan-party-org.firebasestorage.app",
  messagingSenderId: "715864126578",
  appId: "1:715864126578:web:9f9901e4c2a119b225beeb"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// =========================
// Protect Admin Page
// =========================

onAuthStateChanged(auth, (user) => {

  if (!user) {

    alert("पहले Admin Login करें।");

    window.location.replace("login.html");

    return;

  }

  console.log("✅ Admin Logged In:", user.email);

});

// =========================
// Logout Function
// =========================

window.logoutAdmin = async function () {

  const ok = confirm("क्या आप Logout करना चाहते हैं?");

  if (!ok) return;

  try {

    await signOut(auth);

    window.location.replace("login.html");

  } catch (error) {

    alert("Logout Failed");

    console.error(error);

  }

};

