/*==========================================
  Bharatiya Jan Kalyan Party (BJKP)
  Official Website Script
  PART 1
==========================================*/

"use strict";

/* ==========================
   Loader
========================== */

window.addEventListener("load", () => {

    const loader = document.querySelector(".loader");

    if (loader) {

        setTimeout(() => {

            loader.style.opacity = "0";
            loader.style.visibility = "hidden";

            setTimeout(() => {

                loader.style.display = "none";

            }, 500);

        }, 800);

    }

});


/* ==========================
   Mobile Menu
========================== */

const menuBtn = document.getElementById("menu-btn");
const navbar = document.getElementById("navbar");

if (menuBtn && navbar) {

    menuBtn.addEventListener("click", () => {

        navbar.classList.toggle("active");

    });

    document.querySelectorAll("#navbar a").forEach(link => {

        link.addEventListener("click", () => {

            navbar.classList.remove("active");

        });

    });

}


/* ==========================
   Sticky Header
========================== */

const header = document.getElementById("header");

if (header) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {

            header.style.boxShadow =
                "0 8px 25px rgba(0,0,0,.15)";

            header.style.background = "#ffffff";

        } else {

            header.style.boxShadow = "none";

            header.style.background = "#ffffff";

        }

    });

}


/* ==========================
   Console Message
========================== */

console.log("✅ BJKP Official Website Loaded Successfully");

/*==========================================
  Bharatiya Jan Kalyan Party (BJKP)
  Official Website Script
  PART 2
==========================================*/

/* ==========================
   Back To Top Button
========================== */

const topBtn = document.getElementById("topBtn");

if (topBtn) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 300) {

            topBtn.style.display = "flex";

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

}


/* ==========================
   Smooth Navigation
========================== */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (e) {

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            e.preventDefault();

            target.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});


/* ==========================
   Active Navigation
========================== */

const currentPage = location.pathname.split("/").pop();

document.querySelectorAll("#navbar a").forEach(link => {

    if (link.getAttribute("href") === currentPage) {

        link.classList.add("active");

    }

});


/* ==========================
   Hero Auto Slider
========================== */

const hero = document.querySelector(".hero");

const heroImages = [

    "images/banner1.jpg",
    "images/banner2.jpg",
    "images/banner3.jpg"

];

let heroIndex = 0;

function changeHero() {

    if (!hero) return;

    hero.style.background =

    `linear-gradient(rgba(107,15,26,.80),rgba(107,15,26,.80)),
    url('${heroImages[heroIndex]}') center/cover no-repeat`;

    heroIndex++;

    if (heroIndex >= heroImages.length) {

        heroIndex = 0;

    }

}

if (hero) {

    changeHero();

    setInterval(changeHero, 5000);

}


/* ==========================
   Hero Fade Animation
========================== */

if (hero) {

    setInterval(() => {

        hero.style.opacity = "0.96";

        setTimeout(() => {

            hero.style.opacity = "1";

        }, 500);

    }, 5000);

}


/* ==========================
   Console
========================== */

console.log("✅ Part 2 Loaded Successfully");

/*==========================================
  Bharatiya Jan Kalyan Party (BJKP)
  Official Website Script
  PART 3
==========================================*/

/* ==========================
   Animated Counter
========================== */

const counters = document.querySelectorAll(".counter");

const startCounter = (counter) => {

    const target = Number(counter.dataset.target);
    let count = 0;

    const speed = Math.max(15, Math.floor(2000 / target));

    const update = () => {

        if (count < target) {

            count += Math.ceil(target / 100);

            if (count > target) count = target;

            counter.innerText = count;

            setTimeout(update, speed);

        } else {

            counter.innerText = target;

        }

    };

    update();

};

const counterObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            startCounter(entry.target);

            counterObserver.unobserve(entry.target);

        }

    });

}, {

    threshold: 0.5

});

counters.forEach(counter => {

    counterObserver.observe(counter);

});


/* ==========================
   Scroll Reveal Animation
========================== */

const revealItems = document.querySelectorAll(

".about-card,.card,.counter-box,.gallery-grid img,.contact-grid div,.president-card,.message-left,.message-right"

);

const revealObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("fade-up");

            revealObserver.unobserve(entry.target);

        }

    });

}, {

    threshold: 0.15

});

revealItems.forEach(item => {

    revealObserver.observe(item);

});


/* ==========================
   Live Date & Time
========================== */

