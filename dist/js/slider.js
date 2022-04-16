const slider1 = new Swiper('.el', {
  slidesPerView: 4,
  spaceBetween: 0,
  width: 372,
  slideToClickedSlide: true,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

const slider2 = new Swiper('.preview', {
  navigation: {
    nextEl: ".next",
    prevEl: ".prev",
  },
});