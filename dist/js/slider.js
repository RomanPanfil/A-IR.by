const swiper = new Swiper(".swiper", {
  // Optional parameters
  loop: true,
  slidesPerView: 4,
  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

const slider2 = new Swiper(".preview", {
  navigation: {
    nextEl: ".next",
    prevEl: ".prev",
  },
});
