import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged
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
const auth = getAuth(app);

// यदि पहले से Login है तो सीधे Admin Panel खोल दो
onAuthStateChanged(auth, (user) => {
  if (user) {
    window.location.href = "admin.html";
  }
});

document.getElementById("loginBtn").addEventListener("click", async () => {

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("ईमेल और पासवर्ड भरें");
    return;
  }

  try {

    await signInWithEmailAndPassword(auth, email, password);

    alert("Login सफल हुआ");

    window.location.href = "admin.html";

  } catch (error) {

    alert("गलत Email या Password");
    console.log(error);

  }

});

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

  alert("✅ सदस्य सफलतापूर्वक अपडेट हो गया");

  document.getElementById("editId").value="";
  document.getElementById("editName").value="";
  document.getElementById("editMobile").value="";
  document.getElementById("editEmail").value="";
  document.getElementById("editAddress").value="";
  document.getElementById("editStatus").value="Active";

  loadDashboard();

});

}