import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import {
getFirestore,
collection,
getDocs,
addDoc,
deleteDoc,
doc
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

import {
getAuth,
signOut
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

// ==============================
// Firebase Config
// ==============================

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

const auth = getAuth(app);

// ==============================
// Global Data
// ==============================

let members = [];

let news = [];

let notices = [];

// ==============================
// Dashboard Start
// ==============================

document.addEventListener("DOMContentLoaded",()=>{

loadDashboard();

});

// ==============================
// Load Dashboard
// ==============================

async function loadDashboard(){

await loadMembers();

await loadNews();

await loadNotice();

}

// ==============================
// Load Members
// ==============================

async function loadMembers(){

const snapshot = await getDocs(collection(db,"members"));

members=[];

snapshot.forEach((d)=>{

members.push({

id:d.id,

...d.data()

});

});

const memberCount=document.getElementById("memberCount");

if(memberCount){

memberCount.innerText=members.length;

}

}

// ==============================
// Load News
// ==============================

async function loadNews(){

const snapshot = await getDocs(collection(db,"news"));

news=[];

snapshot.forEach((d)=>{

news.push({

id:d.id,

...d.data()

});

});

const newsCount=document.getElementById("newsCount");

if(newsCount){

newsCount.innerText=news.length;

}

showNews();

}

// ==============================
// Load Notice
// ==============================

async function loadNotice(){

const snapshot = await getDocs(collection(db,"notice"));

notices=[];

snapshot.forEach((d)=>{

notices.push({

id:d.id,

...d.data()

});

});

const noticeCount=document.getElementById("noticeCount");

if(noticeCount){

noticeCount.innerText=notices.length;

}

showNotice();

}

// ==============================
// Show Members
// ==============================

function showMembers(data=members){

const memberList=document.getElementById("memberList");

if(!memberList) return;

if(data.length===0){

memberList.innerHTML="<p>कोई सदस्य उपलब्ध नहीं है।</p>";

return;

}

let html="";

data.forEach((m)=>{

html+=`

<div class="member-card">

<h3>${m.name||"-"}</h3>

<p><b>ID :</b> ${m.memberId||"-"}</p>

<p><b>मोबाइल :</b> ${m.mobile||"-"}</p>

<p><b>जिला :</b> ${m.district||"-"}</p>

<p>

<b>Status :</b>

<span style="color:${m.status==="Inactive"?"red":"green"}">

${m.status||"Active"}

</span>

</p>

<button
onclick="deleteMember('${m.id}')"
class="btn">

🗑 Delete

</button>

</div>

`;

});

memberList.innerHTML=html;

}

// ==============================
// Search
// ==============================

const search=document.getElementById("searchMember");

if(search){

search.addEventListener("keyup",function(){

const value=this.value.toLowerCase();

const result=members.filter((m)=>{

return(

(m.name||"").toLowerCase().includes(value)||

(m.mobile||"").includes(value)||

(m.memberId||"").toLowerCase().includes(value)

);

});

showMembers(result);

});

}

// ==============================
// Add News
// ==============================

const addNewsBtn = document.getElementById("addNewsBtn");

if (addNewsBtn) {

addNewsBtn.addEventListener("click", async () => {

const title = document.getElementById("newsTitle").value.trim();

const description = document.getElementById("newsDescription").value.trim();

if (!title || !description) {

alert("समाचार का शीर्षक और विवरण भरें");

return;

}

await addDoc(collection(db, "news"), {

title,

description,

date: new Date().toLocaleDateString("hi-IN"),

createdAt: new Date()

});

alert("✅ समाचार सफलतापूर्वक जोड़ दिया गया");

document.getElementById("newsTitle").value = "";

document.getElementById("newsDescription").value = "";

await loadNews();

});

}

// ==============================
// Show News
// ==============================

function showNews() {

const newsList = document.getElementById("newsList");

if (!newsList) return;

if (news.length === 0) {

newsList.innerHTML = "<p>कोई समाचार उपलब्ध नहीं है।</p>";

return;

}

let html = "";

news.forEach((n) => {

html += `

<div class="member-card">

<h3>${n.title}</h3>

<p>${n.description}</p>

<p><small>${n.date || "-"}</small></p>

<button
class="btn"
onclick="deleteNews('${n.id}')">

🗑 Delete

</button>

</div>

`;

});

newsList.innerHTML = html;

}

// ==============================
// Add Notice
// ==============================

const addNoticeBtn = document.getElementById("addNoticeBtn");

if (addNoticeBtn) {

addNoticeBtn.addEventListener("click", async () => {

const title = document.getElementById("noticeTitle").value.trim();

const description = document.getElementById("noticeDescription").value.trim();

if (!title || !description) {

alert("सूचना का शीर्षक और विवरण भरें");

return;

}

await addDoc(collection(db, "notice"), {

title,

description,

date: new Date().toLocaleDateString("hi-IN"),

createdAt: new Date()

});

alert("✅ सूचना सफलतापूर्वक जोड़ दी गई");

document.getElementById("noticeTitle").value = "";

document.getElementById("noticeDescription").value = "";

await loadNotice();

});

}

// ==============================
// Show Notice
// ==============================

function showNotice() {

const noticeList = document.getElementById("noticeList");

if (!noticeList) return;

if (notices.length === 0) {

noticeList.innerHTML = "<p>कोई सूचना उपलब्ध नहीं है।</p>";

return;

}

let html = "";

notices.forEach((n) => {

html += `

<div class="member-card">

<h3>${n.title}</h3>

<p>${n.description}</p>

<p><small>${n.date || "-"}</small></p>

<button
class="btn"
onclick="deleteNotice('${n.id}')">

🗑 Delete

</button>

</div>

`;

});

noticeList.innerHTML = html;

}

// ==============================
// Delete Member
// ==============================

window.deleteMember = async function(id){

const ok = confirm("क्या आप इस सदस्य को हटाना चाहते हैं?");

if(!ok) return;

try{

await deleteDoc(doc(db,"members",id));

alert("✅ सदस्य सफलतापूर्वक हटा दिया गया");

await loadMembers();

}catch(err){

console.error(err);

alert("❌ सदस्य हटाया नहीं जा सका");

}

};

// ==============================
// Delete News
// ==============================

window.deleteNews = async function(id){

const ok = confirm("क्या आप यह समाचार हटाना चाहते हैं?");

if(!ok) return;

try{

await deleteDoc(doc(db,"news",id));

alert("✅ समाचार हटाया गया");

await loadNews();

}catch(err){

console.error(err);

alert("❌ समाचार हटाया नहीं जा सका");

}

};

// ==============================
// Delete Notice
// ==============================

window.deleteNotice = async function(id){

const ok = confirm("क्या आप यह सूचना हटाना चाहते हैं?");

if(!ok) return;

try{

await deleteDoc(doc(db,"notice",id));

alert("✅ सूचना हटाई गई");

await loadNotice();

}catch(err){

console.error(err);

alert("❌ सूचना हटाई नहीं जा सकी");

}

};

// ==============================
// Refresh Button
// ==============================

const refreshBtn=document.getElementById("refreshBtn");

if(refreshBtn){

refreshBtn.addEventListener("click",async()=>{

await loadDashboard();

showMembers();

alert("✅ Dashboard Refresh हो गया");

});

}

// ==============================
// Export Members
// ==============================

const exportBtn=document.getElementById("exportBtn");

if(exportBtn){

exportBtn.addEventListener("click",()=>{

const data=JSON.stringify(members,null,2);

const blob=new Blob([data],{type:"application/json"});

const url=URL.createObjectURL(blob);

const a=document.createElement("a");

a.href=url;

a.download="BJKP_Members.json";

a.click();

URL.revokeObjectURL(url);

});

}

// ==============================
// Logout
// ==============================

const logoutBtn=document.getElementById("logoutBtn");

if(logoutBtn){

logoutBtn.addEventListener("click",async()=>{

const ok=confirm("क्या आप Logout करना चाहते हैं?");

if(!ok) return;

try{

await signOut(auth);

window.location.href="login.html";

}catch(err){

console.error(err);

alert("❌ Logout नहीं हो सका");

}

});

}

// ==============================
// Auto Refresh
// ==============================

setInterval(async()=>{

await loadDashboard();

showMembers();

},30000);

// ==============================
// Ready
// ==============================

console.log("✅ BJKP Admin Panel Ready");