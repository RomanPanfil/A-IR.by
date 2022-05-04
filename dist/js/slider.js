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
  spaceBetween: 10,
  slideToClickedSlide: true,


  navigation: {
    nextEl: ".button-next",
    prevEl: ".button-prev",
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

const slider2 = new Swiper('.preview', {
  
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  pagination: {
    el: '.swiper-pagination',
  },
});

$('.slider-el-slide').on('click', function (e) {
  const index = $(this).closest('.swiper-slide').index();
    
  slider2.slideTo(index);
  
  e.preventDefault();
})

const slider3 = new Swiper('.reviews', {
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
    },

    580: {
      slidesPerView: 2,
      init: false,
    },
    
    300: {
      slidesPerView: 1,
      init: false,
      spaceBetween: 16,
    },
  }
});