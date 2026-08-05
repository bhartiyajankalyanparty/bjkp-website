import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import {
getFirestore,
collection,
getDocs,
addDoc,
updateDoc,
deleteDoc,
doc,
query,
orderBy
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

import {
getAuth,
signOut
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

// Firebase Config

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

// ===============================

let members = [];

let news = [];

let notices = [];

// ===============================

window.addEventListener("DOMContentLoaded",()=>{

loadDashboard();

});

// ===============================

async function loadDashboard(){

await loadMembers();

await loadNews();

await loadNotice();

}


// ===============================
// LOAD MEMBERS
// ===============================

async function loadMembers() {

const snapshot = await getDocs(
query(collection(db,"members"))
);

members = [];

let active = 0;

snapshot.forEach((d)=>{

const m = {
id:d.id,
...d.data()
};

members.push(m);

if((m.status || "Active") === "Active"){
active++;
}

});

// Dashboard Counter

document.getElementById("totalMembers").innerText =
members.length;

document.getElementById("activeMembers").innerText =
active;

// Member List

showMembers(members);

}

// ===============================
// SHOW MEMBERS
// ===============================

function showMembers(data){

let html = "";

if(data.length===0){

html = `
<div class="empty-card">

कोई सदस्य उपलब्ध नहीं

</div>
`;

document.getElementById("memberList").innerHTML=html;

return;

}

data.forEach((m)=>{

html += `

<div class="member-card">

<h3>${m.name || "-"}</h3>

<p><b>Member ID :</b> ${m.memberId || "-"}</p>

<p><b>मोबाइल :</b> ${m.mobile || "-"}</p>

<p><b>ईमेल :</b> ${m.email || "-"}</p>

<p><b>Status :</b>
${m.status || "Active"}
</p>

<div class="action-buttons">

<button
class="edit-btn"
onclick="editMember('${m.id}')">

✏️ Edit

</button>

<button
class="delete-btn"
onclick="deleteMember('${m.id}')">

🗑 Delete

</button>

<button
class="id-btn"
onclick="window.open('idcard.html?id=${m.memberId}','_blank')">

🪪 ID Card

</button>

</div>

</div>

`;

});

document.getElementById("memberList").innerHTML = html;

}

// ===============================
// SEARCH MEMBER
// ===============================

const searchBox = document.getElementById("searchMember");

if(searchBox){

searchBox.addEventListener("keyup",function(){

const value=this.value.trim().toLowerCase();

const result=members.filter(m=>

(m.name||"").toLowerCase().includes(value) ||

(m.memberId||"").toLowerCase().includes(value) ||

(m.mobile||"").includes(value) ||

(m.email||"").toLowerCase().includes(value)

);

showMembers(result);

});

}

// ===============================
// EDIT MEMBER
// ===============================

window.editMember=function(id){

const m=members.find(x=>x.id===id);

if(!m){

alert("Member नहीं मिला");

return;

}

document.getElementById("editId").value=id;

document.getElementById("editName").value=m.name||"";

document.getElementById("editMobile").value=m.mobile||"";

document.getElementById("editEmail").value=m.email||"";

document.getElementById("editAddress").value=m.address||"";

document.getElementById("editStatus").value=m.status||"Active";

window.scrollTo({

top:0,

behavior:"smooth"

});

};

// ===============================
// UPDATE MEMBER
// ===============================

const updateBtn=document.getElementById("updateMemberBtn");

if(updateBtn){

updateBtn.addEventListener("click",async()=>{

const id=document.getElementById("editId").value;

if(!id){

alert("पहले Edit करें");

return;

}

await updateDoc(doc(db,"members",id),{

name:document.getElementById("editName").value.trim(),

mobile:document.getElementById("editMobile").value.trim(),

email:document.getElementById("editEmail").value.trim(),

address:document.getElementById("editAddress").value.trim(),

status:document.getElementById("editStatus").value

});

alert("✅ Member Successfully Updated");

loadMembers();

});

}

// ===============================
// DELETE MEMBER
// ===============================

window.deleteMember = async function(id){

const ok = confirm("क्या आप इस सदस्य को हटाना चाहते हैं?");

if(!ok) return;

try{

await deleteDoc(doc(db,"members",id));

alert("✅ Member Deleted Successfully");

loadMembers();

}catch(error){

console.error(error);

alert("❌ Member Delete नहीं हो सका");

}

};

// ===============================
// LOAD NEWS
// ===============================

async function loadNews(){

const snapshot = await getDocs(

query(
collection(db,"news"),
orderBy("date","desc")
)

);

news = [];

let html = "";

snapshot.forEach((d)=>{

const n = {

id:d.id,

...d.data()

};

news.push(n);

html += `

<div class="member-card">

<h3>${n.title || "-"}</h3>

<p>${n.description || "-"}</p>

<div class="action-buttons">

<button
class="delete-btn"
onclick="deleteNews('${n.id}')">

🗑 Delete

</button>

</div>

</div>

`;

});

document.getElementById("newsCount").innerText = news.length;

document.getElementById("newsList").innerHTML =

html ||

'<div class="empty-card">कोई समाचार उपलब्ध नहीं</div>';

}

// ===============================
// ADD NEWS
// ===============================

const addNewsBtn = document.getElementById("addNewsBtn");

if(addNewsBtn){

addNewsBtn.addEventListener("click",async()=>{

const title =
document.getElementById("newsTitle").value.trim();

const description =
document.getElementById("newsDescription").value.trim();

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

alert("✅ News Added Successfully");

loadNews();

});

}

// ===============================
// DELETE NEWS
// ===============================

window.deleteNews = async function(id){

if(!confirm("समाचार हटाना चाहते हैं?")) return;

await deleteDoc(doc(db,"news",id));

loadNews();

};

// ===============================
// LOAD NOTICE
// ===============================

async function loadNotice(){

const snapshot = await getDocs(

query(
collection(db,"notice"),
orderBy("date","desc")
)

);

notices = [];

let html = "";

snapshot.forEach((d)=>{

const n = {

id:d.id,

...d.data()

};

notices.push(n);

html += `

<div class="member-card">

<h3>${n.title || "-"}</h3>

<p><b>दिनांक :</b> ${n.date || "-"}</p>

<div class="action-buttons">

<button
class="delete-btn"
onclick="deleteNotice('${n.id}')">

🗑 Delete

</button>

</div>

</div>

`;

});

document.getElementById("noticeCount").innerText =
notices.length;

document.getElementById("noticeList").innerHTML =
html || '<div class="empty-card">कोई सूचना उपलब्ध नहीं</div>';

}

// ===============================
// ADD NOTICE
// ===============================

const addNoticeBtn =
document.getElementById("addNoticeBtn");

if(addNoticeBtn){

addNoticeBtn.addEventListener("click",async()=>{

const title =
document.getElementById("noticeTitle").value.trim();

const date =
document.getElementById("noticeDate").value;

if(!title || !date){

alert("सूचना पूरी भरें");

return;

}

await addDoc(collection(db,"notice"),{

title,

date

});

document.getElementById("noticeTitle").value="";

document.getElementById("noticeDate").value="";

alert("✅ Notice Added Successfully");

loadNotice();

});

}

// ===============================
// DELETE NOTICE
// ===============================

window.deleteNotice = async function(id){

if(!confirm("सूचना हटाना चाहते हैं?")) return;

await deleteDoc(doc(db,"notice",id));

loadNotice();

};

// ===============================
// EXPORT MEMBERS (CSV)
// ===============================

const exportBtn =
document.getElementById("exportBtn");

if(exportBtn){

exportBtn.addEventListener("click",()=>{

let csv =
"Member ID,Name,Mobile,Email,Address,Status\n";

members.forEach((m)=>{

csv += `"${m.memberId||""}","${m.name||""}","${m.mobile||""}","${m.email||""}","${m.address||""}","${m.status||"Active"}"\n`;

});

const blob = new Blob([csv],{
type:"text/csv"
});

const url =
URL.createObjectURL(blob);

const a =
document.createElement("a");

a.href = url;

a.download = "members.csv";

a.click();

URL.revokeObjectURL(url);

});

}

// ===============================
// REFRESH DASHBOARD
// ===============================

const refreshBtn =
document.getElementById("refreshBtn");

if(refreshBtn){

refreshBtn.addEventListener("click",()=>{

loadDashboard();

});

}

// ===============================
// LOGOUT
// ===============================

const logoutBtn =
document.getElementById("logoutBtn");

if(logoutBtn){

logoutBtn.addEventListener("click",async()=>{

await signOut(auth);

window.location.href="login.html";

});

}