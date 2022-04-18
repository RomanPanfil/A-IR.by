const swiper = new Swiper(".nazz-swiper", {
  // Optional parameters
  loop: true,
  slidesPerView: 4,
  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

const slider1 = new Swiper(".el", {
  slidesPerView: 4,
  spaceBetween: 0,
  slideToClickedSlide: true,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

const slider2 = new Swiper(".preview", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
<<<<<<< HEAD
=======

// const slider3 = new Swiper('.reviews', {
//   slidesPerView: 3,

//   navigation: {
//     nextEl: ".swiper-button-next",
//     prevEl: ".swiper-button-prev",
//   },
// });
>>>>>>> main
