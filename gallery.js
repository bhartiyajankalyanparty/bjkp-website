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

async function loadGallery() {
  const snapshot = await getDocs(collection(db, "gallery"));

  let html = "";

  snapshot.forEach((doc) => {
    const d = doc.data();

    html += `
      <div style="border:1px solid #ccc;padding:10px;border-radius:8px;text-align:center;">
        <img src="${d.image}" style="width:100%;height:200px;object-fit:cover;border-radius:6px;">
        <p>${d.title}</p>
      </div>
    `;
  });

  if (html === "") {
    html = "<p>अभी कोई फोटो उपलब्ध नहीं है।</p>";
  }

  document.getElementById("gallery").innerHTML = html;
}

loadGallery();