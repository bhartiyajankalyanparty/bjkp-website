document.addEventListener("DOMContentLoaded", function () {
    const button = document.querySelector("button");

    button.addEventListener("click", function () {
        alert("जल्द ही ऑनलाइन सदस्यता फॉर्म उपलब्ध होगा।");
    });
});
// Image Slider
const images = [
  "image/banner1.png",
  "image/banner2.png",
  "image/banner3.png"
];

let current = 0;

setInterval(() => {
  current = (current + 1) % images.length;
  const slider = document.getElementById("sliderImage");
  if (slider) {
    slider.src = images[current];
  }
}, 3000);