function updateDateTime() {

    const now = new Date();

    const dateBox = document.getElementById("live-date");

    const timeBox = document.getElementById("live-time");

    if (dateBox) {

        dateBox.innerHTML = now.toLocaleDateString("hi-IN", {

            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"

        });

    }

    if (timeBox) {

        timeBox.innerHTML = now.toLocaleTimeString("hi-IN");

    }

}

updateDateTime();

setInterval(updateDateTime, 1000);


/* ==========================
   Scroll Progress
========================== */

window.addEventListener("scroll", () => {

    const totalHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const progress =

        (window.scrollY / totalHeight) * 100;

    document.documentElement.style.setProperty(

        "--scroll-progress",

        progress + "%"

    );

});


/* ==========================
   Console
========================== */

console.log("✅ Part 3 Loaded Successfully");

/*==========================================
  Bharatiya Jan Kalyan Party (BJKP)
  Official Website Script
  PART 4
==========================================*/

/* ==========================
   Dark Mode
========================== */

const darkBtn = document.getElementById("dark-mode");

if (localStorage.getItem("theme") === "dark") {

    document.body.classList.add("dark-mode");

}

if (darkBtn) {

    darkBtn.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {

            localStorage.setItem("theme", "dark");

        } else {

            localStorage.setItem("theme", "light");

        }

    });

}


/* ==========================
   Premium Gallery Lightbox
========================== */

const galleryImages = document.querySelectorAll(".gallery-grid img");

galleryImages.forEach(img => {

    img.addEventListener("click", () => {

        const overlay = document.createElement("div");

        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.background = "rgba(0,0,0,.9)";
        overlay.style.display = "flex";
        overlay.style.justifyContent = "center";
        overlay.style.alignItems = "center";
        overlay.style.zIndex = "99999";
        overlay.style.cursor = "zoom-out";

        const image = document.createElement("img");

        image.src = img.src;
        image.alt = img.alt;
        image.style.maxWidth = "90%";
        image.style.maxHeight = "90%";
        image.style.borderRadius = "15px";
        image.style.boxShadow = "0 10px 30px rgba(255,255,255,.2)";

        overlay.appendChild(image);

        document.body.appendChild(overlay);

        overlay.addEventListener("click", () => {

            overlay.remove();

        });

    });

});


/* ==========================
   Typing Effect
========================== */

const typing = document.querySelector(".typing");

if (typing) {

    const text = typing.textContent;

    typing.textContent = "";

    let i = 0;

    function typeWriter() {

        if (i < text.length) {

            typing.textContent += text.charAt(i);

            i++;

            setTimeout(typeWriter, 70);

        }

    }

    typeWriter();

}


/* ==========================
   Lazy Image Animation
========================== */

const lazyImages = document.querySelectorAll("img");

const imgObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";
            entry.target.style.transform = "scale(1)";

        }

    });

});

lazyImages.forEach(img => {

    img.style.opacity = "0";
    img.style.transform = "scale(.95)";
    img.style.transition = ".6s";

    imgObserver.observe(img);

});


/* ==========================
   Page Visibility API
========================== */

document.addEventListener("visibilitychange", () => {

    if (document.hidden) {

        console.log("Website Paused");

    } else {

        console.log("Website Active");

    }

});


/* ==========================
   Performance Log
========================== */

window.addEventListener("pageshow", () => {

    console.log("⚡ Website Running Smoothly");

});


console.log("✅ Part 4 Loaded Successfully");

/*==========================================
  Bharatiya Jan Kalyan Party (BJKP)
  Official Website Script
  PART 5
==========================================*/

/* ==========================
   Language Switch
========================== */

const langBtn = document.getElementById("lang-btn");

if (langBtn) {

    let hindi = true;

    langBtn.addEventListener("click", () => {

        if (hindi) {

            langBtn.innerHTML = "🇬🇧 English";
            document.documentElement.lang = "en";

        } else {

            langBtn.innerHTML = "🇮🇳 हिन्दी";
            document.documentElement.lang = "hi";

        }

        hindi = !hindi;

    });

}


/* ==========================
   Search Filter
========================== */

const searchInput = document.getElementById("search-box");

if (searchInput) {

    searchInput.addEventListener("keyup", function () {

        const value = this.value.toLowerCase();

        document.querySelectorAll(".search-item").forEach(item => {

            item.style.display =
                item.innerText.toLowerCase().includes(value)
                ? "block"
                : "none";

        });

    });

}


/* ==========================
   Share Website
========================== */

