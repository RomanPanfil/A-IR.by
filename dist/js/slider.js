const slider1 = new Swiper(".el", {
  slidesPerView: 4,
  spaceBetween: 10,
  slideToClickedSlide: true,
  centeredSlides: true,

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
  },
});

const slider2 = new Swiper(".preview", {
  centeredSlides: true,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  pagination: {
    el: ".swiper-pagination",
  },
});

$(".slider-el-slide").on("click", function (e) {
  const index = $(this).closest(".swiper-slide").index();

  slider2.slideTo(index);

  e.preventDefault();
});

slider2.on('slideChangeTransitionEnd', function () {
    const index = $(".slider-preview-img").closest(".swiper-slide-active").index();

    slider1.slideTo(index);
});

const slider3 = new Swiper(".reviews", {
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
  },
});

// Slider for catalog.html -> article

// destroy .slider_article

const breakpoint = window.matchMedia("(max-width:1024px)");
let sliderArticle;
const breakpointChecker = function () {
  if (breakpoint.matches === true) {
    if (sliderArticle !== undefined) sliderArticle.destroy(true, true);

    return;
  } else if (breakpoint.matches === false) {
    return enableSwiper();
  }
};

const enableSwiper = function () {
  const sliderArticle = new Swiper(".slider_article", {
    slidesPerView: 1,
    // spaceBetween: 10,

    navigation: {
      nextEl: ".article-button-next",
      prevEl: ".article-button-prev",
    },
  });
};

breakpoint.addListener(breakpointChecker);
// kickstart
breakpointChecker();
