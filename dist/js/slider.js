const slider1 = new Swiper(".el", {
  slidesPerView: 4,
  spaceBetween: 10,
  slideToClickedSlide: true,
  centeredSlides: true,
  shortSwipes: false,

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
  shortSwipes: false,

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

slider2.on("slideChangeTransitionEnd", function () {
  const index = $(".slider-preview-img")
    .closest(".swiper-slide-active")
    .index();

  slider1.slideTo(index);
});

const slider3 = new Swiper(".reviews", {
  loop: false,
  slidesPerView: 3,
  spaceBetween: 24,
  shortSwipes: false,

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

(function () {
  if (!document.querySelector(".catalog-reviews-desktop")) return;
  let slider = null,
    native = null;

  //desktop
  if (matchMedia) {
    var bp = window.matchMedia("(min-width:1024.02px)");
    bp.addListener(changes);
    changes(bp);
  }
  function changes(bp) {
    if (bp.matches && !slider) {
      slider = new Swiper(".catalog-reviews", {
        slidesPerView: 2,
        spaceBetween: 24,
        shortSwipes: false,
        navigation: {
          nextEl: ".catalog-reviews-next",
          prevEl: ".catalog-reviews-prev",
        },
      });
    }
    if (!bp.matches && !native) {
      //mobile
      const clone = $(".catalog-reviews-desktop .review-card").clone();
      $(".catalog-reviews-mobile .ui-scroller").prepend(clone);
      native = true;
    }
  }
})();

(function () {
  if (!document.querySelector(".catalog-articles-desktop")) return;
  let sliderArticle = "no";

  //mobile
  const clone = $(".catalog-articles-desktop .catalog-articles-item").clone();
  $(".catalog-articles-mobile .ui-scroller").prepend(clone);

  //desktop
  if (matchMedia) {
    var bp = window.matchMedia("(min-width:1024.02px)");
    bp.addListener(changes);
    changes(bp);
  }
  function changes(bp) {
    if (bp.matches && sliderArticle === "no") {
      sliderArticle = new Swiper(".slider_article", {
        slidesPerView: 1,
        spaceBetween: 24,
        autoHeight: true,
        shortSwipes: false,
        navigation: {
          nextEl: ".article-button-next",
          prevEl: ".article-button-prev",
        },
      });
    }
  }
})();

(function () {
  if (!document.querySelector(".catalog-related-desktop")) return;
  let slider = null,
    native = null;

  //desktop
  if (matchMedia) {
    var bp = window.matchMedia("(min-width:1024.02px)");
    bp.addListener(changes);
    changes(bp);
  }
  function changes(bp) {
    if (bp.matches && !slider) {
      slider = new Swiper(".catalog-related-swiper", {
        slidesPerView: 2,
        spaceBetween: 24,
        shortSwipes: false,
        navigation: {
          nextEl: ".catalog-related-next",
          prevEl: ".catalog-related-prev",
        },
        breakpoints: {
          1140: {
            slidesPerView: 3,
          },
        },
      });
    }
    if (!bp.matches && !native) {
      //mobile
      const clone = $(".catalog-related-desktop .slider-product").clone();
      $(".catalog-related-mobile .ui-scroller").prepend(clone);
      native = true;
    }
  }
})();

(function () {
  if (!document.querySelector(".slider-product-topline")) return;

  document.querySelectorAll(".slider-product-topline").forEach((el) => {
    el.addEventListener("click", function (event) {
      event = event || window.event;
      event.preventDefault();
      event.stopPropagation();

      const url = this.dataset.href || null;

      if (document.documentElement.clientWidth > 1024) {
        return event.target
          .closest(".slider-product")
          .classList.toggle("opened");
      }

      if (!url) return;
      $.magnificPopup.open({
        items: { src: url },
        type: "ajax",
        overflowY: "scroll",
        removalDelay: 610,
        mainClass: "my-mfp-zoom-in",
        ajax: {
          tError: "Error. Not valid url",
        },
      });
    });
  });
})();

(function () {
  if (!document.querySelector(".product-card-topline")) return;

  document.querySelectorAll(".product-card-topline").forEach((el) => {
    el.addEventListener("click", function (event) {
      event = event || window.event;
      event.preventDefault();
      event.stopPropagation();

      const url = this.dataset.href || null;

      if (document.documentElement.clientWidth > 1024) {
        return event.target.closest(".product-card").classList.toggle("opened");
      }

      if (!url) return;
      $.magnificPopup.open({
        items: { src: url },
        type: "ajax",
        overflowY: "scroll",
        removalDelay: 610,
        mainClass: "my-mfp-zoom-in",
        ajax: {
          tError: "Error. Not valid url",
        },
      });
    });
  });
})();

(function () {
  if (!document.querySelector(".catalog-filters-toggler")) return;

  document.querySelectorAll(".catalog-filters-toggler").forEach((el) =>
    el.addEventListener("click", function (e) {
      e = e || window.event;
      e.preventDefault();

      const txt = this.querySelector(".catalog-filters-toggler-txt");
      const icon = this.querySelector(".ui-btn-icon");

      if (this.classList.contains("opened")) {
        txt.textContent = "Показать все";
        icon.classList.add("ui-btn-icon-plus");
        icon.classList.remove("ui-btn-icon-cancel");
      } else {
        txt.textContent = "Скрыть";
        icon.classList.remove("ui-btn-icon-plus");
        icon.classList.add("ui-btn-icon-cancel");
      }

      this.classList.toggle("opened");

      const group = this.closest(".catalog-filters-group");
      if (!group) return;

      group
        .querySelectorAll(".catalog-filters-hidden")
        .forEach((item) => item.classList.toggle("opened"));
    })
  );
})();

(function () {
  // if (!document.querySelector('.video-card-link')) return

  $(".video-card-link, .mfp-frame").on("click", function (e) {
    e.preventDefault();

    const url = $(this).attr("data-href") || null;
    if (!url) return;

    $.magnificPopup.open({
      items: { src: url },
      type: "iframe",
      disableOn: 700,
      mainClass: "mfp-fade",
      removalDelay: 160,
      preloader: false,
      fixedContentPos: false,
    });
  });
})();

//fixing submit btn in filters
(function () {
  if (!document.querySelector(".catalog-filters-submit")) return;

  const filters = document.querySelector(".catalog-filters");
  const submit = filters.querySelector(".catalog-filters-submit");

  document.addEventListener("scroll", () => {
    if (document.documentElement.clientWidth < 1024) return;

    const sc = window.pageYOffset;
    const offset = filters.offsetTop;
    const rect = filters.getBoundingClientRect();
    const vh = document.documentElement.clientHeight;

    //81 - btn height + position offset from bottom
    if (sc + vh - 81 > offset && sc + vh < offset + rect.height) {
      submit.classList.add("fixed");
      submit.classList.remove("fixed-bottom");
      submit.style.width = rect.width + "px";
    } else if (sc + vh > offset + rect.height) {
      submit.classList.add("fixed-bottom");
      submit.classList.remove("fixed");
      submit.style.width = rect.width + "px";
    } else {
      submit.classList.remove("fixed");
      submit.classList.remove("fixed-bottom");
      submit.style.width = "";
    }
  });
})();

(function () {
  if (!document.querySelector(".catalog-filters-close")) return;

  document
    .querySelector(".catalog-filters-close")
    .addEventListener("click", () => {
      document.querySelector(".catalog-filters").classList.remove("opened");
    });
})();

(function () {
  if (!document.querySelector(".catalog-filters-bg")) return;

  document
    .querySelector(".catalog-filters-bg")
    .addEventListener("click", () => {
      document.querySelector(".catalog-filters").classList.remove("opened");
    });
})();

(function () {
  if (!document.querySelector(".catalog-settings-filters")) return;

  document
    .querySelector(".catalog-settings-filters")
    .addEventListener("click", () => {
      document.querySelector(".catalog-filters").classList.add("opened");
    });
})();
