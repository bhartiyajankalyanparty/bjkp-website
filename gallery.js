// BJKP Gallery System


import { db } from "./firebase-config.js";

import { 
collection,
getDocs 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";



const galleryContainer = document.getElementById("galleryContainer");



async function loadGallery(){


try{


const snapshot = await getDocs(
collection(db,"gallery")
);



galleryContainer.innerHTML="";



if(snapshot.empty){


galleryContainer.innerHTML=`

<div class="card">

<h3>
अभी कोई फोटो उपलब्ध नहीं है
</h3>

</div>

`;

return;

}





snapshot.forEach((doc)=>{


let data = doc.data();



galleryContainer.innerHTML += `


<div class="card">


<img src="${data.image}" 
style="width:100%;border-radius:10px;"
alt="BJKP Gallery">


<p>
${data.title || ""}
</p>


</div>


`;



});



}

catch(error){

console.log("Gallery Error:",error);

}



}



loadGallery();