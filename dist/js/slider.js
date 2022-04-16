const slider1 = new Swiper('.mySwiper', {
  slidesPerView: 4,
  spaceBetween: 0,
  width: 372,
  slideToClickedSlide: true,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});