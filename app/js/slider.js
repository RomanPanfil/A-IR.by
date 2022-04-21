const swiperNazz = new Swiper(".product-swiper", {
  // Optional parameters
  loop: true,
  slidesPerView: 4,
  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

let mql = window.matchMedia("(min-width: 1260px)");

window.addEventListener("resize", () => {
  if (mql.matches) {
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
  } else {
    console.log("done");
    // swiperNazz.destroy();
    document.querySelector(".zxc").classList.remove("swiper");
    document.querySelector(".zxc-wrap").classList.remove("swiper-wrapper");
    let arr = document.querySelectorAll(".zxc-slide");
    arr.forEach((el) => {
      el.classList.remove("swiper-slide");
      el.classList.remove("swiper-slide-duplicate");
      el.classList.remove("swiper-slide-duplicate-active");
      el.classList.remove("swiper-slide-duplicate-next");
    });
  }
});
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
