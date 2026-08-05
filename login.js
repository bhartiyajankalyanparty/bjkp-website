import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import {
getAuth,
signInWithEmailAndPassword,
onAuthStateChanged
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

const auth = getAuth(app);

// =========================
// Already Logged In?
// =========================

onAuthStateChanged(auth,(user)=>{

if(user){

window.location.href="admin.html";

}

});

// =========================
// Login Button
// =========================

const loginBtn = document.getElementById("loginBtn");

if (loginBtn) {

loginBtn.addEventListener("click", async () => {

const email = document.getElementById("email").value.trim();

const password = document.getElementById("password").value;

const message = document.getElementById("loginMessage");

message.style.color = "red";

message.innerText = "";

if (!email || !password) {

message.innerText = "ईमेल और पासवर्ड दर्ज करें।";

return;

}

try {

loginBtn.disabled = true;

loginBtn.innerText = "Logging in...";

await signInWithEmailAndPassword(auth, email, password);

message.style.color = "green";

message.innerText = "✅ Login सफल";

setTimeout(() => {

window.location.href = "admin.html";

}, 800);

} catch (error) {

switch (error.code) {

case "auth/invalid-email":
message.innerText = "गलत ईमेल पता।";
break;

case "auth/user-not-found":
message.innerText = "यह Admin मौजूद नहीं है।";
break;

case "auth/wrong-password":
case "auth/invalid-credential":
message.innerText = "गलत पासवर्ड।";
break;

case "auth/too-many-requests":
message.innerText = "बहुत अधिक प्रयास हुए हैं। बाद में पुनः प्रयास करें।";
break;

default:
message.innerText = "Login असफल: " + error.message;
}

loginBtn.disabled = false;

loginBtn.innerText = "🔐 Login";

}

});

}

console.log("✅ Login System Ready");