document.addEventListener("DOMContentLoaded", function () {
    const button = document.querySelector("button");

    button.addEventListener("click", function () {
        alert("जल्द ही ऑनलाइन सदस्यता फॉर्म उपलब्ध होगा।");
    });
});
// Image Slider
const images = [
  "image/banner1.jpg",
  "image/banner2.jpg",
  "image/banner3.jpg"
];

let current = 0;

setInterval(() => {
  current = (current + 1) % images.length;
  const slider = document.getElementById("sliderImage");
  if (slider) {
    slider.src = images[current];
  }
}, 3000);