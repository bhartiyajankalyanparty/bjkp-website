// BJKP News System

import { db } from "./firebase-config.js";
import { collection, getDocs, query, orderBy } from 
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


const newsContainer = document.getElementById("newsContainer");


async function loadNews(){


try{


const q = query(
collection(db,"news"),
orderBy("date","desc")
);


const snapshot = await getDocs(q);


newsContainer.innerHTML="";



if(snapshot.empty){

newsContainer.innerHTML = `
<div class="card">
<h3>कोई समाचार उपलब्ध नहीं है</h3>
</div>
`;

return;

}



snapshot.forEach((doc)=>{


let data = doc.data();



newsContainer.innerHTML += `

<div class="card">


${data.image ? 
`<img src="${data.image}" style="width:100%;border-radius:10px;">`
:
""}



<h3>${data.title}</h3>


<p>${data.description}</p>


<small>
${data.date || ""}
</small>


</div>

`;


});



}

catch(error){

console.log("News Error:",error);

}



}



loadNews();