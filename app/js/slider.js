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

const sliderEl = new Swiper(".el", {
  slidesPerView: 4,
  spaceBetween: 0,
  slideToClickedSlide: true,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    1024: {
      slidesPerView: 4,
    },

    300: {
      slidesPerView: 3,
    },
  }
});

const sliderPreview = new Swiper('.preview', {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  pagination: {
    el: '.swiper-pagination',
  },
});

const sliderReviews = new Swiper('.reviews', {
  loop: false,
  slidesPerView: 3,
  spaceBetween: 24,

  navigation: {
    nextEl: ".swiper-next",
    prevEl: ".swiper-prev",
  },

  breakpoints: {   
    1024: {
      slidesPerView: 3,
      init: true,
      enabled: true,
    },

    580: {
      slidesPerView: 2,
      init: false,
      enabled: false,
    },
    
    300: {
      slidesPerView: 1,
      init: false,
      enabled: false,
      spaceBetween: 16,
    },
  }
});