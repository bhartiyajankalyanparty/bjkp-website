// ==============================
// BJKP Official Website Script
// ==============================

document.addEventListener("DOMContentLoaded", function () {

    // Mobile Menu
    const menuToggle = document.getElementById("menuToggle");
    const navbar = document.getElementById("navbar");

    if (menuToggle && navbar) {
        menuToggle.addEventListener("click", function () {
            navbar.classList.toggle("active");
        });
    }

    console.log("BJKP Website Loaded Successfully");

});