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
  loop: true,

  navigation: {
    nextEl: ".swiper-next",
    prevEl: ".swiper-prev",
  },
});


console.log(slider2.navigation.nextEl)
console.log(slider3.navigation.nextEl)