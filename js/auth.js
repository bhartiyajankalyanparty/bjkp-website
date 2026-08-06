import { auth } from "./firebase-config.js";

import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

// Login Form
const loginForm = document.getElementById("loginForm");

if (loginForm) {

  loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {

      await signInWithEmailAndPassword(auth, email, password);

      alert("Login Successful");

      window.location.href = "admin-dashboard.html";

    } catch (error) {

      alert(error.message);

    }

  });

}

// Protect Admin Pages

onAuthStateChanged(auth, (user) => {

  const page = window.location.pathname;

  if (!user && page.includes("admin-dashboard")) {

    window.location.href = "admin-login.html";

  }

});

// Logout

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

  logoutBtn.addEventListener("click", async () => {

    await signOut(auth);

    window.location.href = "admin-login.html";

  });

});