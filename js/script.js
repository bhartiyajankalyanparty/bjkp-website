/*==========================================
  Bharatiya Jan Kalyan Party
  Official Website Script
  Part 1
==========================================*/

"use strict";

/* ==========================
   Loader
========================== */

window.addEventListener("load", function () {

    const loader = document.querySelector(".loader");

    if (loader) {

        setTimeout(function () {

            loader.style.opacity = "0";

            loader.style.visibility = "hidden";

        }, 800);

    }

});


/* ==========================
   Mobile Menu
========================== */

const menuBtn = document.getElementById("menu-btn");
const navbar = document.getElementById("navbar");

if (menuBtn && navbar) {

    menuBtn.addEventListener("click", function () {

        navbar.classList.toggle("active");

    });

}


/* ==========================
   Sticky Header Shadow
========================== */

const header = document.getElementById("header");

window.addEventListener("scroll", function () {

    if (window.scrollY > 50) {

        header.style.boxShadow = "0 8px 25px rgba(0,0,0,.15)";

    } else {

        header.style.boxShadow = "none";

    }

});


/* ==========================
   Back To Top Button
========================== */

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", function () {

    if (window.scrollY > 300) {

        topBtn.style.display = "block";

    } else {

        topBtn.style.display = "none";

    }

});


if (topBtn) {

    topBtn.addEventListener("click", function () {

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

}


/* ==========================
   Smooth Navigation
========================== */

document.querySelectorAll('a[href^="#"]').forEach(link=>{

link.addEventListener("click",function(e){

e.preventDefault();

let target=document.querySelector(this.getAttribute("href"));

if(target){

target.scrollIntoView({

behavior:"smooth"

});

}

});

});


/* ==========================
   Active Navigation
========================== */

const navLinks=document.querySelectorAll("nav ul li a");

navLinks.forEach(link=>{

link.addEventListener("click",function(){

navLinks.forEach(item=>item.classList.remove("active"));

this.classList.add("active");

});

});


/* ==========================
   Hero Auto Slider
========================== */

const heroImages=[

"images/banner1.jpg",

"images/banner2.jpg",

"images/banner3.jpg"

];

let heroIndex=0;

const hero=document.querySelector(".hero");

function changeHero(){

if(hero){

hero.style.background=

`linear-gradient(rgba(107,15,26,.80),rgba(107,15,26,.80)),url('${heroImages[heroIndex]}') center/cover`;

heroIndex++;

if(heroIndex>=heroImages.length){

heroIndex=0;

}

}

}

setInterval(changeHero,5000);


/* ==========================
   Console Message
========================== */

console.log("BJKP Official Website Loaded Successfully");

/*==========================================
      SCRIPT.JS PART 2
==========================================*/


/* ==========================
      Animated Counter
========================== */

const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {

const updateCounter = () => {

const target = +counter.getAttribute("data-target");

const count = +counter.innerText;

const speed = target / 100;

if(count < target){

counter.innerText = Math.ceil(count + speed);

setTimeout(updateCounter,20);

}else{

counter.innerText = target;

}

};

updateCounter();

});


/* ==========================
      Scroll Reveal
========================== */

const revealElements = document.querySelectorAll(

".about-card,.card,.counter-box,.gallery-grid img,.contact-grid div,.president-card"

);

window.addEventListener("scroll",function(){

const trigger = window.innerHeight * 0.85;

revealElements.forEach(el=>{

const top = el.getBoundingClientRect().top;

if(top < trigger){

el.classList.add("fade-up");

}

});

});


/* ==========================
      Live Date & Time
========================== */

function updateDateTime(){

const date = new Date();

const options = {

weekday:"long",

year:"numeric",

month:"long",

day:"numeric"

};

const fullDate = date.toLocaleDateString("hi-IN",options);

const time = date.toLocaleTimeString("hi-IN");

const dateBox = document.getElementById("live-date");

const timeBox = document.getElementById("live-time");

if(dateBox){

dateBox.innerHTML = fullDate;

}

if(timeBox){

timeBox.innerHTML = time;

}

}

setInterval(updateDateTime,1000);


/* ==========================
      Dark Mode
========================== */

const darkBtn = document.getElementById("dark-mode");

if(darkBtn){

darkBtn.addEventListener("click",()=>{

document.body.classList.toggle("dark-mode");

localStorage.setItem(

"theme",

document.body.classList.contains("dark-mode")

? "dark"

: "light"

);

});

}

if(localStorage.getItem("theme")==="dark"){

document.body.classList.add("dark-mode");

}


/* ==========================
      Gallery Lightbox
========================== */

const galleryImages = document.querySelectorAll(".gallery-grid img");

galleryImages.forEach(img=>{

img.addEventListener("click",()=>{

const lightbox=document.createElement("div");

lightbox.id="lightbox";

lightbox.style.position="fixed";

lightbox.style.top="0";

lightbox.style.left="0";

lightbox.style.width="100%";

lightbox.style.height="100%";

lightbox.style.background="rgba(0,0,0,.9)";

lightbox.style.display="flex";

lightbox.style.justifyContent="center";

lightbox.style.alignItems="center";

lightbox.style.zIndex="99999";

const image=document.createElement("img");

image.src=img.src;

image.style.maxWidth="90%";

image.style.maxHeight="90%";

image.style.borderRadius="15px";

lightbox.appendChild(image);

document.body.appendChild(lightbox);

lightbox.addEventListener("click",()=>{

lightbox.remove();

});

});

});


/* ==========================
      Typing Effect
========================== */

const typing = document.querySelector(".typing");

if(typing){

const text = typing.innerHTML;

typing.innerHTML="";

let i=0;

function type(){

if(i<text.length){

typing.innerHTML+=text.charAt(i);

i++;

setTimeout(type,80);

}

}

type();

}


/* ==========================
      Performance
========================== */

window.addEventListener("pageshow",()=>{

console.log("BJKP Website Running Smoothly");

});

