import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc
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

// Dashboard + Members
async function loadDashboard() {

  const memberSnapshot = await getDocs(collection(db, "members"));
  const newsSnapshot = await getDocs(collection(db, "news"));

  document.getElementById("totalMembers").innerText = memberSnapshot.size;
  document.getElementById("totalNews").innerText = newsSnapshot.size;
  document.getElementById("todayMembers").innerText = memberSnapshot.size;

  let html = "<h2>सदस्यों की सूची</h2>";

  memberSnapshot.forEach((doc) => {

    const d = doc.data();

    html += `
      <div style="border:1px solid #ccc;padding:12px;margin:10px;border-radius:8px;">
        <h3>${d.name}</h3>
        <p><b>मोबाइल:</b> ${d.mobile}</p>
        <p><b>ईमेल:</b> ${d.email}</p>
        <p><b>पता:</b> ${d.address}</p>
      </div>
    `;

  });

  document.getElementById("memberList").innerHTML = html;
}

loadDashboard();

// News Add
document.getElementById("addNewsBtn").addEventListener("click", async () => {

  const title = document.getElementById("newsTitle").value.trim();
  const description = document.getElementById("newsDescription").value.trim();

  if (!title || !description) {
    alert("कृपया सभी जानकारी भरें");
    return;
  }

  await addDoc(collection(db, "news"), {
    title: title,
    description: description,
    date: new Date()
  });

  alert("समाचार सफलतापूर्वक जोड़ दिया गया");

  document.getElementById("newsTitle").value = "";
  document.getElementById("newsDescription").value = "";

  loadDashboard();

});