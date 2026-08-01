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
const auth = getAuth(app);

let members = [];

async function loadDashboard() {

  const memberSnapshot = await getDocs(collection(db, "members"));
  const newsSnapshot = await getDocs(collection(db, "news"));

  document.getElementById("totalMembers").innerText = memberSnapshot.size;
  document.getElementById("totalNews").innerText = newsSnapshot.size;
  document.getElementById("todayMembers").innerText = memberSnapshot.size;

  members = [];

  memberSnapshot.forEach((d) => {
    members.push({
      id: d.id,
      ...d.data()
    });
  });

  showMembers(members);
}

function showMembers(data){

let html="<h2>सदस्यों की सूची</h2>";

data.forEach((m)=>{

html+=`

<div style="border:1px solid #ccc;padding:15px;margin:10px;border-radius:8px;">

<h3>${m.name}</h3>

<p><b>Member ID:</b> ${m.memberId || "-"}</p>

<p><b>मोबाइल:</b> ${m.mobile}</p>

<p><b>ईमेल:</b> ${m.email}</p>

<p><b>पता:</b> ${m.address}</p>

<button onclick="deleteMember('${m.id}')"
style="background:red;color:white;border:none;padding:8px 15px;border-radius:5px;">
🗑 Delete
</button>

<br><br>

<a href="idcard.html?id=${m.memberId}" target="_blank">
<button style="background:#0b7a2a;color:white;border:none;padding:8px 15px;border-radius:5px;">
👁 View ID
</button>
</a>

<button onclick="window.open('idcard.html?id=${m.memberId}','_blank')"
style="background:#1565c0;color:white;border:none;padding:8px 15px;border-radius:5px;margin-left:8px;">
🖨 Print ID
</button>

</div>

`;

});

document.getElementById("memberList").innerHTML=html;

}

window.deleteMember=async function(id){

if(confirm("क्या सदस्य हटाना चाहते हैं?")){

await deleteDoc(doc(db,"members",id));

alert("सदस्य हटा दिया गया");

loadDashboard();

}

}

const search=document.getElementById("searchMember");

if(search){

search.addEventListener("keyup",function(){

const value=this.value.toLowerCase();

const result=members.filter(m=>

(m.name||"").toLowerCase().includes(value) ||

(m.mobile||"").includes(value)

);

showMembers(result);

});

}

loadDashboard();

const newsBtn=document.getElementById("addNewsBtn");

if(newsBtn){

newsBtn.addEventListener("click",async()=>{

const title=document.getElementById("newsTitle").value.trim();

const description=document.getElementById("newsDescription").value.trim();

if(!title||!description){

alert("पूरी जानकारी भरें");

return;

}

await addDoc(collection(db,"news"),{

title,

description,

date:new Date()

});

alert("समाचार जोड़ दिया गया");

document.getElementById("newsTitle").value="";

document.getElementById("newsDescription").value="";

loadDashboard();

});

}

const noticeBtn=document.getElementById("addNoticeBtn");

if(noticeBtn){

noticeBtn.addEventListener("click",async()=>{

const title=document.getElementById("noticeTitle").value.trim();

const date=document.getElementById("noticeDate").value.trim();

if(!title||!date){

alert("सूचना और तारीख भरें");

return;

}

await addDoc(collection(db,"notice"),{

title,

date

});

alert("सूचना जोड़ दी गई");

document.getElementById("noticeTitle").value="";

document.getElementById("noticeDate").value="";

});

}

const logoutBtn=document.getElementById("logoutBtn");

if(logoutBtn){

logoutBtn.addEventListener("click",async()=>{

await signOut(auth);

alert("Logout सफल हुआ");

window.location.href="login.html";

});

}