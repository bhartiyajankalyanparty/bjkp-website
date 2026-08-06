/* =====================================
   BJKP Official Website JavaScript
===================================== */

document.addEventListener("DOMContentLoaded", () => {

    // ==========================
    // Sticky Header Shadow
    // ==========================
    const header = document.querySelector("header");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 30) {
            header.style.boxShadow = "0 10px 25px rgba(0,0,0,.25)";
        } else {
            header.style.boxShadow = "0 5px 20px rgba(0,0,0,.20)";
        }
    });

    // ==========================
    // Reveal Animation
    // ==========================

    const revealItems = document.querySelectorAll(
        ".hero-left,.hero-right,.about,.vision,.card,footer"
    );

    const reveal = () => {

        const windowHeight = window.innerHeight;

        revealItems.forEach(item => {

            const top = item.getBoundingClientRect().top;

            if (top < windowHeight - 100) {
                item.classList.add("show");
            }

        });

    };

    window.addEventListener("scroll", reveal);

    reveal();

    // ==========================
    // Active Navigation
    // ==========================

    const navLinks = document.querySelectorAll("nav ul li a");

    navLinks.forEach(link => {

        if (link.href === window.location.href) {

            link.style.color = "#d4af37";
            link.style.fontWeight = "700";

        }

    });

});


// ==============================
// Scroll To Top Button
// ==============================

const topBtn = document.createElement("button");

topBtn.innerHTML = "↑";

topBtn.id = "topButton";

document.body.appendChild(topBtn);

topBtn.style.position = "fixed";
topBtn.style.right = "20px";
topBtn.style.bottom = "20px";
topBtn.style.width = "50px";
topBtn.style.height = "50px";
topBtn.style.border = "none";
topBtn.style.borderRadius = "50%";
topBtn.style.background = "#5b0f1d";
topBtn.style.color = "#fff";
topBtn.style.fontSize = "22px";
topBtn.style.cursor = "pointer";
topBtn.style.display = "none";
topBtn.style.zIndex = "9999";
topBtn.style.transition = ".3s";

window.addEventListener("scroll", () => {

    if (window.scrollY > 300) {

        topBtn.style.display = "block";

    } else {

        topBtn.style.display = "none";

    }

});

topBtn.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});


// ==============================
// Card Hover Animation
// ==============================

const cards = document.querySelectorAll(".card");

cards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-12px) scale(1.03)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "translateY(0px) scale(1)";

    });

});


// ==============================
// Hero Image Animation
// ==============================

