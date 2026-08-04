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
// Start Website
// ===========================

document.addEventListener("DOMContentLoaded", () => {

  loadWebsite();

  startBannerSlider();

});

// ===========================
// Load Website
// ===========================

async function loadWebsite() {

  try {

    await loadMembers();
    await loadNews();
    await loadNotice();

  } catch (error) {

    console.error("Website Error :", error);

  }

}

// ===========================
// Member Counter
// ===========================

async function loadMembers() {

  const memberBox = document.getElementById("memberCount");

  if (!memberBox) return;

  const snapshot = await getDocs(collection(db, "members"));

  memberBox.innerText = snapshot.size;

}

// ===========================
// News Counter
// ===========================

async function loadNews() {

  const snapshot = await getDocs(collection(db, "news"));

  const newsCount = document.getElementById("newsCount");
  const newsContainer = document.getElementById("newsContainer");

  if (newsCount) {
    newsCount.innerText = snapshot.size;
  }

  if (!newsContainer) return;

  newsContainer.innerHTML = "";

  snapshot.forEach((doc) => {

    const news = doc.data();

    newsContainer.innerHTML += `
      <div class="news-card">
        <h3>${news.title || "समाचार"}</h3>
        <p>${news.description || ""}</p>
      </div>
    `;

  });

}

// ===========================
// Notice Board
// ===========================

async function loadNotice() {

  const noticeContainer = document.getElementById("noticeContainer");

  if (!noticeContainer) return;

  noticeContainer.innerHTML = "";

  try {

    const snapshot = await getDocs(collection(db, "notice"));

    if (snapshot.empty) {

      noticeContainer.innerHTML =
      "<p>कोई नई सूचना उपलब्ध नहीं है।</p>";

      return;

    }

    snapshot.forEach((doc) => {

      const notice = doc.data();

      noticeContainer.innerHTML += `
      <div class="news-card">
        <h3>📢 ${notice.title || "सूचना"}</h3>
        <p>${notice.description || ""}</p>
      </div>
      `;

    });

  } catch (error) {

    console.error(error);

  }

}

// ===========================
// Hero Banner Slider
// ===========================

function startBannerSlider() {

  const hero = document.querySelector(".hero-banner");

  if (!hero) return;

  const banners = [
    "image/banner1.png",
    "image/banner2.png",
    "image/banner3.png"
  ];

  let index = 0;

  setInterval(() => {

    index++;

    if (index >= banners.length) {

      index = 0;

    }

    hero.src = banners[index];

  }, 3000);

}

// ===========================
// Auto Refresh
// ===========================

setInterval(() => {

  loadWebsite();

}, 60000);

// ===========================
// Ready
// ===========================

console.log("✅ BJKP Website Loaded Successfully");

window.addEventListener("online", () => {

  console.log("🟢 Internet Connected");

});

window.addEventListener("offline", () => {

  console.log("🔴 Internet Disconnected");

});