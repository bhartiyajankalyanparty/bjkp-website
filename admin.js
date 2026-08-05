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

// =========================
// Firebase Config
// =========================

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

// =========================
// Global Data
// =========================

let members = [];

let news = [];

let notices = [];

// =========================
// Dashboard Load
// =========================

async function loadDashboard(){

await loadMembers();

await loadNews();

await loadNotice();

}

loadDashboard();

// =========================
// Load Members
// =========================

async function loadMembers(){

const snapshot = await getDocs(collection(db,"members"));

members = [];

snapshot.forEach((d)=>{

members.push({
id:d.id,
...d.data()
});

});

// Total Members
document.getElementById("memberCount").innerText = members.length;

// Show Members
showMembers(members);

}

// =========================
// Show Member Cards
// =========================

function showMembers(data){

const memberList = document.getElementById("memberList");

memberList.innerHTML = "";

if(data.length===0){

memberList.innerHTML=`

<div class="empty-card">

कोई सदस्य उपलब्ध नहीं

</div>

`;

return;

}

data.forEach((m)=>{

memberList.innerHTML += `

<div class="member-card">

<img
src="${m.photo || 'image/logo.png'}"
class="member-photo">

<h3>${m.name || "-"}</h3>

<p><b>Member ID:</b> ${m.memberId || "-"}</p>

<p><b>मोबाइल:</b> ${m.mobile || "-"}</p>

<p><b>स्थिति:</b> ${m.status || "Active"}</p>

<div class="member-actions">

<button
class="btn"
onclick="window.open('idcard.html?id=${m.memberId}','_blank')">

🪪 ID Card

</button>

<button
class="btn delete-btn"
onclick="deleteMember('${m.id}')">

🗑 Delete

</button>

</div>

</div>

`;

});

}

// =========================
// Search Members
// =========================

const searchBox = document.getElementById("searchMember");

if(searchBox){

searchBox.addEventListener("keyup",()=>{

const keyword = searchBox.value.trim().toLowerCase();

const result = members.filter(m=>{

return (

(m.name||"").toLowerCase().includes(keyword) ||

(m.memberId||"").toLowerCase().includes(keyword) ||

(m.mobile||"").includes(keyword)

);

});

showMembers(result);

});

}

// =========================
// Delete Member
// =========================

window.deleteMember = async function(id){

const ok = confirm("क्या आप इस सदस्य को हटाना चाहते हैं?");

if(!ok) return;

try{

await deleteDoc(doc(db,"members",id));

alert("✅ Member Delete Successfully");

loadMembers();

}catch(err){

console.error(err);

alert("❌ Member Delete Failed");

}

};

// =========================
// Refresh Dashboard
// =========================

const refreshBtn = document.getElementById("refreshBtn");

if(refreshBtn){

refreshBtn.addEventListener("click",()=>{

loadDashboard();

alert("✅ Dashboard Refreshed");

});

}

// =========================
// Load News
// =========================

async function loadNews(){

const snapshot = await getDocs(collection(db,"news"));

news = [];

snapshot.forEach((d)=>{

news.push({
id:d.id,
...d.data()
});

});

document.getElementById("newsCount").innerText = news.length;

const newsList = document.getElementById("newsList");

if(newsList){

newsList.innerHTML = "";

news.forEach((n)=>{

newsList.innerHTML += `

<div class="member-card">

<h3>${n.title}</h3>

<p>${n.description}</p>

<button
class="btn delete-btn"
onclick="deleteNews('${n.id}')">

🗑 Delete

</button>

</div>

`;

});

}

}

// =========================
// Add News
// =========================

const addNewsBtn = document.getElementById("addNewsBtn");

if(addNewsBtn){

addNewsBtn.addEventListener("click",async()=>{

const title=document.getElementById("newsTitle").value.trim();

const description=document.getElementById("newsDescription").value.trim();

if(!title || !description){

alert("समाचार पूरा भरें");

return;

}

await addDoc(collection(db,"news"),{

title,

description,

date:new Date()

});

document.getElementById("newsTitle").value="";

document.getElementById("newsDescription").value="";

loadNews();

alert("✅ समाचार जोड़ दिया गया");

});

}

// =========================
// Delete News
// =========================

window.deleteNews = async function(id){

if(!confirm("समाचार हटाना चाहते हैं?")) return;

await deleteDoc(doc(db,"news",id));

loadNews();

};

// =========================
// Load Notice
// =========================

async function loadNotice(){

const snapshot = await getDocs(collection(db,"notice"));

notices = [];

snapshot.forEach((d)=>{

notices.push({
id:d.id,
...d.data()
});

});

document.getElementById("noticeCount").innerText = notices.length;

const noticeList = document.getElementById("noticeList");

if(noticeList){

noticeList.innerHTML="";

notices.forEach((n)=>{

noticeList.innerHTML += `

<div class="member-card">

<h3>${n.title || "-"}</h3>

<p>${n.description || "-"}</p>

<button
class="btn delete-btn"
onclick="deleteNotice('${n.id}')">

🗑 Delete

</button>

</div>

`;

});

}

}

// =========================
// Add Notice
// =========================

const addNoticeBtn = document.getElementById("addNoticeBtn");

if(addNoticeBtn){

addNoticeBtn.addEventListener("click",async()=>{

const title=document.getElementById("noticeTitle").value.trim();

const description=document.getElementById("noticeDescription").value.trim();

if(!title || !description){

alert("सूचना पूरी भरें");

return;

}

await addDoc(collection(db,"notice"),{

title,

description,

date:new Date()

});

document.getElementById("noticeTitle").value="";

document.getElementById("noticeDescription").value="";

loadNotice();

alert("✅ सूचना जोड़ दी गई");

});

}

// =========================
// Delete Notice
// =========================

window.deleteNotice = async function(id){

if(!confirm("सूचना हटाना चाहते हैं?")) return;

await deleteDoc(doc(db,"notice",id));

loadNotice();

};

// =========================
// Export Members
// =========================

const exportBtn=document.getElementById("exportBtn");

if(exportBtn){

exportBtn.addEventListener("click",()=>{

const data=JSON.stringify(members,null,2);

const blob=new Blob([data],{type:"application/json"});

const url=URL.createObjectURL(blob);

const a=document.createElement("a");

a.href=url;

a.download="members.json";

a.click();

URL.revokeObjectURL(url);

});

}

// =========================
// Logout
// =========================

const logoutBtn=document.getElementById("logoutBtn");

if(logoutBtn){

logoutBtn.addEventListener("click",async()=>{

await signOut(auth);

window.location.href="login.html";

});

}