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
// Website Start
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
    await Promise.all([
      loadMembers(),
      loadNews(),
      loadNotice()
    ]);
  } catch (error) {
    console.error("Website Error:", error);
  }
}

// ===========================
// Member Counter
// ===========================

async function loadMembers() {

  const memberBox = document.getElementById("memberCount");

  if (!memberBox) return;

  try {

    const snapshot = await getDocs(collection(db, "members"));

    memberBox.textContent = snapshot.size;

  } catch (error) {

    console.error("Member Counter Error:", error);

    memberBox.textContent = "0";

  }

}

// ===========================
// Latest News
// ===========================

async function loadNews() {

  const newsCount = document.getElementById("newsCount");
  const newsContainer = document.getElementById("newsContainer");

  if (!newsContainer) return;

  newsContainer.innerHTML = "";

  try {

    const snapshot = await getDocs(collection(db, "news"));

    if (newsCount) {
      newsCount.textContent = snapshot.size;
    }

    if (snapshot.empty) {

      newsContainer.innerHTML = `
        <div class="news-card">
          <h3>📢 कोई समाचार उपलब्ध नहीं है</h3>
          <p>जल्द ही नए समाचार प्रकाशित किए जाएंगे।</p>
        </div>
      `;

      return;

    }

    snapshot.forEach((doc) => {

      const news = doc.data();

      const date = news.date?.seconds
        ? new Date(news.date.seconds * 1000).toLocaleDateString("hi-IN")
        : "";

      newsContainer.innerHTML += `
        <div class="news-card">
          <h3>${news.title || "समाचार"}</h3>
          <p>${news.description || ""

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

      noticeContainer.innerHTML = `
        <div class="news-card">
          <h3>📢 कोई नई सूचना उपलब्ध नहीं है</h3>
        </div>
      `;

      return;

    }

    snapshot.forEach((doc) => {

      const notice = doc.data();

      const date = notice.date?.seconds
        ? new Date(notice.date.seconds * 1000).toLocaleDateString("hi-IN")
        : (notice.date || "");

      noticeContainer.innerHTML += `
        <div class="news-card">
          <h3>📢 ${notice.title || "सूचना"}</h3>
          <p>${notice.description || ""}</p>
          <small>📅 ${date}</small>
        </div>
      `;

    });

  } catch (error) {

    console.error("Notice Error:", error);

    noticeContainer.innerHTML = `
      <div class="news-card">
        <h3>❌ सूचना लोड नहीं हो सकी</h3>
      </div>
    `;

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

    index = (index + 1) % banners.length;

    hero.src = banners[index] + "?v=" + Date.now();

  }, 3000);

}

// ===========================
// Auto Refresh
// ===========================

setInterval(loadWebsite, 60000);

document.addEventListener("visibilitychange", () => {

  if (!document.hidden) {

    loadWebsite();

  }

});

// ===========================
// Ready
// ===========================

console.log("✅ BJKP Website Loaded Successfully");