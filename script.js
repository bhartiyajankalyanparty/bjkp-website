// BJKP Website Main JavaScript


// Page Load Message

document.addEventListener("DOMContentLoaded", function(){


console.log("BJKP Website Loaded Successfully");



// Latest News Demo Data

let newsBox = document.getElementById("latestNews");


if(newsBox){


newsBox.innerHTML = `

<div class="card">

<h3>भारतीय जन कल्याण पार्टी</h3>

<p>
जन सेवा और विकास के संकल्प के साथ पार्टी निरंतर कार्य कर रही है।
</p>

</div>

`;

}


});