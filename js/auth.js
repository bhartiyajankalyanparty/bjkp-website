import { auth } from "./firebase-config.js";

import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  signOut
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

// Elements
const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");
const rememberMe = document.getElementById("rememberMe");
const forgotPassword = document.getElementById("forgotPassword");

// ======================
// LOGIN
// ======================

if (loginForm) {

  loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value.trim();

    const password = document.getElementById("password").value;

    try {

      if (rememberMe.checked) {

        await setPersistence(auth, browserLocalPersistence);

      } else {

        await setPersistence(auth, browserSessionPersistence);

      }

      await signInWithEmailAndPassword(auth, email, password);

      loginMessage.innerHTML = "✅ Login Successful...";
      loginMessage.style.color = "green";

      setTimeout(() => {

        window.location.href = "admin-dashboard.html";

      }, 1000);

    } catch (error) {

      loginMessage.style.color = "red";

      switch (error.code) {

        case "auth/invalid-email":
          loginMessage.innerHTML = "❌ Invalid Email";
          break;

        case "auth/user-not-found":
          loginMessage.innerHTML = "❌ User Not Found";
          break;

        case "auth/wrong-password":
        case "auth/invalid-credential":
          loginMessage.innerHTML = "❌ Incorrect Password";
          break;

        default:
          loginMessage.innerHTML = error.message;

      }

    }

  });

}

// ======================
// PASSWORD RESET
// ======================

if (forgotPassword) {

  forgotPassword.addEventListener("click", async (e) => {

    e.preventDefault();

    const email = prompt("Enter your Admin Email");

    if (!email) return;

    try {

      await sendPasswordResetEmail(auth, email);

      alert("Password Reset Email Sent Successfully.");

    } catch (error) {

      alert(error.message);

    }

  });

}

// ======================
// LOGIN CHECK
// ======================

onAuthStateChanged(auth, (user) => {

  const page = window.location.pathname;

  if (

    !user &&

    page.includes("admin-dashboard")

  ) {

    window.location.href = "admin-login.html";

  }

});

// ======================
// LOGOUT
// ======================

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

  logoutBtn.addEventListener("click", async (e) => {

    e.preventDefault();

    await signOut(auth);

    window.location.href = "admin-login.html";

  });

}