const shareBtn = document.getElementById("shareBtn");

if (shareBtn) {

    shareBtn.addEventListener("click", async () => {

        if (navigator.share) {

            try {

                await navigator.share({

                    title: "भारतीय जन कल्याण पार्टी",

                    text: "जन-जन का विश्वास, राष्ट्र का विकास",

                    url: window.location.href

                });

            } catch (err) {

                console.log(err);

            }

        } else {

            showToast("Share is not supported on this device.");

        }

    });

}


/* ==========================
   Copy Website Link
========================== */

const copyBtn = document.getElementById("copyBtn");

if (copyBtn) {

    copyBtn.addEventListener("click", async () => {

        try {

            await navigator.clipboard.writeText(window.location.href);

            showToast("Website Link Copied Successfully");

        } catch {

            showToast("Unable to Copy Link");

        }

    });

}


/* ==========================
   Print Page
========================== */

const printBtn = document.getElementById("printBtn");

if (printBtn) {

    printBtn.addEventListener("click", () => {

        window.print();

    });

}


/* ==========================
   Toast Notification
========================== */

function showToast(message) {

    const toast = document.createElement("div");

    toast.innerText = message;

    toast.style.position = "fixed";
    toast.style.bottom = "30px";
    toast.style.left = "50%";
    toast.style.transform = "translateX(-50%)";
    toast.style.background = "#6b0f1a";
    toast.style.color = "#fff";
    toast.style.padding = "12px 22px";
    toast.style.borderRadius = "8px";
    toast.style.fontWeight = "600";
    toast.style.boxShadow = "0 10px 25px rgba(0,0,0,.25)";
    toast.style.zIndex = "999999";

    document.body.appendChild(toast);

    setTimeout(() => {

        toast.remove();

    }, 2500);

}


/* ==========================
   Online / Offline Status
========================== */

window.addEventListener("online", () => {

    showToast("Internet Connected");

});

window.addEventListener("offline", () => {

    showToast("No Internet Connection");

});


/* ==========================
   Console
========================== */

console.log("✅ Part 5 Loaded Successfully");

/*==========================================
  Bharatiya Jan Kalyan Party (BJKP)
  Official Website Script
  PART 6 (FINAL)
==========================================*/

/* ==========================
   Lazy Loading Images
========================== */

document.querySelectorAll("img").forEach(img => {

    img.loading = "lazy";

});


/* ==========================
   Active Navigation
========================== */

const currentPage = window.location.pathname.split("/").pop();

document.querySelectorAll("#navbar a").forEach(link => {

    const href = link.getAttribute("href");

    if (href === currentPage || (currentPage === "" && href === "index.html")) {

        link.classList.add("active");

    }

});


/* ==========================
   Footer Year
========================== */

const year = document.getElementById("year");

if (year) {

    year.textContent = new Date().getFullYear();

}


/* ==========================
   Keyboard Shortcuts
========================== */

document.addEventListener("keydown", (e) => {

    // Ctrl + Home
    if (e.ctrlKey && e.key.toLowerCase() === "h") {

        e.preventDefault();

        window.location.href = "index.html";

    }

    // Ctrl + End
    if (e.ctrlKey && e.key.toLowerCase() === "e") {

        e.preventDefault();

        window.scrollTo({

            top: document.body.scrollHeight,
            behavior: "smooth"

        });

    }

});


/* ==========================
   Network Status
========================== */

window.addEventListener("online", () => {

    console.log("✅ Internet Connected");

});

window.addEventListener("offline", () => {

    console.log("❌ Internet Disconnected");

});


/* ==========================
   Page Loaded
========================== */

window.addEventListener("DOMContentLoaded", () => {

    console.log("🚀 Website Initialized Successfully");

});


/* ==========================
   Performance Timer
========================== */

window.addEventListener("load", () => {

    const loadTime = performance.now();

    console.log(
        "⚡ Page Loaded in " +
        (loadTime / 1000).toFixed(2) +
        " Seconds"
    );

});


/* ==========================
   Developer Console
========================== */

console.log("%cBJKP Official Website",
"color:#6b0f1a;font-size:22px;font-weight:bold;");

console.log("%cDeveloped for Bharatiya Jan Kalyan Party",
"color:#c89b3c;font-size:15px;");

console.log("%cAll Scripts Loaded Successfully ✅",
"color:green;font-size:16px;font-weight:bold;");


/* ==========================
   End of Script
========================== */

console.log("🎉 script.js Loaded Successfully");