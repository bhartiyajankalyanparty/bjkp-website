import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-storage.js";

import {
  getFirestore,
  collection,
  addDoc
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

const storage = getStorage(app);
const db = getFirestore(app);


const photo = document.getElementById("photo");
const uploadBtn = document.getElementById("uploadBtn");
const status = document.getElementById("status");


uploadBtn.onclick = async () => {

  const file = photo.files[0];

  if(!file){
    status.innerHTML = "पहले फोटो चुनें";
    return;
  }


  try{

    status.innerHTML = "Upload हो रहा है...";


    const storageRef = ref(
      storage,
      "gallery/" + file.name
    );


    await uploadBytes(storageRef, file);


    const url = await getDownloadURL(storageRef);


    await addDoc(collection(db,"gallery"),{
      image:url,
      date:new Date()
    });


    status.innerHTML = "Photo Upload सफल हुआ ✅";


  }catch(error){

    console.log(error);
    status.innerHTML = "Error: " + error.message;

  }

};