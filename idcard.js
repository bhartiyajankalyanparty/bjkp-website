import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import {
  getFirestore,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

// ===========================
// Firebase Config
// ===========================

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

// ===========================
// Get Member ID
// ===========================

const params = new URLSearchParams(window.location.search);
const memberId = params.get("id");

if (memberId) {
  loadMember(memberId);
} else {
  alert("Member ID नहीं मिला।");
}

// ===========================
// Load Member
// ===========================

async function loadMember(id) {

  try {

    const snapshot = await getDocs(collection(db, "members"));

    let found = false;

    snapshot.forEach((doc) => {

      const m = doc.data();

      if (m.memberId === id) {

        found = true;

        showMember(m);

      }

    });

    if (!found) {

      alert("Member नहीं मिला।");

    }

  } catch (error) {

    console.error(error);

    alert("डेटा लोड नहीं हो सका।");

  }

}

// ===========================
// Show Member
// ===========================

function setText(id, value) {

  const el = document.getElementById(id);

  if (el) {

    el.innerText = value || "-";

  }

}

function showMember(m) {

  const photo = document.getElementById("photo");

  if (photo) {

    photo.src = m.photo || "image/president.jpg";

  }

  setText("name", m.name);
  setText("memberId", m.memberId);
  setText("mobile", m.mobile);
  setText("email", m.email);
  setText("address", m.address);
  setText("gender", m.gender);
  setText("dob", m.dob);
  setText("occupation", m.occupation);
  setText("district", m.district);
  setText("state", m.state);
  setText("joinDate", m.joinDate);

  const status = document.getElementById("status");

  if (status) {

    status.innerText = m.status || "Active";

    status.style.color =
      m.status === "Inactive"
        ? "#d32f2f"
        : "#0b7a2a";

  }

  const badge = document.getElementById("verifyBadge");

  if (badge) {

    if (m.status === "Inactive") {

      badge.innerHTML = "❌ INACTIVE";
      badge.style.background = "#d32f2f";

    } else {

      badge.innerHTML = "✅ VERIFIED";
      badge.style.background = "#0b7a2a";

    }

  }

  const qr = document.getElementById("qr");

  if (qr) {

    qr.src =
      "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=" +
      encodeURIComponent(
        window.location.origin +
        "/verify.html?id=" +
        m.memberId
      );

  }

}

// ===========================
// Ready
// ===========================

document.addEventListener("DOMContentLoaded", () => {

  console.log("✅ ID Card Loaded");

});

window.onerror = function (msg) {

  console.log(msg);

  return false;

};