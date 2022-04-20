// const swiper = new Swiper(".product-swiper", {
//   // Optional parameters
//   loop: true,
//   slidesPerView: 4,
//   // Navigation arrows
//   navigation: {
//     nextEl: ".swiper-button-next",
//     prevEl: ".swiper-button-prev",
//   },
// });
// let mql = window.matchMedia("(min-width: 992px)");

// window.addEventListener("resize", () => {
//   if (mql.matches) {
//     const swiper = new Swiper(".product-swiper", {
//       // Optional parameters
//       loop: true,
//       slidesPerView: 4,
//       // Navigation arrows
//       navigation: {
//         nextEl: ".swiper-button-next",
//         prevEl: ".swiper-button-prev",
//       },
//     });
//   } else {
//     swiper.destroy();
//   }
// });
const slider1 = new Swiper(".el", {
  slidesPerView: 4,
  spaceBetween: 0,
  slideToClickedSlide: true,
  loop: true,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

const slider2 = new Swiper(".preview", {
  loop: true,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

const slider3 = new Swiper(".reviews", {
  slidesPerView: 3,
  spaceBetween: 24,
  loop: true,

  navigation: {
    nextEl: ".swiper-next",
    prevEl: ".swiper-prev",
  },
});
