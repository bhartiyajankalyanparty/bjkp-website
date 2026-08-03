import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import {
getFirestore,
collection,
getDocs
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const firebaseConfig = {

apiKey:"AIzaSyBGa257kKYT4zJcUSyeu7aITZ0Y3D6AYk0",

authDomain:"bhartiya-jan-kalyan-party-org.firebaseapp.com",

projectId:"bhartiya-jan-kalyan-party-org",

storageBucket:"bhartiya-jan-kalyan-party-org.firebasestorage.app",

messagingSenderId:"715864126578",

appId:"1:715864126578:web:9f9901e4c2a119b225beeb"

};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Website Start

loadWebsite();

async function loadWebsite(){

await loadMembers();

await loadNews();

await loadNotice();

}

// =========================
// Member Counter
// =========================

async function loadMembers(){

const snapshot = await getDocs(collection(db,"members"));

const total = snapshot.size;

const memberBox = document.getElementById("memberCount");

if(memberBox){

animateCounter(memberBox,total);

}

}

// Counter Animation

function animateCounter(element,target){

let count = 0;

const speed = Math.max(1,Math.ceil(target/50));

const timer = setInterval(()=>{

count += speed;

if(count >= target){

count = target;

clearInterval(timer);

}

element.innerText = count;

},20);

}

// =========================
// Latest News
// =========================

async function loadNews(){

const snapshot = await getDocs(collection(db,"news"));

const newsCount =
document.getElementById("newsCount");

const newsContainer =
document.getElementById("newsContainer");

if(newsCount){

newsCount.innerText = snapshot.size;

}

if(!newsContainer) return;

newsContainer.innerHTML = "";

snapshot.forEach((doc)=>{

const news = doc.data();

const date = news.date?.seconds
? new Date(news.date.seconds*1000)
.toLocaleDateString("hi-IN")
: "";

newsContainer.innerHTML += `

<div class="news-card">

<h3>${news.title || "समाचार"}</h3>

<p>${news.description || ""}</p>

<small>📅 ${date}</small>

</div>

`;

});

}

// =========================
// Notice Board
// =========================

async function loadNotice(){

const snapshot = await getDocs(collection(db,"notice"));

const noticeCount =
document.getElementById("noticeCount");

const noticeContainer =
document.getElementById("noticeContainer");

if(noticeCount){

noticeCount.innerText = snapshot.size;

}

if(!noticeContainer) return;

noticeContainer.innerHTML = "";

snapshot.forEach((doc)=>{

const notice = doc.data();

noticeContainer.innerHTML += `

<div class="news-card">

<h3>📢 ${notice.title || "सूचना"}</h3>

<p>📅 ${notice.date || ""}</p>

</div>

`;

});

}

// =========================
// Auto Refresh
// =========================

setInterval(()=>{

loadWebsite();

},60000);

// =========================
// Loading Message
// =========================

console.log("✅ BJKP Website Loaded Successfully");

// =========================
// Error Handling
// =========================

window.addEventListener("error",(e)=>{

console.log("Error :",e.message);

});

// =========================
// Online / Offline Status
// =========================

window.addEventListener("online",()=>{

console.log("🟢 Internet Connected");

});

window.addEventListener("offline",()=>{

console.log("🔴 Internet Disconnected");

});

// =========================
// Page Ready
// =========================

document.addEventListener("DOMContentLoaded",()=>{

console.log("🚀 Home Page Ready");

});

