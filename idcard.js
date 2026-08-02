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

const params = new URLSearchParams(window.location.search);

const memberId = params.get("id");

loadMember(memberId);

async function loadMember(id){

if(!id){

alert("Member ID नहीं मिला");

return;

}

const snapshot = await getDocs(collection(db,"members"));

let found = false;

snapshot.forEach((doc)=>{

const m = doc.data();

if(m.memberId === id){

found = true;

showMember(m);

}

});

if(!found){

alert("Member नहीं मिला");

}

}

// =========================
// Show Member Details
// =========================

function showMember(m){

document.getElementById("photo").src =
m.photo || "image/president.jpg";

document.getElementById("name").innerText =
m.name || "-";

document.getElementById("memberId").innerText =
m.memberId || "-";

document.getElementById("mobile").innerText =
m.mobile || "-";

document.getElementById("email").innerText =
m.email || "-";

document.getElementById("address").innerText =
m.address || "-";

document.getElementById("joinDate").innerText =
m.joinDate || "-";

const status =
document.getElementById("status");

status.innerText =
m.status || "Active";

status.style.color =
m.status === "Inactive"
? "red"
: "green";

// QR Code

document.getElementById("qr").src =
"https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=" +
encodeURIComponent(
window.location.origin +
"/verify.html?id=" +
m.memberId
);

}

// =========================
// Verification Badge
// =========================

const badge = document.getElementById("verifyBadge");

if(badge){

if(m.status === "Active"){

badge.innerHTML = "✅ VERIFIED";
badge.style.background = "#0b7a2a";

}else{

badge.innerHTML = "❌ INACTIVE";
badge.style.background = "#d32f2f";

}

}

// =========================
// Ready
// =========================

document.addEventListener("DOMContentLoaded",()=>{

console.log("✅ ID Card Loaded");

});

// =========================
// Error Handling
// =========================

window.onerror=function(msg,url,line){

console.log("Error :",msg);

return false;

};

