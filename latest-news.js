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

async function loadNews() {

  const snapshot = await getDocs(collection(db, "news"));

  let html = "";

  snapshot.forEach((doc) => {

    const d = doc.data();

    html += `
      <div style="border:1px solid #ccc;padding:15px;margin-bottom:15px;border-radius:8px;">
        <h3>${d.title}</h3>
        <p>${d.description}</p>
      </div>
    `;
  });

  if (html === "") {
    html = "<p>अभी कोई समाचार उपलब्ध नहीं है।</p>";
  }

  const box =
    document.getElementById("latestNews") ||
    document.getElementById("newsList");

  if (box) {
    box.innerHTML = html;
  }
}

loadNews();