import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import {
getFirestore,
collection,
getDocs
} from

document.addEventListener("DOMContentLoaded", () => {

const hero = document.querySelector(".hero-banner");

if(hero){

const banners = [
"image/banner1.png",
"image/banner2.png",
"image/banner3.png"
];

let index = 0;

setInterval(() => {

index = (index + 1) % banners.length;

hero.src = banners[index];

}, 3000);

}

}); "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

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

/* ===========================
   Website Start
=========================== */

loadWebsite();

async function loadWebsite(){

try{

await loadMembers();
await loadNews();
await loadNotice();

}catch(error){

console.error("Website Error :",error);

}

}

/* ===========================
   Member Counter
=========================== */

async function loadMembers(){

const memberBox=document.getElementById("memberCount");

if(!memberBox) return;

const snapshot=await getDocs(collection(db,"members"));

animateCounter(memberBox,snapshot.size);

}

function animateCounter(element,target){

let count=0;

const timer=setInterval(()=>{

count++;

element.innerText=count;

if(count>=target){

clearInterval(timer);

}

},20);

}

/* ===========================
   Latest News
=========================== */

async function loadNews(){

const snapshot=await getDocs(collection(db,"news"));

const newsCount=document.getElementById("newsCount");
const newsContainer=document.getElementById("newsContainer");

if(newsCount){

newsCount.innerText=snapshot.size;

}

if(!newsContainer) return;

newsContainer.innerHTML="";

snapshot.forEach((doc)=>{

const news=doc.data();

newsContainer.innerHTML+=`

<div class="news-card">

<h3>${news.title||"समाचार"}</h3>

<p>${news.description||""}</p>

</div>

`;

});

}

/* ===========================
   Notice
=========================== */

async function loadNotice(){

const snapshot=await getDocs(collection(db,"notice"));

const noticeContainer=document.getElementById("noticeContainer");

if(!noticeContainer) return;

noticeContainer.innerHTML="";

snapshot.forEach((doc)=>{

const notice=doc.data();

noticeContainer.innerHTML+=`

<div class="news-card">

<h3>📢 ${notice.title||"सूचना"}</h3>

<p>${notice.date||""}</p>

</div>

`;

});

}

/* ===========================
   Hero Banner Slider
=========================== */

document.addEventListener("DOMContentLoaded", () => {

const hero = document.querySelector(".hero-banner");

if(!hero) return;

const banners = [
"image/banner1.png",
"image/banner2.png",
"image/banner3.png"
];

let index = 0;

setInterval(() => {

index = (index + 1) % banners.length;

hero.src = banners[index];

}, 3000);

});

/* ===========================
   Auto Refresh
=========================== */

setInterval(loadWebsite,60000);

/* ===========================
   Ready
=========================== */

console.log("✅ BJKP Website Loaded");

window.addEventListener("online",()=>{

console.log("🟢 Online");

});

window.addEventListener("offline",()=>{

console.log("🔴 Offline");

});