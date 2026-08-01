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

const app=initializeApp(firebaseConfig);
const db=getFirestore(app);

const params=new URLSearchParams(window.location.search);

const id=params.get("id");

loadMember(id);

async function loadMember(memberId){

const snapshot=await getDocs(collection(db,"members"));

snapshot.forEach(doc=>{

const m=doc.data();

if(m.memberId===memberId){

document.getElementById("photo").src=m.photo||"image/president.jpg";

document.getElementById("name").innerText=m.name;

document.getElementById("memberId").innerText=m.memberId;

document.getElementById("mobile").innerText=m.mobile;

document.getElementById("email").innerText=m.email||"-";

document.getElementById("address").innerText=m.address;

document.getElementById("joinDate").innerText=m.joinDate||"-";

document.getElementById("qr").src=
"https://api.qrserver.com/v1/create-qr-code/?size=150x150&data="+m.memberId;

}

});

}