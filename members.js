import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

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

let members = [];

async function loadMembers() {

  const snapshot = await getDocs(collection(db, "members"));

  members = [];

  snapshot.forEach((d) => {
    members.push({
      id: d.id,
      ...d.data()
    });
  });

  showMembers(members);
}

function showMembers(data) {

  let html = "";

  data.forEach((m) => {

    html += `
    <div style="border:1px solid #ccc;padding:15px;margin-bottom:15px;border-radius:8px;">

      <h3>${m.name}</h3>

<p><b>🆔 Member ID:</b> ${m.memberId}</p>

      <p>📱 ${m.mobile}</p>

      <p>📧 ${m.email}</p>

      <p>📍 ${m.address}</p>

<button onclick="editMember('${m.id}')"
style="background:#ff9800;color:white;border:none;padding:8px 15px;border-radius:5px;margin-right:8px;">
✏️ Edit
</button>

<a href="idcard.html?id=${m.memberId}" target="_blank">
<button style="background:#0b7a2a;color:white;border:none;padding:8px 15px;border-radius:5px;margin-right:8px;">
🪪 ID Card
</button>
</a>

      <button onclick="deleteMember('${m.id}')">
      🗑 Delete
      </button>

    </div>
    `;
  });

  if (html === "") {
    html = "<p>कोई सदस्य नहीं मिला।</p>";
  }

  document.getElementById("memberList").innerHTML = html;
}

window.deleteMember = async function(id){

  if(confirm("क्या आप सदस्य हटाना चाहते हैं?")){

    await deleteDoc(doc(db,"members",id));

    alert("सदस्य हटा दिया गया।");

    loadMembers();
  }
}

document.getElementById("search").addEventListener("keyup",function(){

  const value = this.value.toLowerCase();

  const result = members.filter(m =>
    m.name.toLowerCase().includes(value) ||
    m.mobile.includes(value)
  );

  showMembers(result);

});

loadMembers();
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