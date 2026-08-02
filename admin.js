import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import {
getFirestore,
collection,
getDocs,
addDoc,
updateDoc,
deleteDoc,
doc
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

import {
getAuth,
signOut
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

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

let members = [];

// Dashboard Load

async function loadDashboard(){

const memberSnapshot = await getDocs(collection(db,"members"));
const newsSnapshot = await getDocs(collection(db,"news"));

members = [];

let active = 0;

memberSnapshot.forEach((d)=>{

const m = {
id:d.id,
...d.data()
};

members.push(m);

if(m.status==="Active"){
active++;
}

});

document.getElementById("totalMembers").innerText = members.length;
document.getElementById("activeMembers").innerText = active;
document.getElementById("todayMembers").innerText = members.length;
document.getElementById("totalNews").innerText = newsSnapshot.size;

showMembers(members);

}

loadDashboard();
// ===== Member List =====

function showMembers(data){

let html = "";

data.forEach((m)=>{

html += `

<div class="member-card">

<h3>${m.name}</h3>

<p><b>Member ID:</b> ${m.memberId}</p>

<p><b>मोबाइल:</b> ${m.mobile}</p>

<p><b>ईमेल:</b> ${m.email || "-"}</p>

<p><b>Status:</b> ${m.status || "Active"}</p>

<div class="action-buttons">

<button class="edit-btn"
onclick="editMember('${m.id}')">
✏️ Edit
</button>

<button class="id-btn"
onclick="window.open('idcard.html?id=${m.memberId}','_blank')">
🪪 View ID
</button>

<button class="delete-btn"
onclick="deleteMember('${m.id}')">
🗑 Delete
</button>

</div>

</div>

`;

});

document.getElementById("memberList").innerHTML = html;

}

// ===== Search =====

const search = document.getElementById("searchMember");

search.addEventListener("keyup", function(){

const value = this.value.toLowerCase();

const result = members.filter(m =>

(m.name || "").toLowerCase().includes(value) ||

(m.mobile || "").includes(value) ||

(m.memberId || "").toLowerCase().includes(value)

);

showMembers(result);

});

// ===== Edit =====

window.editMember = function(id){

const m = members.find(x => x.id === id);

if(!m) return;

document.getElementById("editId").value = m.id;
document.getElementById("editName").value = m.name || "";
document.getElementById("editMobile").value = m.mobile || "";
document.getElementById("editEmail").value = m.email || "";
document.getElementById("editAddress").value = m.address || "";
document.getElementById("editStatus").value = m.status || "Active";

window.scrollTo({
top:0,
behavior:"smooth"
});

};

// ===== Update Member =====

const updateBtn = document.getElementById("updateMemberBtn");

if(updateBtn){

updateBtn.addEventListener("click", async ()=>{

const id = document.getElementById("editId").value;

if(!id){
alert("पहले किसी सदस्य को Edit करें");
return;
}

await updateDoc(doc(db,"members",id),{

name: document.getElementById("editName").value.trim(),

mobile: document.getElementById("editMobile").value.trim(),

email: document.getElementById("editEmail").value.trim(),

address: document.getElementById("editAddress").value.trim(),

status: document.getElementById("editStatus").value

});

alert("✅ Member Updated Successfully");

loadDashboard();

});

}

// ===== Delete Member =====

window.deleteMember = async function(id){

if(confirm("क्या आप सदस्य हटाना चाहते हैं?")){

await deleteDoc(doc(db,"members",id));

alert("✅ Member Deleted");

loadDashboard();

}

}

// ===== Add News =====

const newsBtn = document.getElementById("addNewsBtn");

if(newsBtn){

newsBtn.addEventListener("click", async ()=>{

const title = document.getElementById("newsTitle").value.trim();
const description = document.getElementById("newsDescription").value.trim();

if(!title || !description){
alert("समाचार पूरा भरें");
return;
}

await addDoc(collection(db,"news"),{
title,
description,
date:new Date()
});

alert("✅ News Added");

document.getElementById("newsTitle").value="";
document.getElementById("newsDescription").value="";

loadDashboard();

});

}

// ===== Add Notice =====

const noticeBtn = document.getElementById("addNoticeBtn");

if(noticeBtn){

noticeBtn.addEventListener("click", async ()=>{

const title = document.getElementById("noticeTitle").value.trim();
const date = document.getElementById("noticeDate").value;

if(!title || !date){
alert("सूचना पूरी भरें");
return;
}

await addDoc(collection(db,"notice"),{
title,
date
});

alert("✅ Notice Added");

document.getElementById("noticeTitle").value="";
document.getElementById("noticeDate").value="";

});

}

// ===== Logout =====

const logoutBtn = document.getElementById("logoutBtn");

if(logoutBtn){

logoutBtn.addEventListener("click", async ()=>{

await signOut(auth);

window.location.href="login.html";

});

}