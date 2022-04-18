const slider1 = new Swiper('.el', {
  slidesPerView: 4,
  spaceBetween: 0,
  slideToClickedSlide: true,
  loop: true,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

const slider2 = new Swiper('.preview', {
  loop: true,
  
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

const slider3 = new Swiper('.reviews', {
  slidesPerView: 3,
  spaceBetween: 24,
  loop: true,

  navigation: {
    nextEl: ".swiper-next",
    prevEl: ".swiper-prev",
  },
});