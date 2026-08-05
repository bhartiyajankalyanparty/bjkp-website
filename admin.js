<!DOCTYPE html>
<html lang="hi">

<head>

<meta charset="UTF-8">

<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>BJKP Admin Panel</title>

<link rel="stylesheet" href="style.css">

<style>

body{
margin:0;
font-family:Arial,sans-serif;
background:#f2f2f2;
}

.header{
background:#0b7a2a;
color:white;
padding:15px;
text-align:center;
}

.header h1{
margin:0;
font-size:24px;
}

.container{
width:95%;
max-width:1100px;
margin:20px auto;
}


.dashboard{
display:grid;
grid-template-columns:repeat(auto-fit,minmax(200px,1fr));
gap:15px;
}


.box{
background:white;
padding:20px;
border-radius:10px;
text-align:center;
box-shadow:0 2px 8px #ccc;
}


.box h3{
margin:5px;
font-size:30px;
color:#0b7a2a;
}


.card{
background:white;
padding:20px;
border-radius:10px;
margin-top:20px;
box-shadow:0 2px 8px #ccc;
}


.card h2{
color:#0b7a2a;
}


input,textarea{

width:100%;
padding:12px;
margin:8px 0;
border:1px solid #ccc;
border-radius:6px;
box-sizing:border-box;

}


textarea{
height:100px;
}


.btn{

background:#0b7a2a;
color:white;
border:none;
padding:12px 20px;
border-radius:6px;
cursor:pointer;

}


.btn:hover{
background:#07551d;
}


</style>

</head>


<body>


<div class="header">

<h1>भारतीय जन कल्याण पार्टी</h1>

<p>Admin Dashboard</p>

</div>



<div class="container">



<!-- DASHBOARD -->

<div class="dashboard">


<div class="box">

<h3 id="totalMembers">0</h3>

<p>कुल सदस्य</p>

</div>


<div class="box">

<h3 id="totalNews">0</h3>

<p>कुल समाचार</p>

</div>


<div class="box">

<h3 id="totalGallery">0</h3>

<p>कुल फोटो</p>

</div>


</div>





<!-- MEMBER ADD FORM -->


<div class="card">

<h2>➕ नया सदस्य जोड़ें</h2>


<input type="text" id="memberName" placeholder="सदस्य का नाम">


<input type="number" id="memberMobile" placeholder="मोबाइल नंबर">


<input type="email" id="memberEmail" placeholder="Email">


<input type="text" id="memberDistrict" placeholder="जिला">


<textarea id="memberAddress" placeholder="पूरा पता"></textarea>



<button class="btn" onclick="addMember()">

सदस्य जोड़ें

</button>


</div>






<!-- NEWS ADD FORM -->


<div class="card">


<h2>📰 नया समाचार जोड़ें</h2>


<input type="text" id="newsTitle" placeholder="समाचार शीर्षक">


<textarea id="newsDescription" placeholder="समाचार विवरण"></textarea>


<input type="text" id="newsImage" placeholder="Image URL">



<button class="btn" onclick="addNews()">

समाचार प्रकाशित करें

</button>


</div>

</div>

<!-- MEMBER LIST SECTION -->


<div class="card">

<h2>👥 सभी सदस्य</h2>


<input type="text" id="searchMember" placeholder="सदस्य खोजें..." onkeyup="searchMember()">



<div id="memberList">

लोड हो रहा है...

</div>


</div>





<!-- EDIT MEMBER SECTION -->


<div class="card">


<h2>✏️ सदस्य Edit करें</h2>


<input type="hidden" id="editId">


<input type="text" id="editName" placeholder="सदस्य का नाम">


<input type="number" id="editMobile" placeholder="मोबाइल नंबर">


<input type="email" id="editEmail" placeholder="Email">


<input type="text" id="editDistrict" placeholder="जिला">


<textarea id="editAddress" placeholder="पूरा पता"></textarea>



<button class="btn" onclick="updateMember()">

Update करें

</button>



</div>

</div>

<script src="admin.js"></script>


</body>

</html>