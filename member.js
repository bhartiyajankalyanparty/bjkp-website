// BJKP Membership System


document.addEventListener("DOMContentLoaded", function(){


const form = document.getElementById("membershipForm");


if(form){


form.addEventListener("submit", function(e){


e.preventDefault();


// Member Data

let member = {

id: "BJKP" + Math.floor(10000 + Math.random() * 90000),

name: document.getElementById("name").value,

mobile: document.getElementById("mobile").value,

email: document.getElementById("email").value,

district: document.getElementById("district").value,

state: document.getElementById("state").value,

address: document.getElementById("address").value,

date: new Date().toLocaleDateString()

};



// Save Temporary Data

localStorage.setItem(
"bjkpMember",
JSON.stringify(member)
);



// Message

alert(
"सदस्यता सफल हुई। आपका सदस्य ID: " + member.id
);



// Open ID Card

window.location.href="idcard.html";


});


}


});