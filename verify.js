import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import {
  getFirestore,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

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

document.getElementById("verifyBtn").addEventListener("click", async () => {

  const memberId = document.getElementById("memberId").value.trim().toUpperCase();

  if (!memberId) {
    alert("कृपया Member ID दर्ज करें");
    return;
  }

  const snapshot = await getDocs(collection(db, "members"));

  let found = false;
  let html = "";

  snapshot.forEach((doc) => {

    const m = doc.data();

    if (m.memberId === memberId) {

      found = true;

      html = `
        <img src="${m.photo || 'image/president.jpg'}">

        <h2>${m.name}</h2>

        <p><b>Member ID:</b> ${m.memberId}</p>

        <p><b>मोबाइल:</b> ${m.mobile}</p>

        <p><b>ईमेल:</b> ${m.email || "-"}</p>

        <p><b>पता:</b> ${m.address}</p>

        <p><b>Status:</b>
        <span style="color:green;">✅ Active</span>
        </p>

        <p><b>Join Date:</b> ${m.joinDate || "-"}</p>
      `;
    }

  });

  if (!found) {

    html = `
      <h3 style="color:red;">
      ❌ Member नहीं मिला
      </h3>
    `;

  }

  document.getElementById("result").innerHTML = html;

});