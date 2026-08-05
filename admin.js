// BJKP Admin Panel


function adminLogin(){


let user = document.getElementById("adminUser").value;

let pass = document.getElementById("adminPass").value;



// Demo Login

if(user === "admin" && pass === "123456"){


document.getElementById("loginBox").style.display="none";


document.getElementById("dashboard").style.display="block";


loadDashboard();


}

else{


alert("गलत Username या Password");


}


}





// Dashboard Data


function loadDashboard(){


let members = JSON.parse(
localStorage.getItem("bjkpMembers")
) || [];



document.getElementById("totalMembers").innerHTML =
members.length;



document.getElementById("totalNews").innerHTML =
"0";



let list = document.getElementById("memberList");



if(members.length === 0){


list.innerHTML =
"अभी कोई सदस्य उपलब्ध नहीं है";


return;

}




list.innerHTML="";



members.forEach((member)=>{


list.innerHTML += `


<div class="card">


<h3>${member.name}</h3>


<p>
ID: ${member.id}
</p>


<p>
Mobile: ${member.mobile}
</p>


<p>
District: ${member.district}
</p>


</div>


`;


});


}