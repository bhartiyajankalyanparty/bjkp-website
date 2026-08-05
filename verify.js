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
// Verify Button
// ===========================

document.addEventListener("DOMContentLoaded", () => {

  const btn = document.getElementById("verifyBtn");

  if (btn) {
    btn.addEventListener("click", verifyMember);
  }

});

// ===========================
// Verify Member
// ===========================

async function verifyMember() {

  try {

    const memberId = document
      .getElementById("memberId")
      .value
      .trim()
      .toUpperCase();

    if (!memberId) {

      alert("कृपया Member ID दर्ज करें");

      return;

    }

    const snapshot = await getDocs(collection(db, "members"));

    let found = false;

    let html = "";

    snapshot.forEach((doc) => {

      const m = doc.data();

      if ((m.memberId || "").toUpperCase() === memberId) {

        found = true;

        html = `

<div class="verify-card">

<img src="${m.photo || "image/president.jpg"}" class="verify-photo">

<h2>${m.name}</h2>

<p><b>Member ID :</b> ${m.memberId}</p>

<p><b>मोबाइल :</b> ${m.mobile}</p>

<p><b>ईमेल :</b> ${m.email || "-"}</p>

<p><b>पता :</b> ${m.address || "-"}</p>

<p><b>लिंग :</b> ${m.gender || "-"}</p>

<p><b>जन्म तिथि :</b> ${m.dob || "-"}</p>

<p><b>व्यवसाय :</b> ${m.occupation || "-"}</p>

<p><b>जिला :</b> ${m.district || "-"}</p>

<p><b>राज्य :</b> ${m.state || "-"}</p>

<p><b>Join Date :</b> ${m.joinDate || "-"}</p>

<p>

<b>Status :</b>

<span style="color:${
m.status === "Inactive"
? "red"
: "green"
};font-weight:bold;">

${m.status === "Inactive"
? "❌ Inactive"
: "✅ Active"}

</span>

</p>

</div>

`;

      }

    });

    if (!found) {

      html = `

<div class="verify-card">

<h2 style="color:red;">

❌ Member नहीं मिला

</h2>

<p>

कृपया सही Member ID दर्ज करें।

</p>

</div>

`;

    }

    document.getElementById("result").innerHTML = html;

  } catch (error) {

    console.error(error);

    alert("Verification में समस्या आई।");

  }

}

// ===========================
// Ready
// ===========================

console.log("✅ Verify System Ready");