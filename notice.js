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

async function loadNotice() {
  const snapshot = await getDocs(collection(db, "notice"));

  let html = "";

  snapshot.forEach((doc) => {
    const n = doc.data();

    html += `
      <div style="padding:10px;border-bottom:1px solid #ddd;">
        <h4>${n.title}</h4>
        <small>${n.date}</small>
      </div>
    `;
  });

  document.getElementById("noticeBoard").innerHTML =
    html || "<p>कोई सूचना उपलब्ध नहीं है।</p>";
}

loadNotice();