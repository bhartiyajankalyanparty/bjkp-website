import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import {
getFirestore,
collection,
addDoc,
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

document.getElementById("submitBtn")
.addEventListener("click",submitForm);

async function submitForm(){

const name=document.getElementById("name").value.trim();

const mobile=document.getElementById("mobile").value.trim();

const email=document.getElementById("email").value.trim();

const address=document.getElementById("address").value.trim();

const photo=document.getElementById("photo");

if(name===""||mobile===""){

alert("नाम और मोबाइल नंबर आवश्यक है");

return;

}

// =========================
// Duplicate Mobile Check
// =========================

const snapshot = await getDocs(collection(db,"members"));

let duplicate = false;

snapshot.forEach((doc)=>{

const member = doc.data();

if(member.mobile === mobile){

duplicate = true;

}

});

if(duplicate){

alert("❌ इस मोबाइल नंबर से सदस्य पहले से मौजूद है।");

return;

}

// =========================
// Auto Member ID
// =========================

const memberId =
"BJKP" + String(snapshot.size + 1).padStart(4,"0");

// Default Photo

let photoUrl = "image/president.jpg";

// =========================
// Save Member
// =========================

if(photo.files.length>0){

const reader = new FileReader();

reader.onload = async function(e){

await saveMember(e.target.result);

};

reader.readAsDataURL(photo.files[0]);

}else{

await saveMember(photoUrl);

}

async function saveMember(photo){

await addDoc(collection(db,"members"),{

memberId,

name,

mobile,

email,

address,

photo,

status:"Active",

joinDate:new Date().toLocaleDateString("hi-IN"),

date:new Date()

});

localStorage.setItem("member",JSON.stringify({

memberId,

name,

mobile,

email,

address,

photo

}));

alert("✅ सदस्यता सफल!\n\nMember ID : "+memberId);

window.location.href =
"idcard.html?id="+memberId;

}

}

catch(error){

console.error(error);

alert("❌ सदस्यता सेव नहीं हो सकी।");

}

}

// =========================
// Global Error
// =========================

window.onerror=function(msg,url,line){

console.log("Error :",msg);

return false;

};

// =========================
// Ready
// =========================

document.addEventListener("DOMContentLoaded",()=>{

console.log("✅ Membership System Ready");

});