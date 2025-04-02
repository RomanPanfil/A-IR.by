const D = document;




const FARBA = {
  //lazy load для сторонних либ
  lazyLibraryLoad(scriptSrc, linkHref, callback) {
    let script;
    const domScript = document.querySelector(`script[src="${scriptSrc}"]`);
    const domLink = document.querySelector(`link[href="${linkHref}"]`);

    if (!domScript) {
      script = document.createElement("script");
      script.src = scriptSrc;
      document.querySelector("#wrapper").after(script);
    }

    if (linkHref !== "" && !domLink) {
      let style = document.createElement("link");
      style.href = linkHref;
      style.rel = "stylesheet";
      document.querySelector("link").before(style);
    }

    if (!domScript) {
      script.onload = callback;
    } else {
      // domScript.onload = callback;
      callback();
    }
  },

  scroller(selector) {
    const link = D.querySelectorAll(selector);
    if (!link.length) return;

    link.forEach((el) => {
      const target = D.querySelector(el.dataset.target);
      if (target) {
        el.addEventListener("click", (e) => {
          e = e || window.event;
          e.preventDefault();
          // target.scrollIntoView({
          //   behavior: "smooth"
          // });
          window.scrollTo({
            top: target.offsetTop,
            behavior: "smooth",
          });
        });
      }
    });
  },
};


function safariFnc(selector) {
  var ua = navigator.userAgent.toLowerCase();

  if (ua.indexOf('safari') != -1) {
    if (ua.indexOf('chrome') > -1) {
      $(selector).styler();
    } else {
      if (document.querySelector('.catalog-settings')) {
        $(selector).addClass('safari-select-search')
      } else {
        $(selector).addClass('safari-select')
      }

    }
  }
}

safariFnc('select');


$.fn.Tabs = function () {
  var selector = this;

  this.each(function () {
    var obj = $(this);
    $(obj.attr("href")).hide();
    $(obj).click(function () {
      $(selector).removeClass("selected");

      $(selector).each(function (i, element) {
        $($(element).attr("href")).hide();
      });

      $(this).addClass("selected");
      $($(this).attr("href")).fadeIn();
      return false;
    });
  });

  $(this).show();
  $(this).first().click();
  if (location.hash != "" && $('a[href="' + location.hash + '"]').length)
    $('a[href="' + location.hash + '"]').click();
};

//mobile tabs
(function () {
  if (!D.querySelector(".card-tabs-link")) return;

  D.querySelectorAll(".card-tabs-link").forEach((el) => {
    const tab = D.querySelector(el.getAttribute("href"));
    if (tab) {
      const link = D.createElement("a");
      link.href = "javascript:void(0)";
      link.className = "card-tabs-link-mobile";
      link.textContent = el.textContent;
      link.dataset.href = el.getAttribute("href");
      tab.before(link);
    }
  });

  D.querySelectorAll(".card-tabs-link-mobile").forEach((el) =>
    el.addEventListener("click", function (e) {
      e = e || window.event;
      e.preventDefault();

      const tab = D.querySelector(this.dataset.href);

      this.classList.toggle("opened");
      tab.classList.toggle("opened");
    })
  );
})();

//card rebuild
(function () {
  if (matchMedia) {
    const screen = window.matchMedia("(max-width:1024px)");
    screen.addListener(changes);
    changes(screen);
  }
  function changes(screen) {
    if (screen.matches) {
      //экран менее 1024
      $(".card-more-mobile").prepend($("#tabs"));
      $(".card-more-mobile").after($(".card-contacts"));
      $(".col-card-right").append($(".card-services"));
      $(".deliverypay-items-matchmedia").appendTo($(".deliverypay-mathmedia"));
    } else {
      //экран более 1024
      $(".card-more-info").prepend($("#tabs"));
      $(".card-features").after($(".card-contacts"));
      $(".card-txt").append($(".card-services"));
      $(".deliverypay-wrapper-matchmedia").append(
        $(".deliverypay-items-matchmedia")
      );
    }
  }
})();

//card carousels
(function () {
  if (!D.querySelector(".swiper-card-imgs")) return;

  if (D.querySelectorAll(".card-imgs-link").length <= 1) {
    $(".swiper-card-imgs .card-imgs-arrow").remove();
    return false;
  }

  const imgsClone = $(".swiper-card-imgs")
    .clone()
    .addClass("swiper-mobile-imgs")
    .removeClass("swiper-card-imgs");
  imgsClone
    .find(".card-imgs-prev")
    .addClass("mobile-imgs-prev")
    .removeClass("card-imgs-prev");
  imgsClone
    .find(".card-imgs-next")
    .addClass("mobile-imgs-next")
    .removeClass("card-imgs-next");
  imgsClone
    .find(".card-imgs-link")
    .addClass("mobile-imgs-link")
    .removeClass("card-imgs-link mfp-link")
    .removeAttr("data-href");
  imgsClone.find(".mobile-imgs-link").eq(0).addClass("active");

  $(".card-imgs").append(imgsClone);
  $(".swiper-mobile-imgs").wrap('<div class="mobile-imgs"></div>');

  const cardMini = new Swiper(".swiper-mobile-imgs", {
    slidesPerView: 3,
    // shortSwipes: false,
    spaceBetween: 10,
    navigation: {
      nextEl: ".mobile-imgs-next",
      prevEl: ".mobile-imgs-prev",
    },
    breakpoints: {
      841: {
        slidesPerView: 4,
      },
    },
  });

  const cardSwiper = new Swiper(".swiper-card-imgs", {
    slidesPerView: 1,
    // shortSwipes: false,
    autoHeight: true,
    navigation: {
      nextEl: ".card-imgs-next",
      prevEl: ".card-imgs-prev",
    },
    pagination: {
      el: ".card-imgs-pagination",
      type: "bullets",
      clickable: true,
    },
    breakpoints: {
      769: {
        pagination: false,
      },
    },
  });

  $(document).on("click", ".mobile-imgs-link", function (e) {
    e.preventDefault();

    const index = $(this).closest(".swiper-slide").index();
    cardSwiper.slideTo(index);
    $(".mobile-imgs-link").removeClass("active");
    $(this).addClass("active");
  });

  cardSwiper.on("slideChange", function (swiper) {
    const index = swiper.realIndex;
    cardMini.slideTo(index);
    $(".mobile-imgs-link").removeClass("active");
    $(".swiper-mobile-imgs .swiper-slide")
      .eq(index)
      .find(".mobile-imgs-link")
      .addClass("active");
  });
})();

const changeCatalogStyle = (style) => {
  localStorage.setItem("catalogStyle", style);
  document.querySelector("#catalog").dataset.style = style;
  document.querySelectorAll(".catalog-style-toggler").forEach((el) => {
    el.classList.remove("active");
    if (el.dataset.style && el.dataset.style === style) {
      el.classList.add("active");
    }
  });
};

(function () {
  if (!document.querySelector(".catalog-style-toggler")) return;

  document.querySelectorAll(".catalog-style-toggler").forEach((el) => {
    el.addEventListener("click", function (e) {
      e = e || window.event;
      e.preventDefault();

      const style = this.dataset.style || "grid";
      changeCatalogStyle(style);
    });
  });

  if (localStorage.getItem("catalogStyle")) {
    changeCatalogStyle(localStorage.getItem("catalogStyle"));
  }
})();

(function () {
  if (!$("#catalog_search").length) return;

  let catalogProductsSearch = $("#catalog_search");
  let catalogProductsReniev = $(".catalog-products-reniev");
  let cardReview = $("#card_review");

  if(cardReview.length) {
    let cardReviewTop = $("#card_review").offset().top;
    let catalogSerachOffset = catalogProductsSearch.offset().top;

    window.addEventListener("scroll", function () {
      if (window.scrollY > catalogSerachOffset && window.scrollY < cardReviewTop) {
        catalogProductsReniev.addClass("catalog-search-open");
      } else {
        catalogProductsReniev.removeClass("catalog-search-open");
      }
    });
  }
})();

// counter
$(document).on("click", ".btn-plus", function () {
  let input = $(this).prev("input"),
    minus = input.prev(".btn-minus"),
    val = parseInt(input.val(), 10);

  if (isNaN(val)) {
    return input.val(1);
  }

  input.val(++val);
  if (val > 1) {
    minus.removeClass("disabled");
  }
});
$(document).on("click", ".btn-minus", function (e) {
  e.preventDefault();
  let thisInput = $(this).next("input"),
    val = parseInt(thisInput.val(), 10);

  if (isNaN(val)) {
    $(this).addClass("disabled");
    return thisInput.val(1);
  }

  if (val <= 2) {
    $(this).addClass("disabled");
    return thisInput.val(1);
  }

  thisInput.val(--val);
});

$(document).on("change", ".card-counter-input", function (e) {
  let val = parseInt($(this).val(), 10),
    minus = $(this).prev(".btn-minus");
  if (val < 0) {
    $(this).val(0);
  }
  if (val !== 1) {
    minus.removeClass("disabled");
  } else {
    minus.addClass("disabled");
  }
});

const productSliderMarkUpdear = $(".slider-dear")
  .clone()
  .removeClass("slider-adaptive-none");
$(".product-swiper-mob-dear").append(productSliderMarkUpdear);

$(".product-swiper-desc-dear").append(productSliderMarkUpdear);

new Swiper(".product-swiper-desc-dear .product-swiper ", {
  slidesPerView: 4,
  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  // spaceBetween: 24,
  breakpoints: {
    1024: {
      slidesPerView: 4,
      spaceBetween: 24,
    },
  },
});

(function () {
  let arrows = document.querySelectorAll(
    ".main-contacts-tel-arrow, .mob-menu-phone"
  );
  let numbers = document.querySelector(".main-contacts-drop");
  if (!arrows.length || !numbers) return;

  arrows.forEach((el) => {
    el.addEventListener("click", function (e) {
      e = e || window.event;
      e.preventDefault();
      this.classList.toggle("opened");
      numbers.classList.toggle("numbers-open");
    });
  });

  document.addEventListener("click", (e) => {
    const withinBoundaries = e.composedPath().includes(numbers);
    const isArrow = e
      .composedPath()
      .includes(document.querySelector(".main-contacts-tel-arrow"));
    const isMob = e
      .composedPath()
      .includes(document.querySelector(".mob-menu-phone"));

    if (!withinBoundaries && !isArrow && !isMob) {
      numbers.classList.remove("numbers-open");
      document
        .querySelector(".main-contacts-tel-arrow")
        .classList.remove("opened");
      document.querySelector(".mob-menu-phone").classList.remove("opened");
    }
  });
})();

// Footer change media
if (matchMedia) {
  var screen1170 = window.matchMedia("(max-width:1170px)");
  screen1170.addListener(changes);
  changes(screen1170);

  var screen768 = window.matchMedia("(max-width:768px)");
  screen768.addListener(changes768);
  changes768(screen768);

  var screen450 = window.matchMedia("(max-width:450px)");
  screen450.addListener(changes450);
  changes450(screen450);
}

function changes(screen1170) {
  if (screen1170.matches) {
    $(".footer-bottom-links").appendTo($(".footer-top-contact"));
    $(".footer-top-wrapper").appendTo($(".footer-top-info"));
    $(".footer-top-services").appendTo($(".footer-top-about"));
    $(".footer-top-resource").appendTo($(".footer-bootom-media-links"));
    $(".footer-bottom-info").appendTo($(".footer-bootom-media-links"));
    $(".footer-bottom-reit").appendTo($(".footer-bottom-socials-wrapper"));
  } else {
    $(".footer-bottom-links").appendTo($(".footer-bootom-media-links"));
    $(".footer-top-services").appendTo($(".footer-top-services-wrapper"));
    $(".footer-top-wrapper").appendTo($(".footer-top-about"));
    $(".footer-top-resource").appendTo($(".footer-top-resource-container"));
    $(".footer-bottom-info").appendTo($(".footer-bottom-info-wrapper"));
    $(".footer-bottom-reit").appendTo($(".footer-bottom-reit-wrapper"));
  }
}
function changes450(screen450) {
  if (screen450.matches) {
    $(".catalog_link").appendTo($(".catalog-articles"));
    $(".video_link").appendTo($(".catalog-video"));
    $(".feedback_link").appendTo($(".catalog-brands"));
  } else {
    $(".catalog_link").appendTo($(".catalog-articles-title"));
    $(".video_link").appendTo($(".video_wrap"));
    $(".feedback_link").appendTo($(".feedback-brands-header"));
  }
}
function changes768(screen768) {
  if (screen768.matches) {
    $(".footer-bottom-socials-wrapper").appendTo($(".footer-top-about"));
    $(".footer-bottom-info").appendTo($(".footer-top-media-wrapper"));
  } else {
    $(".footer-bottom-socials-wrapper").appendTo($(".footer-bottom-socials"));
  }
}

// Footer toggler
let menu = document.querySelectorAll(".footer-top-title");
menu.forEach((element) => {
  element.addEventListener("click", () => {
    element.classList.toggle("footer-open");
  });
});

// Imask for calculator-input
let calculatorMask = document.querySelectorAll(".calculator-mask");
calculatorMask.forEach((element) => {
  IMask(element, {
    mask: /^[1-9]\d{0,9}$/,
  });
});
// for input catalog-products
let inputMask = document.querySelectorAll(".input-mask");
inputMask.forEach((element) => {
  IMask(element, {
    mask: /^[0-9]\d{0,6}$/,
  });
});
//  for catalog telephone
var catalogPhone = document.getElementById("catalog_phone");
var maskOptions = {
  placeholder: "+{000}(00)000-00-00",
  mask: "+{000}(00)000-00-00",
};
if (catalogPhone) {
  var mask = IMask(catalogPhone, maskOptions);
}

// Input range

// checkbox hide on click

if (document.querySelector(".catalog-products-field-btn")) {
  let checkboxBtn = document.querySelectorAll(".catalog-products-field-btn"),
    catalogbtnText = document.querySelectorAll(".catalog-products-field-text"),
    catalogbtnImg = document.querySelector(".catalog-products-field-img img"),
    checkboxHiden = document.querySelectorAll(".checkbox-hide");

  checkboxBtn.forEach((element) => {
    element.addEventListener("click", openFunc);
    function openFunc() {
      let classListAdd = element.classList;
      element.classList.toggle("checkboxBtn_active");
      if (classListAdd.value.split(" ").indexOf("checkboxBtn_active") < 0) {
        element.children[1].innerHTML = "Показать ещё";
        element.children[0].style.backgroundImage =
          "url(././images/icons/green-cross.svg)";
      } else {
        element.children[1].innerHTML = "Скрыть";
        element.children[0].style.backgroundImage =
          "url(././images/icons/red-cross.svg)";
      }
      const parent = element.closest(".catalog-products-field-container");
      let checkboxes = parent.querySelectorAll(".checkbox-hide");
      checkboxes.forEach((el) => {
        el.classList.toggle("checkbox-on");
      });
    }
  });
}

// ion range input
$(".slider-wrapper").each(function () {
  var $range = $(".js-range-slider", this),
    $inputFrom = $(".js-input-from", this),
    $inputTo = $(".js-input-to", this),
    instance,
    min = +$inputFrom[0].dataset.min,
    max = +$inputTo[0].dataset.max,
    from = +$inputFrom[0].value,
    to = +$inputTo[0].value,
    steps = +$range[0].dataset.steps;


  $range.ionRangeSlider({
    skin: "round",
    type: "double",
    min: min,
    max: max,
    from: from,
    to: to,
    step: steps,
    onStart: updateInputs,
    onChange: updateInputs
  });

  instance = $range.data("ionRangeSlider");

  function updateInputs(data) {
    from = data.from;
    to = data.to;

    $inputFrom.prop("value", from);
    $inputTo.prop("value", to);
  }

  $inputFrom.on("input", function () {
    var val = +$(this).prop("value");

    // validate
    if (val < min) {
      val = min;
    } else if (val > to) {
      val = to;
    }

    instance.update({
      from: val,
    });
  });

  $inputTo.on("input", function () {
    var val = +$(this).prop("value");
    console.log(val)
    // validate
    if (val < from) {
      val = from;
    } else if (val > max) {
      val = max;
    }
    console.log(val)
    console.log(from)
    console.log(max)

    instance.update({
      to: val,
    });
  });
});

$(document).on("click", ".catalog-question-item-title", function (e) {
  $(this)
    .closest(".catalog-question-item")
    .toggleClass("catalog-question-toggle");
});

if (document.getElementById("card-breackpoint")) {
  // $(document).ready(function () {
  let cardBreackpoint = $("#card-breackpoint").offset().top;
  // let footerBreackpoint = $("#footer").offset().top;
  let cardSticky = $(".card-sticky");
  let headerCard = $(".header");
  // let footerHeight = $('#footer').innerHeight();

  window.addEventListener("resize", function () {
    cardBreackpoint = $("#card-breackpoint").offset().top;
  });
  window.addEventListener("scroll", function () {
    if (window.scrollY < cardBreackpoint) {
      headerCard.removeClass("headerCard_fixed");
      cardSticky.removeClass("card-breackpoint-open");
    } else {
      headerCard.addClass("headerCard_fixed");
      cardSticky.addClass("card-breackpoint-open");
    }
  });
  // });
}

if (document.querySelector(".making-form")) {
  const stickyBlock = document.querySelector(".cart-order");
  const card = document.querySelector("#card-breackpoint");

  if(card) {
    function flipOrSticky() {
      const box = card.getBoundingClientRect();
      const stickyBox = stickyBlock.getBoundingClientRect();
      const boxTop = box.top;
      const boxBottom = box.bottom;
      const stickyBottom = stickyBox.height;
      const py = window.pageYOffset;

      if (py > boxTop + py) {
        if (py < boxBottom + py - stickyBottom - 100) {
          stickyBlock.classList.add("sticky-box");
          stickyBlock.classList.remove("card-breackpoint-flipbottom");
        } else {
          stickyBlock.classList.remove("sticky-box");
          stickyBlock.classList.add("card-breackpoint-flipbottom");
        }
      } else {
        stickyBlock.classList.remove("sticky-box", "card-breackpoint-flipbottom");
      }
    }

    window.addEventListener("scroll", flipOrSticky);
    window.addEventListener("load", flipOrSticky);
  }
}


(function () {
  if (!document.querySelector(".ui-rightbar")) return
  const stickyBlock = document.querySelector(".ui-rightbar");
  const card = document.querySelector("#card-breackpoint");

  if(card) {
    function flipOrSticky() {
      const box = card.getBoundingClientRect();
      const stickyBox = stickyBlock.getBoundingClientRect();
      const boxTop = box.top;
      const boxBottom = box.bottom;
      const stickyBottom = stickyBox.height;
      const py = window.pageYOffset;

      if (py > boxTop + py - 100) {
        if (py < boxBottom + py - stickyBottom - 100) {
          stickyBlock.classList.add("ui-rightbar-sticky");
          stickyBlock.classList.remove("ui-rightbar-flipbottom");
        } else {
          stickyBlock.classList.remove("ui-rightbar-sticky");
          stickyBlock.classList.add("ui-rightbar-flipbottom");
        }
      } else {
        stickyBlock.classList.remove(
          "ui-rightbar-sticky",
          "ui-rightbar-flipbottom"
        );
      }
    }

    window.addEventListener("scroll", flipOrSticky);
    window.addEventListener("load", flipOrSticky);
  }
})();


(function () {
  if (!D.querySelector(".catalog-marks")) return;

  const wrapBtn = D.querySelector(".catalog-marks-toggler");
  const wrapSettings = D.querySelector(".catalog-marks-list");

  function resSetting() {
    const wrapSettingContainer = document.querySelector(
      ".catalog-marks-height"
    ).clientHeight;

    if (wrapSettingContainer <= 80) {
      wrapSettings.classList.add("opened");
      wrapBtn.classList.add("ui-hidden");
    } else {
      wrapSettings.classList.remove("opened");
      wrapBtn.classList.remove("ui-hidden");
    }
  }
  resSetting();
  window.addEventListener("resize", resSetting);
})();

(function () {
  if (!D.querySelector(".ux-collapsible-toggler")) return;

  D.querySelectorAll(".ux-collapsible-toggler").forEach((el) => {
    el.addEventListener("click", function (e) {
      e = e || window.event;
      e.preventDefault();
      e.stopPropagation();

      const openTxt = this.dataset.open || "Показать все";
      const closeTxt = this.dataset.close || "Скрыть";
      const icon = this.querySelector(".ui-btn-icon");
      const txt = this.querySelector(".ui-btn-txt");
      const content = this.closest(".ux-collapsible").querySelector(
        ".ux-collapsible-content"
      );

      if (this.classList.contains("opened")) {
        txt.textContent = openTxt;
        icon.classList.remove("ui-btn-icon-cancel");
        icon.classList.add("ui-btn-icon-plus");
        content.classList.remove("opened");
      } else {
        txt.textContent = closeTxt;
        icon.classList.add("ui-btn-icon-cancel");
        icon.classList.remove("ui-btn-icon-plus");
        content.classList.add("opened");
      }

      this.classList.toggle("opened");
    });
  });
})();

(function () {
  if (!D.querySelector(".ui-spoiler")) return;

  D.querySelectorAll(".ui-spoiler-toggler").forEach((el) => {
    el.addEventListener("click", function (e) {
      e = e || window.event;
      e.preventDefault();
      e.stopPropagation();

      const openTxt = this.dataset.open || "Показать все";
      const closeTxt = this.dataset.close || "Скрыть";
      const icon = this.querySelector(".ui-btn-icon");
      const txt = this.querySelector(".ui-btn-txt");
      const content =
        this.closest(".ui-spoiler").querySelector(".ui-spoiler-body");

      if (this.classList.contains("opened")) {
        txt.textContent = openTxt;
        icon.classList.remove("ui-btn-icon-cancel");
        icon.classList.add("ui-btn-icon-plus");
        content.classList.remove("opened");
      } else {
        txt.textContent = closeTxt;
        icon.classList.add("ui-btn-icon-cancel");
        icon.classList.remove("ui-btn-icon-plus");
        content.classList.add("opened");
      }

      this.classList.toggle("opened");
    });
  });
})();

(function () {
  if (!document.querySelector(".catalog-reviews-desktop")) return;
  let slider = null,
    native = null;
  let servicesSwiper = document.querySelector(".services-swiper");
  let producentpgSwiper = document.querySelector(".producentpg-swiper");

  //desktop
  if (matchMedia) {
    var bp = window.matchMedia("(min-width:1024.02px)");
    bp.addListener(changes);
    changes(bp);
  }
  function changes(bp) {
    if (bp.matches && !slider && producentpgSwiper) {
      slider = new Swiper(".producentpg-swiper", {
        slidesPerView: 2,
        spaceBetween: 24,
        direction: "vertical",
        // autoHeight: true,
        // shortSwipes: false,
        navigation: {
          nextEl: ".producentpg-reviews-next",
          prevEl: ".producentpg-reviews-prev",
        },
      });
    }
    if (bp.matches && !slider && servicesSwiper) {
      slider = new Swiper(".services-swiper", {
        slidesPerView: 1,
        spaceBetween: 24,
        // shortSwipes: false,
        navigation: {
          nextEl: ".catalog-reviews-next",
          prevEl: ".catalog-reviews-prev",
        },
      });
    }
    if (bp.matches && !slider) {
      slider = new Swiper(".catalog-reviews", {
        slidesPerView: 2,
        spaceBetween: 24,
        // shortSwipes: false,
        navigation: {
          nextEl: ".catalog-reviews-next",
          prevEl: ".catalog-reviews-prev",
        },
      });
    }
    if (!bp.matches && !native && producentpgSwiper) {
      //mobile
      const clone = $(".catalog-reviews-desktop .producentpg-swiper").clone();
      $(".catalog-reviews-mobile .ui-scroller").prepend(clone);
      native = true;
    }
    if (!bp.matches && !native && servicesSwiper) {
      //mobile
      const clone = $(".catalog-reviews-desktop .services-card").clone();
      $(".catalog-reviews-mobile .ui-scroller").prepend(clone);
      native = true;
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
        // shortSwipes: false,
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
        // shortSwipes: false,
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
  if (!document.querySelector(".card-related-desktop")) return;
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
      slider = new Swiper(".swiper-card-related", {
        slidesPerView: 3,
        spaceBetween: 24,
        // shortSwipes: false,
        navigation: {
          nextEl: ".card-related-next",
          prevEl: ".card-related-prev",
        },
        breakpoints: {
          1140: {
            slidesPerView: 4,
          },
        },
      });
    }

    if (!bp.matches && !native) {
      const clone = $(".card-related-desktop .slider-product").clone();
      $(".card-related-mobile .ui-scroller").prepend(clone);
      native = true;
    }
  }
})();

(function () {
  if (!document.querySelector(".card-reviews-desktop")) return;
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
      slider = new Swiper(".swiper-card-reviews", {
        slidesPerView: 2,
        spaceBetween: 24,
        // shortSwipes: false,
        navigation: {
          nextEl: ".card-reviews-next",
          prevEl: ".card-reviews-prev",
        },
        breakpoints: {
          1140: {
            slidesPerView: 3,
          },
        },
      });
    }

    if (!bp.matches && !native) {
      const clone = $(".card-reviews-desktop .review-card").clone();
      $(".card-reviews-mobile .ui-scroller").prepend(clone);
      native = true;
    }
  }
})();

(function () {
  if (!document.querySelector(".card-interest-desktop")) return;
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
      slider = new Swiper(".swiper-card-interest", {
        slidesPerView: 3,
        spaceBetween: 24,
        // shortSwipes: false,
        navigation: {
          nextEl: ".card-interest-next",
          prevEl: ".card-interest-prev",
        },
        breakpoints: {
          1140: {
            slidesPerView: 4,
          },
        },
      });
    }
    if (!bp.matches && !native) {
      //mobile
      const clone = $(".card-interest-desktop .slider-product").clone();
      $(".card-interest-mobile .ui-scroller").prepend(clone);
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
        // @todo добавить везде, где инициализация
        callbacks: {
          open: function () {
            document.documentElement.style.overflow = "hidden";
          },
          close: function () {
            document.documentElement.style.overflow = "";
          },
        },
      });
    });
  });
})();

(function () {
  if (!document.querySelector(".slider-produc-topline")) return;

  document.querySelectorAll(".slider-produc-topline").forEach((el) => {
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
        // @todo добавить везде, где инициализация
        callbacks: {
          open: function () {
            document.documentElement.style.overflow = "hidden";
          },
          close: function () {
            document.documentElement.style.overflow = "";
          },
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

    //81 = btn height + position offset from bottom
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
      document.documentElement.classList.remove("no-overflow");
      document.querySelector(".catalog-filters").classList.remove("opened");
    });
})();

(function () {
  if (!document.querySelector(".catalog-filters-bg")) return;

  document
    .querySelector(".catalog-filters-bg")
    .addEventListener("click", () => {
      document.documentElement.classList.remove("no-overflow");
      document.querySelector(".catalog-filters").classList.remove("opened");
    });
})();

(function () {
  if (!document.querySelector(".catalog-settings-filters")) return;

  document
    .querySelector(".catalog-settings-filters")
    .addEventListener("click", () => {
      document.documentElement.classList.add("no-overflow");
      document.querySelector(".catalog-filters").classList.add("opened");
    });
})();

$(".main-list-li").click(function () {
  if ($(this).hasClass("list-open")) {
    $(this).removeClass("list-open");
  } else {
    $(this).addClass("list-open");
  }
});

let arrStars = document.querySelectorAll(".ui-rating-star");
let arrBlock = document.querySelectorAll(".ui-rating");

arrBlock.forEach((e) => {
  if (arrStars.length !== 0) {
    let arrLength = e.children[0].children.length;
    let elValue = e.children[1].textContent;
    let numValue = Math.round(elValue);
    let countRating = arrLength - (arrLength - numValue);

    for (let i = 0; i < countRating; i++) {
      e.children[0].children[i].classList.add("active");
    }
  }
});

$(function () {
  let header = $(".header"),
    headerMenu = $(".header .menu"),
    headerNav = $(".header .nav-wrapper"),
    wrapperFixed = $(".wrapper"),
    footerBreackpoint = $("#footer"),
    footerHeight = $("#footer").innerHeight();
  const headerOffset = $("header .main").offset().top;
  const swipercontaer = document.querySelector(".swiper-carousel-compare");

  $(window).scroll(function () {
    let cardBreackpointOpen = $(".card-breackpoint-open");
    let headerCardFixedHeight = $(".header_fixed .main").innerHeight();
    const headerHeight = $("header .main").outerHeight(true);

    let offsetFooter = footerBreackpoint.offset().top;

    // if (matchMedia) {
    //   var screen678 = window.matchMedia("(max-width:678px)");
    //   screen678.addListener(changes);
    //   changes(screen678);
    // }
    if (matchMedia || $("#card-breackpoint").hasClass("card-sticky-bottom")) {
      var screen678 = window.matchMedia("(min-width:300px)");
      screen678.addListener(changes);
      changes(screen678);
    }

    function changes(screen678) {
      if (screen678.matches) {
        if (
          offsetFooter <
          document.documentElement.clientHeight + window.scrollY
        ) {
          D.querySelector("#middle").classList.remove("panel-is-float");
          if (swipercontaer) {
            cardBreackpointOpen.css({
              top: headerCardFixedHeight + "px",
              position: "fixed",
              bottom: "initial",
            });
          } else {
            cardBreackpointOpen.css({
              position: "relative",
            });
          }
        } else {
          D.querySelector("#middle").classList.add("panel-is-float");

          $(".main").removeClass("compare-remove-shadow");
          if (swipercontaer) {
            cardBreackpointOpen.css({
              top: headerCardFixedHeight + "px",
              position: "fixed",
              bottom: "initial",
            });
          } else {
            cardBreackpointOpen.css({
              top: "initial",
              position: "fixed",
              bottom: 0,
            });
          }
        }
      } else {
        cardBreackpointOpen.css("top", headerCardFixedHeight + "px");
        cardBreackpointOpen.css("bottom", "initial");
      }
    }

    if ($(this).scrollTop() > headerOffset) {
      wrapperFixed.css("paddingTop", headerHeight + "px");
      header.addClass("header_fixed");
      wrapperFixed.addClass("wrapper_fixed");
    } else {
      wrapperFixed.css("paddingTop", 0);
      header.removeClass("header_fixed");
      wrapperFixed.removeClass("wrapper_fixed");
    }
  });
});

//фиксируем блок с картинками при скроле на планшетах
function fixCardImgsTablet(card, imgs, section) {
  let dw = document.documentElement.clientWidth;
  if (dw > 1024 || dw < 768) return;

  const sc = window.pageYOffset;
  const offset = card.offsetTop;
  const rect = card.getBoundingClientRect();
  const vh = document.documentElement.clientHeight;
  const to = 165; //offset from top of screen
  const ih = imgs.clientHeight;
  const w = section.clientWidth;

  if (sc > offset - to && sc + vh - (vh - ih - to) < offset + rect.height) {
    imgs.classList.add("fixed");
    imgs.classList.remove("fixed-bottom");
    imgs.style.width = w + "px";
  } else if (sc + vh - (vh - ih - to) > offset + rect.height) {
    imgs.classList.add("fixed-bottom");
    imgs.classList.remove("fixed");
    imgs.style.width = w + "px";
  } else {
    imgs.classList.remove("fixed");
    imgs.classList.remove("fixed-bottom");
    imgs.style.width = "";
  }
}

(function () {
  const card = document.querySelector(".card");
  const imgs = document.querySelector(".card-imgs");
  const section = document.querySelector(".card-section");

  if (!card) return;
  document.addEventListener(
    "scroll",
    fixCardImgsTablet.bind(null, card, imgs, section)
  );
  window.addEventListener(
    "resize",
    fixCardImgsTablet.bind(null, card, imgs, section)
  );
})();

jQuery(document).ready(function ($) {
  $(".card-tabs-link").Tabs();

  $(document).on("click", ".tabs-target", function (e) {
    e.preventDefault();

    const id = $(this).attr("href");

    if ($(id).length) {
      $('.card-tabs-link[href="' + id + '"]').click();
      const offset = $(".card-tabs-body").offset().top;
      $("html,body").animate({ scrollTop: offset - 160 }, 1000);
    }
  });

  $(document).on("click", ".mfp-link", function () {
    var a = $(this);
    $.magnificPopup.open({
      items: { src: a.attr("data-href") },
      type: "ajax",
      overflowY: "scroll",
      removalDelay: 300,
      mainClass: "my-mfp-zoom-in",
      ajax: {
        tError: "Error. Not valid url",
      },
      callbacks: {
        open: function () {
          setTimeout(function () {
            $(".mfp-wrap").addClass("not_delay");
            $(".mfp-popup").addClass("not_delay");
          }, 700);
        },
      },

      callbacks: {
        open: function () {
          document.documentElement.style.overflow = "hidden";
        },

        close: function () {
          document.documentElement.style.overflow = "";
        },
      },
    });
    return false;
  });

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

  $(".card-tabs-link").Tabs();

  $(document).on("click", ".mfp-custom-close", function (e) {
    e.preventDefault();
    $.magnificPopup.close();
  });

  jQuery.validator.addMethod(
    "emailErrPerson",
    function (value, element) {
      if (/123@gmail.com/.test(value)) {
        return false;
      } else {
        return true;
      }
    },
    "Incorrect format"
  );

  let inputPhone = document.getElementById("telephone");

  if (inputPhone) {
    var phoneMask = IMask(document.getElementById("telephone"), {
      mask: "+{375} (00) 000 00 00",
    });
  }

  jQuery.validator.addMethod(
    "lettersonly",
    function (value, element) {
      return this.optional(element) || /^[a-zA-ZА-Яа-я\s,ё]+$/i.test(value);
    },
    "Incorrect format"
  );

  (function () {
    if (matchMedia) {
      const screen1024 = window.matchMedia("(max-width:1024px)");
      screen1024.addListener(changes);
      changes(screen1024);
    }

    function changes(screen) {
      let block = document.querySelectorAll(".cart-item-info");

      for (let i = 0; i < block.length; i++) {
        let header = block[i].querySelectorAll(".cart-item-headline")[0];
        let remove = block[i].querySelectorAll(".cart-item-remove")[0];
        let control = block[i].querySelectorAll(".cart-item-control")[0];

        if (screen.matches) {
          header.after(remove);
        } else {
          control.prepend(remove);
        }
      }
    }
  })();

  let deleteSelected = document.querySelector(".cart-delete-btn");
  let deleteCheckBoxAll = document.querySelector(
    ".cart-delete input[name=customCheckbox]"
  );
  let itemList = document.querySelector(".cart-list");

  if (itemList) {
    itemList.addEventListener("click", (e) => {
      if (e.target.classList[0] === "cart-item-remove") {
        e.target.closest(".cart-item").remove();
      }
    });
  }

  if (deleteCheckBoxAll) {
    deleteCheckBoxAll.addEventListener("click", (e) => {
      let checkedInput = document.querySelectorAll(
        ".cart-list input[name=customCheckbox]"
      );

      for (let i = 0; i < checkedInput.length; i++) {
        if (deleteCheckBoxAll.checked === true) {
          checkedInput[i].checked = true;
        } else {
          checkedInput[i].checked = false;
        }
      }
    });
  }

  if (deleteSelected) {
    deleteSelected.addEventListener("click", (e) => {
      let checkedInput = document.querySelectorAll(
        ".cart-list input[name=customCheckbox]:checked"
      );

      for (let i = 0; i < checkedInput.length; i++) {
        checkedInput[i].closest(".cart-item").remove();
      }
    });
  }

  // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
  let vh = window.innerHeight * 0.01;
  // Then we set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  // We listen to the resize event
  window.addEventListener("resize", () => {
    // We execute the same script as before
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  });

  // Выстраивание в колонки картичек на странице "Ремонт компрессоров"
  (function() {
    let elem = document.querySelector('.services-list');
    let iso;

    if (!elem) return   

    function setGutter() {
      let gutter = 24;
      if (window.innerWidth < 1366) {
        gutter = 16;
      }      

      // Проверяем разрешение экрана
      if (window.innerWidth >= 679) {
        // Инициализируем Isotope, если он еще не инициализирован
        if (!iso) {
          iso = new Isotope(elem, {
            itemSelector: '.services-list-item',
            layoutMode: 'masonry',
            masonry: {
              columnWidth: '.services-list-item',
              gutter: gutter
            }
          });
        }
      } else {
        // Отключаем Isotope, если он инициализирован
        if (iso) {
          iso.destroy();
          iso = null;
        }
      }
    }

    setGutter();
    $(window).resize(setGutter);

  })();

    // Выстраивание в колонки картичек на странице "Вакансии"
    (function() {
      let elem = document.querySelector('.proud-list');
      let iso;
  
      if (!elem) return   
  
      function setGutter() {
        let gutter = 24;
        if (window.innerWidth < 1366) {
          gutter = 16;
        }      
  
        // Проверяем разрешение экрана
        if (window.innerWidth > 1024) {
          // Инициализируем Isotope, если он еще не инициализирован
          if (!iso) {
            iso = new Isotope(elem, {
              itemSelector: '.proud-list-item',
              layoutMode: 'masonry',
              masonry: {
                columnWidth: '.proud-list-item',
                gutter: gutter
              }
            });
          }
        } else {
          // Отключаем Isotope, если он инициализирован
          if (iso) {
            iso.destroy();
            iso = null;
          }
        }
      }
  
      setGutter();
      $(window).resize(setGutter);
  
    })();
  
}); //ready

new Swiper(".main-slider-swiper", {
  slidesPerView: 1,

  // shortSwipes: false,
  navigation: {
    nextEl: ".main-slider-next",
    prevEl: ".main-slider-prev",
  },
  pagination: {
    el: ".main-slider-pagintaion",
    clickable: true,
  },
});

// new Swiper(".work-slider-swiper", {
//   slidesPerView: 1.01,
//   spaceBetween: 24,

//   // shortSwipes: false,
//   navigation: {
//     nextEl: ".work-slider-swiper .ui-arrow-next",
//     prevEl: ".work-slider-swiper .ui-arrow-prev",
//   },

//   breakpoints: {
//     1024: {
//       slidesPerView: 1,
//     },
//   },
// });

document.addEventListener('DOMContentLoaded', function() {
  const parentSwiper = new Swiper(".work-slider-swiper", {
    slidesPerView: 1,
    spaceBetween: 24,

    navigation: {
      nextEl: ".work-reviews-next",
      prevEl: ".work-reviews-prev",
    },

    breakpoints: {
      599: {
        slidesPerView: 1.05,
        spaceBetween: 24,
      },
      769: {
        slidesPerView: 1.01,
        spaceBetween: 24,
      },
      1024: {
        slidesPerView: 1,
        spaceBetween: 24,
      },
    },
    on: {
      init: function () {   
        if (window.innerWidth < 599) {
          this.destroy(true, true);
        }
        initInnerSliders();
      },
      resize: function () {
        if (window.innerWidth < 599 && !this.destroyed) {
          this.destroy(true, true);
        } else if (window.innerWidth >= 599 && this.destroyed) {
          this.init();
        }
        initInnerSliders(); // Повторная инициализация при resize
      },
      slideChangeTransitionStart: function() {
        // Только для разрешений >= 599px
        if (window.innerWidth >= 599) {
          // Останавливаем автоплей для всех внутренних слайдеров
          document.querySelectorAll('.work-image-slider-swiper').forEach(slider => {
            if (slider.swiper) {
              slider.swiper.autoplay.stop();
              // Возвращаем к первому слайду слайдеры неактивных слайдов
              slider.swiper.slideTo(0);
            }
          });

          // Находим активный слайд и запускаем его автоплей
          const activeSlide = this.slides[this.activeIndex];
          const activeInnerSlider = activeSlide.querySelector('.work-image-slider-swiper');
          
          if (activeInnerSlider && activeInnerSlider.swiper) {
            activeInnerSlider.swiper.slideTo(0); // Возвращаем к первому слайду
            activeInnerSlider.swiper.autoplay.start(); // Запускаем автоплей
          }
        }
      }
    },
  });

  function initInnerSliders() {
    document.querySelectorAll('.work-image-slider').forEach(slider => {
      // Уничтожаем существующий слайдер, если он есть
      if (slider.querySelector('.work-image-slider-swiper').swiper) {
        slider.querySelector('.work-image-slider-swiper').swiper.destroy();
      }

      let swiperSlider = slider.querySelector('.work-image-slider-swiper');
      let pagination = slider.querySelector('.main-slider-pagintaion');

      new Swiper(swiperSlider, {
        slidesPerView: 1,
        autoplay: window.innerWidth < 599 
          ? { 
              delay: 3000, 
              disableOnInteraction: false 
            } 
          : {
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            },
        pagination: {
          el: pagination,
          clickable: true,
        },
      });
    });
  }
});


// document.querySelectorAll('.work-image-slider').forEach(slider => {
//   let swiperSlider = slider.querySelector('.work-image-slider-swiper');
//   let pagination = slider.querySelector('.main-slider-pagintaion');

//   new Swiper(swiperSlider, {
//     slidesPerView: 1,
//     autoplay: true,  
//     pagination: {
//       el: pagination,
//       clickable: true,
//     },
//   });
// });

// new Swiper(".main-trust-slider", {
//   slidesPerView: 1,
//   spaceBetween: 24,
//   loop: true,

//   breakpoints: {
//     421: {
//       slidesPerView: "auto",
//     },
//     1024: {
//       slidesPerView: 3,
//     },
//     1140: {
//       slidesPerView: 4,
//     },
//   },

//   pagination: {
//     el: ".main-trust-pagintaion",
//     clickable: true,
//     dynamicBullets: true,
//     // dynamicMainBullets:3,
//   },

//   navigation: {
//     nextEl: ".main-trust-next",
//     prevEl: ".main-trust-prev",
//   },
// });

(function () {
  if (!document.querySelector(".main-recommend-desktop")) return;
  let slider = null,
    native = null;

  if (matchMedia) {
    var bp = window.matchMedia("(min-width:1024.02px)");
    bp.addListener(changes);
    changes(bp);
  }
  function changes(bp) {
    if (bp.matches && !slider) {
      slider = new Swiper(".main-recommend-swiper", {
        slidesPerView: 3,
        spaceBetween: 24,

        navigation: {
          nextEl: ".main-recommend-next",
          prevEl: ".main-recommend-prev",
        },
        breakpoints: {
          1140: {
            slidesPerView: 4,
          },
        },
      });
    }

    if (!bp.matches && !native) {
      const clone = $(".main-recommend-desktop .slider-product").clone();
      $(".main-recommend-mobile .ui-scroller").prepend(clone);
      native = true;
    }
  }
})();

// (function () {
//   if (!document.querySelector(".main-compressors-desktop")) return;
//   let slider = null,
//     native = null;

//   //desktop
//   if (matchMedia) {
//     var bp = window.matchMedia("(min-width:1024.02px)");
//     bp.addListener(changes);
//     changes(bp);
//   }
//   function changes(bp) {
//     if (bp.matches && !slider) {
//       slider = new Swiper(".main-compressors-swiper", {
//         slidesPerView: 3,
//         spaceBetween: 24,
//         // shortSwipes: false,
//         navigation: {
//           nextEl: ".main-compressors-next",
//           prevEl: ".main-compressors-prev",
//         },
//         breakpoints: {
//           1140: {
//             slidesPerView: 4,
//           },
//         },
//       });
//     }

//     if (!bp.matches && !native) {
//       const clone = $(".main-compressors-desktop .slider-product").clone();
//       $(".main-compressors-mobile .ui-scroller").prepend(clone);
//       native = true;
//     }
//   }
// })();

// (function () {
//   if (!document.querySelector(".main-dryers-desktop")) return;
//   let slider = null,
//     native = null;

//   //desktop
//   if (matchMedia) {
//     var bp = window.matchMedia("(min-width:1024.02px)");
//     bp.addListener(changes);
//     changes(bp);
//   }
//   function changes(bp) {
//     if (bp.matches && !slider) {
//       slider = new Swiper(".main-dryers-swiper", {
//         slidesPerView: 3,
//         spaceBetween: 24,
//         // shortSwipes: false,
//         navigation: {
//           nextEl: ".main-dryers-next",
//           prevEl: ".main-dryers-prev",
//         },
//         breakpoints: {
//           1140: {
//             slidesPerView: 4,
//           },
//         },
//       });
//     }

//     if (!bp.matches && !native) {
//       const clone = $(".main-dryers-desktop .slider-product").clone();
//       $(".main-dryers-mobile .ui-scroller").prepend(clone);
//       native = true;
//     }
//   }
// })();

(function () {
  if (!document.querySelector(".main-article-desktop")) return;
  let sliderArticle = "no";

  //mobile
  const clone = $(".main-article-desktop .main-article-item").clone();
  $(".main-article-mobile .ui-scroller").prepend(clone);

  //desktop
  if (matchMedia) {
    var bp = window.matchMedia("(min-width:1024.02px)");
    bp.addListener(changes);
    changes(bp);
  }
  function changes(bp) {
    if (bp.matches && sliderArticle === "no") {
      sliderArticle = new Swiper(".main-article-slider", {
        slidesPerView: 2,
        spaceBetween: 24,
        autoHeight: true,
        // shortSwipes: false,
        navigation: {
          nextEl: ".article-button-next",
          prevEl: ".article-button-prev",
        },
      });
    }
  }
})();

$(".waitList-item-remove-link").click(function () {
  $(this).closest($("div.waitList-item")).remove();
});

$(".profile-setup-delete").click(function () {
  $(this).closest($("div.profile-setup-wrapper")).remove();
});

$(document).ready(function () {
  $(".check-comment").click(function () {
    $(this).hasClass("has-comment")
      ? $(this).removeClass("has-comment")
      : $(this).addClass("has-comment");
  });
});

let el = document.querySelector(".favorites-grid");

if (el) {
  (function () {
    if (matchMedia) {
      const screen = window.matchMedia("(max-width:1024px)");
      screen.addListener(changes);
      changes(screen);
    }
    function changes(screen) {
      if (screen.matches) {
        //экран менее 1024
        el.dataset.style = "line";
      } else {
        //экран более 1024
        el.dataset.style = "grid";
      }
    }
  })();
}

let flag = false;

var scrollLoader = {
  //разметка прелоадера
  preloader:
    '<div class="ui-preloader"><div class="lds-ellipsis ui-preloader-spinner"><div></div><div></div><div></div><div></div></div><div class="ui-preloader-hint">Подождите, идет загрузка</div></div>',
  //высота экрана + апдейт при ресайзе
  screenHeight: document.documentElement.clientHeight,
  update() {
    this.screenHeight = document.documentElement.clientHeight;
  },
  //загружаем контент
  loader(selector) {
    const that = this;
    let scroll = $(window).scrollTop();

    $(selector).each(function (key, item) {
      const url = $(item).attr("data-href");

      if (
        $(item).attr("data-isloaded") === "true" ||
        url === undefined ||
        url === ""
      )
        return false;

      let offset = $(item).offset().top;
      if (scroll + that.screenHeight * 1.5 > offset) {
        $(item).attr("data-isloaded", "true");
        $(item).html(that.preloader);
        $.ajax({
          url: url,
          method: "GET",
          dataType: "html",
          contentType: "application/x-www-form-urlencoded",
          success: function (data) {
            $(item).attr("data-loaded", "true");
            $(item).html(data);
          },
          error: function () {
            $(item).attr("data-loaded", "true");
            $(item).html(
              '<div class="ui-error">Произошла непредвиденная ошибка. Обратитесь в поддержку сайта.</div>'
            );
          },
        });
      }
    });
  },
}; //scrollLoader

jQuery(window).on("resize", scrollLoader.update);
jQuery(document).ready(function () {
  jQuery(window).on("scroll", function () {
    scrollLoader.loader('.ajx-scroll-load[data-loaded="false"]');
  });
  scrollLoader.loader('.ajx-scroll-load[data-loaded="false"]');
});

new Swiper(".main-banners-slider", {
  slidesPerView: 1,
  spaceBetween: 24,
  // pagination:true,

  breakpoints: {
    421: {
      slidesPerView: "auto",
      // pagination:true,
    },
  },

  // shortSwipes: false,

  pagination: {
    el: ".main-banners-pagintaion",
    clickable: true,
  },
});

(function () {
  const target = D.querySelectorAll(".ux-gallery");
  if (!target.length) return;

  const getSelectors = (parent, link) => {
    parent.querySelectorAll(link).forEach((item) => {
      if (!item.closest(".swiper-slide-duplicate")) {
        item.classList.add("ux-not-duplicate");
      } else {
        item.classList.add("ux-gallery-link-duplicate");
        item.classList.remove("ux-gallery-link");
      }
    });
  };

  const shadowSelectors = (parent) => {
    const event = new Event("click");

    D.querySelectorAll(".ux-gallery-link-duplicate").forEach((item) => {
      item.addEventListener("click", (e) => {
        e = e || window.event;
        e.preventDefault();
        const src = item.querySelector("img").getAttribute("src");

        const notDuplicate = parent.querySelector(
          `img[src="${src}"]`
        ).parentElement;
        if (notDuplicate) {
          notDuplicate.dispatchEvent(event);
        }
      });
    });
  };

  FARBA.lazyLibraryLoad(
    "//cdnjs.cloudflare.com/ajax/libs/lightgallery-js/1.4.0/js/lightgallery.min.js",
    "//cdnjs.cloudflare.com/ajax/libs/lightgallery-js/1.4.0/css/lightgallery.min.css",
    () => {
      target.forEach((el) => {
        el.classList.add("lg-inited");

        el.addEventListener("onAfterOpen", function (event) {
          const q = D.querySelector("#lg-counter");
          if (q.childNodes[1] && q.childNodes[1].nodeType === 3) {
            D.querySelector("#lg-counter").childNodes[1].nodeValue = " из ";
          }

          setTimeout(() => {
            D.querySelector(".lg-outer").classList.add("lg-appear");
          }, 550);
        });

        let selector = "a.ux-gallery-link";
        if (el.classList.contains("swiper-rewards-wrp")) {
          getSelectors(el, "a.ux-gallery-link");
          shadowSelectors(el);
          selector = "a.ux-gallery-link.ux-not-duplicate";
        }

        lightGallery(el, {
          download: false,
          selector: selector,
          backdropDuration: 500,
          speed: 1000,
        });

        el.addEventListener("onSlideClick", function () {
          window.lgData[el.getAttribute("lg-uid")].goToNextSlide();
        });

        el.addEventListener("onBeforeClose", function () {
          D.querySelector(".lg-outer").classList.remove("lg-appear");
        });
      });
    }
  );
})();

let pageTitleCategory = document.querySelector(".page-title-category");
$(function () {
  var tab = $("#tabs .sign-popup-content > div");
  tab.hide().filter(":first").show();

  // Клики по вкладкам.
  $("#tabs .sign-popup-tabs a")
    .click(function (e) {
      if (pageTitleCategory) {
        let newCategory = e.target.innerHTML;
        pageTitleCategory.innerHTML = newCategory;
      }

      tab.hide();
      tab.filter(this.hash).show();
      $("#tabs .sign-popup-tabs a").removeClass("active");
      $(this).addClass("active");
      return false;
    })
    .filter(":first")
    .click();
});

// ymaps.ready(init);

// function init() {

// }

//! PART 3 JAVA SCRIPT CODE

//карта на странице delivery&pay




let uiSearchSettings = document.querySelector(".ui-search-settings");

if (uiSearchSettings) {
  $(".ui-search-settings").on("click", () => {
    $(".ui-search-settings-text-content").toggleClass(
      "opened"
    );
    $(".ui-search-settings-img").toggleClass("ui-search-settings-img-open");
  });
  $(".ressearch-settings-filters").on("click", () => {
    $(".ui-search-settings-text-content").toggleClass(
      "opened"
    );
    $(".ui-search-settings-img").toggleClass("ui-search-settings-img-open");
  });
}

// repaircmp.html

let repairTypeBtn = document.querySelector(".repair-type-btn"),
  repaircmpTypeWrapper = document.querySelector(".repaircmp-type-wrapper"),
  repaircmpTypeItem = document.querySelectorAll(".repaircmp-type-item");

if (repairTypeBtn) {
  if (repaircmpTypeItem.length > 6) {
    repairTypeBtn.addEventListener("click", () => {
      repairTypeBtn.style.display = "none";
      repaircmpTypeWrapper.classList.add("repaircmp-type-wrapper-open");
    });
  } else {
    repairTypeBtn.style.display = "none";
  }
}

//complite.html

let complite = document.querySelector(".complite");

if (complite) {
  const buildSwiperSlider = (sliderElm) => {
    const sliderIdentifier = sliderElm.dataset.id;
    return new Swiper(`#${sliderElm.id}`, {
      pagination: {
        el: `.swiper-pagination-${sliderIdentifier}`,
        clickable: true,
      },
    });
  };
  const allSliders = document.querySelectorAll(".swiper");
  allSliders.forEach((slider) => buildSwiperSlider(slider));
}

//producent-page rebuild
let cardReviewsMediaContainer = document.querySelector(
  ".card-reviews-media-container"
);
if (cardReviewsMediaContainer) {
  (function () {
    if (matchMedia) {
      const screen = window.matchMedia("(max-width:1024.99px)");
      screen.addListener(changes);
      changes(screen);
    }
    function changes(screen) {
      if (screen.matches) {
        $(".card-reviews").appendTo($(".card-reviews-media-container"));
      } else {
        $(".card-reviews").appendTo($(".catalog-filters"));
      }
    }
  })();
}

//header mobile

(function () {
  if (matchMedia) {
    const screen = window.matchMedia("(max-width:1024.99px)");
    screen.addListener(changes);
    changes(screen);
  }
  function changes(screen) {
    if (screen.matches) {
      $(".mobile-card").appendTo($(".mob-menu"));
      $(".main-catalog").appendTo($(".mob-menu"));
    } else {
      $(".mobile-card").appendTo($(".main-catalog-wrapper"));
      $(".main-catalog").appendTo($(".main-catalog-wrapper"));
    }
  }
})();

//Открываем каталог
let catalogBtn = document.querySelector(".main-catalog"),
  headerHeightC = document.querySelector(".header").clientHeight,
  navWrapperC = document.querySelector(".nav-wrapper") || document.querySelector(".nav-body"),
  navWrapperCHeight = navWrapperC.clientHeight,
  changeIcon = document.querySelector(".main-toggler"),
  mainSearchForm = document.querySelector(".main-search-form"),
  // catalogItemList = document.querySelectorAll('.catalog-item-list'),
  mainOpenCatalog = document.querySelector(".main"),
  navWrapperOpenCatalog = document.querySelector(".nav-wrapper"),
  bodyOpenCatalog = document.querySelector("body"),
  containerMenu = document.querySelector(".container-menu");

let mobMenuImg = document.querySelector(".mob-menu-img");
let enterMobile = document.querySelector(".enter-mobile");
//  let mobMenuImg = document.getElementsByClassName('mob-menu-img')
containerMenu.addEventListener("click", (e) => {
  // console.log(e.target.classList)
  if (e.target.classList.value == "container-menu container-menu-open") {
    changeIcon.classList.remove("main-toggler-cross");
    containerMenu.classList.remove("container-menu-open");
  }
});

catalogBtn.addEventListener("click", () => {
  //open first li on menu
  let menuZero = $(".menu-desktop-ul")[0];
  menuZero.classList.add("menu-desktop-ul-open");

  if (containerMenu.classList.contains("container-menu-open") == false) {
    mainSearchForm.classList.add("main-search-form-open");
    mainOpenCatalog.classList.add("main-open-catalog");
  } else {
    mainSearchForm.classList.remove("main-search-form-open");
    mainOpenCatalog.classList.remove("main-open-catalog");
  }
  searchMenu.classList.remove("search-menu-open");

  changeIcon.classList.toggle("main-toggler-cross");
  containerMenu.classList.toggle("container-menu-open");

  navWrapperOpenCatalog.classList.toggle("nav-wrapper-open-catalog");
  bodyOpenCatalog.classList.toggle("body-hidden");

  mobMenuImg.classList.remove("mob-menu-img-open");
  enterMobile.classList.remove("enter-mobile-open");
  if (matchMedia) {
    const screen = window.matchMedia("(max-width:1024.99px)");
    screen.addListener(changes);
    changes(screen);
  }
  function changes(screen) {
    if (screen.matches) {
      // containerMenu.style.top = headerHeightC - navWrapperC + mainSearchForm.clientHeight + 'px';
      containerMenu.style.top = $(".main").outerHeight();
    } else {
      containerMenu.style.top = headerHeightC - navWrapperCHeight + "px";
    }
  }

  //устанавливаем минимальную высоту подменю
  let menuDesktopHeight = document.querySelector(".menu-desktop").clientHeight;
  $(".menu-desktop-second").css(
    "min-height",
    `${menuDesktopHeight - 115 - 40 + 5}px`
  );
});

mobMenuImg.addEventListener("click", () => {
  mobMenuImg.classList.toggle("mob-menu-img-open");
  enterMobile.classList.toggle("enter-mobile-open");

  // hide menu
  changeIcon.classList.remove("main-toggler-cross");
  mainSearchForm.classList.remove("main-search-form-open");
  containerMenu.classList.remove("container-menu-open");
  mainOpenCatalog.classList.remove("main-open-catalog");
  bodyOpenCatalog.classList.remove("body-hidden");
});
//Высота при скроле шапки
window.addEventListener("scroll", () => {
  containerMenu.style.top = mainOpenCatalog.clientHeight + "px";
});

//COMPARE.html
// $(function () {
//   $(".slider-offer-left").click(function (event) {
//     event.preventDefault();
//     $(".features").animate(
//       {
//         scrollLeft: "-=278px",
//       },
//       "slow"
//     );
//   });

//   $(".slider-offer-right").click(function (event) {
//     event.preventDefault();
//     $(".features").animate(
//       {
//         scrollLeft: "+=278px",
//       },
//       "slow"
//     );
//   });
// });

//   // clone table
//   const tableclone = $(".features")
//     .wrap('<div class="features-clone" />')
//     .clone();
//   $(".features-wrap").append(tableclone);

// // скрываем элементы

// console.log($('.features-title-arrow').parents('.tbody').children('.tbody-list'))

// let listOfInfo = $('.features-title-arrow').parents('.tbody').children('.tbody-list')

// $('.features-title-arrow').click(function (e) {

// $(e).parents('.tbody').children('.tbody-list').toggleClass('tbody-list-hide')
// $(this).parents('.tbody').children('.tbody-list').toggleClass('tbody-list-hide')
// })

// carousel compare.html

let carouselCompare = document.querySelector(".swiper-carousel-compare");

let swiperCarouselCompare = new Swiper(".swiper-carousel-compare", {
  navigation: {
    nextEl: `.compare-slider-next-carousel-compare_1`,
    prevEl: `.compare-slider-prev-carousel-compare_1`,
  },
  slidesPerView: "auto",
  allowTouchMove: false,
  // slidesPerGroup: 99,
  spaceBetween: 24,
  breakpoints: {
    1024: {
      slidesPerView: 3,
    },
  },
  // on: {
  //   touchMove: function (swiper, event) {
  //     // console.log(event)
  //     // console.log(swiper)
  //     // console.log(event.x)
  //     // event.x =
  //   }
  // }
});

let posXStart = 0;
let posXEnd = 0;
let posYStart = 0;
let posYEnd = 0;

// swiper-carousel-compare
let deliverypayTouch = document.querySelector(".deliverypay-content");
let stickyTouch = document.querySelector(".compare-sticky-body");
if (carouselCompare) {
  deliverypayTouch.addEventListener(
    "touchstart",
    (ev) => {
      // ev.preventDefault();
      ev.stopImmediatePropagation();
      posXStart = ev.touches[0].clientX;
      posYStart = ev.touches[0].clientY;
    },
    { passive: true }
  );

  deliverypayTouch.addEventListener(
    "touchend",
    (ev) => {
      // ev.preventDefault();
      ev.stopImmediatePropagation();
      posXEnd = ev.changedTouches[0].clientX;
      posYEnd = ev.changedTouches[0].clientY;

      if (posYStart - posYEnd < 20) {
        swiperCarouselCompare.forEach((swiperSlide) => {
          let activeSlide = swiperSlide.activeIndex;
          if (posXStart - posXEnd > 20) {
            swiperSlide.slideTo(activeSlide + 1);
          } else {
            swiperSlide.slideTo(activeSlide - 1);
          }
        });
      }
    },
    { passive: true }
  );
  // Mobile touch

  stickyTouch.addEventListener(
    "touchstart",
    (ev) => {
      ev.preventDefault();
      ev.stopImmediatePropagation();
      posXStart = ev.touches[0].clientX;
      posYStart = ev.touches[0].clientY;
    },
    { passive: true }
  );

  stickyTouch.addEventListener(
    "touchend",
    (ev) => {
      ev.preventDefault();
      ev.stopImmediatePropagation();
      posXEnd = ev.changedTouches[0].clientX;
      posYEnd = ev.changedTouches[0].clientY;

      if (posYStart - posYEnd < 20) {
        swiperCarouselCompare.forEach((swiperSlide) => {
          let activeSlide = swiperSlide.activeIndex;
          if (posXStart - posXEnd > 0) {
            swiperSlide.slideTo(activeSlide + 1);
          } else {
            swiperSlide.slideTo(activeSlide - 1);
          }
        });
      }
    },
    { passive: true }
  );
}

let compareSection = document.querySelectorAll(".compare-table-section-head");

if (compareSection) {
  compareSection.forEach((e) => {
    e.addEventListener("click", (elem) => {
      let clickElem = elem.target.closest(".compare-table-section");
      let closeElem = clickElem.querySelector(".compare-table-section-body");
      let closeIcon = clickElem.querySelector(
        ".compare-table-section-head_arrow"
      );

      closeElem.classList.toggle("compare-table-section-body_close");
      closeIcon.classList.toggle("compare-table-section-head_arrow_close");
    });
  });
}

//compary-body mobile
(function () {
  if (matchMedia) {
    const screen = window.matchMedia("(max-width:1024.99px)");
    screen.addListener(changes);
    changes(screen);
  }
  function changes(screen) {
    if (screen.matches) {
      $(".compare-btn-clear").appendTo($(".compare-grid-aside-container"));
    } else {
      $(".compare-btn-clear").appendTo($(".compare-aside-clear"));
    }
  }
})();

// удаляем элементы по клику на крестик

let targetElment = document.querySelectorAll(".product-card"),
  removeBtn = document.querySelectorAll(".product-card-remove"),
  allSliders = document.querySelectorAll(".swiper-carousel-compare"),
  fixedBtn = document.querySelectorAll(".product-card-fixed"),
  allInfo = document.querySelectorAll(".swiper-slide");
if (removeBtn) {
  removeBtn.forEach((e) => {
    e.addEventListener("click", (elem) => {

      let removeElement = elem.target.closest(".swiper-slide").ariaLabel;
      allInfo.forEach((ariaElem) => {
        if (ariaElem.ariaLabel === removeElement) {
          ariaElem.remove();
          fixedbtn();

          swiperCarouselCompare.forEach((swiper) => {
            swiper.update();
          });
        }
      });
    });
  });
}
// if (fixedBtn) {
//   fixedBtn.forEach((e) => {
//     e.addEventListener("click", (elem) => {
//       // let productCardBox = document.querySelector('.product-card');
//       elem.preventDefault();

//       function fixElement() {
//         elem.target
//           .closest(".product-card-fixed")
//           .classList.toggle("product-card-fixed-fix");
//       }
//       function removeFixElem() {
//         if (
//           elem.target.closest(".product-card-fixed").classList[2] ==
//           "product-card-fixed-fix"
//         ) {
//           elem.target
//             .closest(".product-card-fixed")
//             .classList.remove("product-card-fixed-fix");
//           e.children[1].classList.remove("product-card-fixed-text-fix");
//         }
//       }

//       let productFixed = document.querySelectorAll(".product-card-fixed-fix");
//       if (productFixed.length < 4) {
//         fixElement();
//         e.children[1].classList.toggle("product-card-fixed-text-fix");

//         allInfo.forEach((aria) => {
//           if (
//             aria.ariaLabel === elem.target.closest(".swiper-slide").ariaLabel
//           ) {
//             $(aria.closest(".swiper-wrapper")).prepend($(aria));

//             //! $(aria).closest('.compare-row-main').children('.test-position-info')[0] - то куда класть элемент
//             let copyContainer = $(aria)
//               .closest(".compare-row-main")
//               .children(".test-position-info")[0];

//             $(aria).clone().appendTo(copyContainer);

//             swiperCarouselCompare.forEach((swiperSlide) => {
//               swiperSlide.slideTo(0);
//             });
//           }
//         });

//         //*Создаем клон карточки и кладем в "test-position"
//         // $(e).closest(".swiper-slide").clone().appendTo(".test-position");
//         $(".test-position").prepend($(e).closest(".swiper-slide").clone())
//         $(e).closest(".product-card").addClass("product-card-invivsible");


//         //*Кнопка закрепить - открепляем продукт
//         let wrapPositionT = document.querySelector(".test-position");
//         let children_wrapPosition =
//           wrapPositionT.querySelectorAll(".swiper-slide");

//         children_wrapPosition.forEach((card) => {
//           removeFix = $(card).find(".product-card-fixed")[0];
//           deleteFix = $(card).find(".product-card-remove")[0];

//           //*удаляем закрепленные элементы по нажатию на крестик
//           deleteFix.addEventListener("click", () => {

//             let allAriaId = document.querySelectorAll(".swiper-slide");

//             allAriaId.forEach((ariaId) => {
//               if (card.ariaLabel == ariaId.ariaLabel) {
//                 ariaId.remove();
//               }
//             });

//             let mainSlider = document.querySelector(
//               ".swiper-carousel-compare-main"
//             );

//             let newFirstIndex =
//               $(mainSlider).find(".swiper-slide")[0].ariaLabel;

//             children_wrapPosition[0].setAttribute("aria-label", newFirstIndex);
//             // console.log(children_wrapPosition[0]);

//             let updateFirstCopyIndex = children_wrapPosition[0];
//             updateFirstCopyIndex.setAttribute("aria-label", newFirstIndex);

//             swiperCarouselCompare.forEach((swiperSlide) => {
//               swiperSlide.slideTo(0);
//               swiperSlide.update();
//             });

//           });
//           //*удаляем закрепленные элементы по нажатию на "Закреплено"
//           removeFix.addEventListener("click", () => {


//             let warPositionTest = document.querySelectorAll(
//               ".test-position-info"
//             );
//             warPositionTest.forEach((elemOfText) => {
//               let children_elemOfText =
//                 elemOfText.querySelectorAll(".swiper-slide");

//               children_elemOfText.forEach((slideText) => {

//                 if (card.ariaLabel == slideText.ariaLabel) {
//                   slideText.remove();
//                 }
//               });
//             });

//             card.remove();

//             $(e)
//               .closest(".product-card")
//               .removeClass("product-card-invivsible");
//             e.children[1].classList.remove("product-card-fixed-text-fix");
//             elem.target
//               .closest(".product-card-fixed")
//               .classList.remove("product-card-fixed-fix");

//             swiperCarouselCompare.forEach((swiperSlide) => {

//               //! Тут тоже всплывает ошибка 2-го клика, из-за этого по 1 клику открывается сразу 2 оригинельные карточки вмсето 1-ой
//               //! Баг можно получить закрепив 2-е карточки => открепить 2-ю
//               console.log('Двойной клик')
//               //меняем оригинальные слайдера местами по их aria-label
//               let swiperSlideEl = $(swiperSlide)[0].$el.find(`.swiper-slide`)
//               swiperSlideEl.forEach((findAriaLabel) => {
//                 if(findAriaLabel.ariaLabel === card.ariaLabel) {

//                   $(findAriaLabel).closest('.swiper-wrapper').prepend($(findAriaLabel))

//                 }
//               })
//               // swiperSlide.querySelectorAll('swiper-slide')
//               // console.log(swiperSlide.querySelectorAll('swiper-slide'))
//               // console.log(swiperSlideEl)
//               //! insertAfter
//               // console.log($(swiperSlideEl).find('.swiper-slide[aria-label="+card.ariaLabel+"]'))
//               // $(swiperSlideEl).find('.swiper-slide[aria-label="+card.ariaLabel+"]')[0].addClass('zxczxczxczxczxcz')
//               // $(swiperSlide).find('.swiper-slide[aria-label="+card.ariaLabel+"]')
//               // console.log($(swiperSlide).find('.swiper-slide'))
//               swiperSlide.slideTo(0);
//             });
//           });
//         });

//       } else {
//         removeFixElem();
//         // e.children[1].classList.remove('product-card-fixed-text-fix')
//       }
//     });
//   });
// }
// console.log(window.matchMedia("(max-width:1024.99px)").matches)
// console.log('asd')
if (fixedBtn.length) {
  //фиксируем слайд
  fixedBtn.forEach(el => {

    //фиксируем слайд
    el.addEventListener('click', (event) => {

      event.preventDefault()
      event.stopPropagation()

      // проверяем на кол-во закрепленных продуктов
      let productFixed = document.querySelectorAll(".fixed");
      let productMaxFix = 2;
      if (window.matchMedia("(max-width:1024.99px)").matches == true) {
        productMaxFix = 1
      }
      if (productFixed.length <= productMaxFix) {
        // Меняем надпись на кнопке
        el.querySelector('.product-card-fixed-text').classList.add('product-card-fixed-text-fix')



        const parentSlide = el.closest('.swiper-slide')
        const parentSlideIndex = parseInt(parentSlide.ariaLabel.split('/')[0], 10)


        const allChooseSlide = document.querySelectorAll('.swiper-slide')
        allChooseSlide.forEach((slide) => {

          if (slide.ariaLabel == null) return false

          const slideLabel = parseInt(slide.ariaLabel.split('/')[0], 10)

          if (slideLabel == parentSlideIndex) {
            const cloneWrapper = $(slide).closest('.compare-row-main').children('.test-position-info')[0]
            slide.classList.add('fixed-slide')

            const cloneSlide = $(slide).clone()
            $(cloneWrapper).append($(cloneSlide))

            const parentcloneSlide = $(slide).parent()
            parentcloneSlide.prepend($(slide))
          }
        })

        if (el.classList.contains('fixed')) return

        el.classList.add('fixed')
        parentSlide.classList.add('fixed-slide')

        const cloneParentSlide = $(parentSlide).clone()
        $(".test-position").append($(cloneParentSlide))

        const parentSlideParent = $(parentSlide).parent()
        parentSlideParent.prepend($(parentSlide))

        //задаем ширену копированному элементу в зависимости от высоты оригина
        let originElement = document.querySelector('.swiper-slide');
        let originElementWidth = originElement.offsetWidth;

        let fixedSlide = document.querySelector('.test-position')
        let fixedSlides = fixedSlide.querySelectorAll('.swiper-slide')

        console.log(originElementWidth)
        console.log(fixedSlides)
        fixedSlides.forEach((elem) => {
          elem.style.width = originElementWidth
        });
      }
    }, false)
  })

  //возвращаем слайд на место
  const allCopyWrapper = document.querySelectorAll('.test-position-info')

  document.querySelector('.test-position').addEventListener('click', (e) => {
    const target = e.target


    // Удаление элемента (крестик)
    if (target.classList.contains('product-card-remove')) {

      const removeTarget = target.closest('.swiper-slide')
      const removeTargetLabel = removeTarget.ariaLabel

      document.querySelectorAll('.swiper-slide').forEach((Slide) => {


        if (removeTargetLabel == Slide.ariaLabel) {
          Slide.remove()

          swiperCarouselCompare.forEach((swiper) => {
            swiper.update();
          });
        }
      })

    }

    if (!target.closest('.product-card-fixed')) return false



    const parentSlide = target.closest('.swiper-slide')
    const parentSlideArea = parentSlide.ariaLabel
    const parentSlideIndex = parseInt(parentSlide.ariaLabel.split('/')[0], 10)


    //удаляем слайд из псевдо-закрепленного блока
    parentSlide.remove()

    //Удаляем все остальные псевдо-слaйды
    allCopyWrapper.forEach((cloneSlide) => {
      const slideInCloneWrapper = cloneSlide.querySelectorAll('.swiper-slide');
      slideInCloneWrapper.forEach((clone) => {
        clone.remove()
      })
    })



    document.querySelectorAll(".swiper-carousel-compare").forEach((swiper) => {
      //внешняя переменная для результата
      let slideToInsert = false


      //ищем слайд в каждой карусели, перед которым нужно вставить открепляемый
      swiper.querySelectorAll('.swiper-slide').forEach(slide => {

        const realIndex = parseInt(slide.ariaLabel.split('/')[0], 10)
        //прекращаем цикл, если уже нашли искомый элемент
        if (slideToInsert) return

        if (parentSlideIndex < realIndex && !slide.classList.contains('fixed-slide')) {
          slideToInsert = slide


          return
        }
      })




      //вставляем слайд на исходное место в каждой карусели
      swiper.querySelectorAll('.swiper-slide[aria-label="' + parentSlideArea + '"]').forEach(slide => {
        $(slide).insertBefore($(slideToInsert))

        //Меня обратно надпись на кнопке
        if (slide.querySelector('.product-card-fixed-text') == null) return false
        slide.querySelector('.product-card-fixed-text').classList.remove('product-card-fixed-text-fix')


        //удаляем блокирующий клик класс
        $(slide).find('.product-card-fixed').removeClass('fixed')
        // slide.querySelector('.product-card-fixed').classList.remove('fixed')
        slide.classList.remove('fixed-slide')
      })
    })

  })



}
//Добавляем\убираем кнопку закрепить в зависимости от кол-во элементов
let product_c = document.querySelectorAll(".product-card");
letT = document.querySelector(".test-position");
let wrapPositionText = document.querySelectorAll(".test-position-info");

if (carouselCompare) {
  function fixedbtn() {
    if ($(".swiper-carousel-compare-main").find(".swiper-slide").length > 3) {
      $(".product-card-fixed").addClass("product-card-fixed-f");
    } else {
      $(".product-card-fixed").removeClass("product-card-fixed-f");
      product_c.forEach((product) => {
        $(product).removeClass("product-card-invivsible");
      });
      wrapPositionText.forEach((deleteText) => {
        deleteText.remove();
      });
      // wrapPosition.remove();
    }
  }

  fixedbtn();
}

// catalog-item-list

const serviceReminder = document.querySelector(".service-reminder");

if (serviceReminder) {
  const txtHeadline = document.querySelector(".sign-company-headline");
  const txtSteps = document.querySelector(".sign-company-steps span");
  const firstStep = document.querySelector(".sign-company-first");
  const secondStep = document.querySelector(".sign-company-second");
  const progressBar = document.querySelector(".progress-bar");
  const btnBackStep = document.querySelector(".reminder-btn");

  btnBackStep.addEventListener("click", () => {
    txtHeadline.textContent = "Об оборудовании";
    txtSteps.textContent = "1";

    firstStep.style.display = "block";
    secondStep.style.display = "none";
    progressBar.style.width = "50%";
  });

  jQuery.validator.addMethod(
    "lettersonly",
    function (value, element) {
      return this.optional(element) || /^[a-zA-ZА-Яа-я\s,ё]+$/i.test(value);
    },
    "Incorrect format"
  );

  jQuery.validator.addMethod(
    "emailErr",
    function (value, element) {
      if (/123@gmail.com/.test(value)) {
        return false;
      } else {
        return true;
      }
    },
    "Incorrect format"
  );

  var phoneMask = IMask(document.getElementById("phone"), {
    mask: "+{375} (00) 000 00 00",
  });

  // datetimepicker
  FARBA.lazyLibraryLoad(
    "https://cdnjs.cloudflare.com/ajax/libs/jquery-datetimepicker/2.5.20/jquery.datetimepicker.full.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/jquery-datetimepicker/2.5.20/jquery.datetimepicker.css",
    () => {
      $(document).ready(function () {
        let flag = false;

        // if(!IsSafari()) {
        //   $("select").styler();
        //   console.log('Safari')
        // }

        $("#datetimepicker").datetimepicker({
          // value:'12.03.2013',
          format: "d.m.Y",
          timepicker: false,
          // opened: true,
          closeOnDateSelect: true,
          lang: "ru",
          yearStart: 1940,
          yearEnd: new Date().getFullYear(),
          dayOfWeekStart: 1,
          onGenerate: function () {
            if (!flag) {
              let blockOfYears = document.querySelector(".xdsoft_yearselect");
              let btnYears = document.querySelector(
                ".xdsoft_label.xdsoft_year"
              );
              let control = document.querySelector(".xdsoft_monthpicker");
              let blockScroll = blockOfYears.childNodes[0];
              let scroll = 30 * 9;

              blockScroll.classList.add("blockYears");

              let arrowUp = document.createElement("div");
              let arrowDown = document.createElement("div");

              arrowUp.classList.add("arrowUp");
              arrowDown.classList.add("arrowDown");

              blockOfYears.appendChild(arrowUp);
              blockOfYears.appendChild(arrowDown);

              control.addEventListener("click", (e) => {
                if (e.target.classList[1] === "xdsoft_year") {
                  let valueMargin = blockScroll.style.marginTop;
                  let marginGet = valueMargin.split("px")[0];
                  let currentYearElement = document.querySelector(
                    ".xdsoft_year .xdsoft_current"
                  );
                  let numCurrentYear = +currentYearElement.textContent;

                  if (numCurrentYear === 2022) {
                    blockScroll.style.marginTop = "-2242px";
                  } else if (numCurrentYear === 1940) {
                    blockScroll.style.marginTop = "0px";
                  } else {
                    blockScroll.style.marginTop = +marginGet + 40 + "px";
                  }
                }
              });

              arrowUp.addEventListener("click", () => {
                let valueMargin = blockScroll.style.marginTop;
                let marginGet = valueMargin.split("px")[0];

                if (+marginGet < 0) {
                  blockScroll.style.marginTop = +marginGet + scroll + "px";

                  if (+marginGet < -271) {
                    blockScroll.style.marginTop = +marginGet + scroll + "px";
                  } else {
                    blockScroll.style.marginTop = "0px";
                  }
                } else {
                  blockScroll.style.marginTop = "0px";
                }
              });

              arrowDown.addEventListener("click", () => {
                let valueMargin = blockScroll.style.marginTop;
                let marginGet = valueMargin.split("px")[0];

                blockScroll.style.marginTop = +marginGet - scroll + "px";

                if (+marginGet > -$(".blockYears").height() + 250) {
                  //-2490
                  if (+marginGet > -$(".blockYears").height() + 540) {
                    blockScroll.style.marginTop = +marginGet - scroll + "px";
                  } else {
                    blockScroll.style.marginTop = `${-$(".blockYears").height() + 250
                      }px`;
                  }
                } else {
                  blockScroll.style.marginTop = `${-$(".blockYears").height() + 250
                    }px`;
                }
              });

              $(document).on("click touchend", ".xdsoft_monthpicker", (e) => {
                if (e.target.parentElement.classList[1] === "xdsoft_year") {
                  let valueMargin = blockScroll.style.marginTop;
                  let marginGet = valueMargin.split("px")[0];
                  let currentYearElement = document.querySelector(
                    ".xdsoft_year .xdsoft_current"
                  );
                  let numCurrentYear = +currentYearElement.textContent;

                  if (numCurrentYear === 2022) {
                    blockScroll.style.marginTop = "-2242px";
                  } else if (numCurrentYear === 1940) {
                    blockScroll.style.marginTop = "0px";
                  } else {
                    blockScroll.style.marginTop = +marginGet + 40 + "px";
                  }
                }
              });

              $(document).on("click touchend", ".arrowUp", (e) => {
                let valueMargin = blockScroll.style.marginTop;
                let marginGet = valueMargin.split("px")[0];

                if (+marginGet < 0) {
                  blockScroll.style.marginTop = +marginGet + scroll + "px";

                  if (+marginGet < -271) {
                    blockScroll.style.marginTop = +marginGet + scroll + "px";
                  } else {
                    blockScroll.style.marginTop = "0px";
                  }
                } else {
                  blockScroll.style.marginTop = "0px";
                }
              });

              $(document).on("click touchend", ".arrowDown", (e) => {
                let valueMargin = blockScroll.style.marginTop;
                let marginGet = valueMargin.split("px")[0];

                if (+marginGet > -$(".blockYears").height() + 250) {
                  //-2490
                  if (+marginGet > -$(".blockYears").height() + 540) {
                    blockScroll.style.marginTop = +marginGet - scroll + "px";
                  } else {
                    blockScroll.style.marginTop = `${-$(".blockYears").height() + 250
                      }px`;
                  }
                } else {
                  blockScroll.style.marginTop = `${-$(".blockYears").height() + 250
                    }px`;
                }
              });

              flag = true;
            }
          },
        });

        $.datetimepicker.setLocale("ru");
      });
    }
  );
}

//input script

let mainSearchInput = document.querySelector(".main-search-input"),
  mainLogo = document.querySelector(".main-logo"),
  searchMenu = document.querySelector(".search-menu"),
  mainHeight = document.querySelector(".main"),
  menuHeight = document.querySelector(".menu"),
  closeInput = document.querySelector(".main-search-input-close");
// headerConatins = document.querySelector('.header').classList.contains('.header_fixed'),
mainWatalog = document.querySelector(".main-catalog-wrapper");

closeInput.addEventListener("click", () => {
  mainSearchInput.value = "";

  mainLogo.classList.remove("main-logo-close");
  mainWatalog.classList.remove("main-catalog-wrapper-close");
  searchMenu.classList.remove("search-menu-open");
  bodyOpenCatalog.classList.remove("body-hidden-search");
  closeInput.classList.remove("main-search-input-close-open");
});

searchMenu.addEventListener("click", (e) => {
  if (e.target.classList[1] == "search-menu-open") {
    mainLogo.classList.remove("main-logo-close");
    mainWatalog.classList.remove("main-catalog-wrapper-close");
    searchMenu.classList.remove("search-menu-open");
    bodyOpenCatalog.classList.remove("body-hidden-search");
  }
});

let mobMenuSearch = document.querySelector(".mob-menu-search");

mobMenuSearch.addEventListener("click", () => {
  if (containerMenu.classList.contains("container-menu-open") == false) {
    mainSearchForm.classList.toggle("main-search-form-open");
    mainOpenCatalog.classList.toggle("main-open-catalog");
    // search-menu search-menu-open
    searchMenu.classList.remove("search-menu-open");
  }
});

if (document.getElementById("productGallery")) {
  FARBA.lazyLibraryLoad(
    '//cdnjs.cloudflare.com/ajax/libs/lightgallery/2.7.0/lightgallery.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/lightgallery/2.7.0/css/lightgallery.min.css',
    () => {
      var lg = document.getElementById("productGallery");
      lightGallery(lg);
    }
  )
}


//Показать только отличия compare2.html
let inputSame = document.getElementById("f_v_1");
let inputSame2 = document.getElementById("f_v_2");

$(".compare-checkbox").on("click", function () {
  if ($(this).is(":checked")) {
    inputSame2.checked = true;
    inputSame.checked = true;

    $(".swiper-slide-same").addClass("swiper-slide-same-hidden");
  } else {
    inputSame2.checked = false;
    inputSame.checked = false;

    $(".swiper-slide-same").removeClass("swiper-slide-same-hidden");
  }
});

//скролл
$("a.scroll-to").on("click", function (e) {
  e.preventDefault();
  var anchor = $(this).attr("href");
  $("html, body")
    .stop()
    .animate(
      {
        scrollTop: $(anchor).offset().top - 100,
      },
      800
    );
});


//убираем активный пункт в меню
let menuDesktopHover = document.querySelectorAll(".menu-desktop li");

menuDesktopHover.forEach((e) => {
  e.addEventListener("mouseover", (mouse) => {
    if (mouse.target) {
      $(".menu-desktop-ul").removeClass("menu-desktop-ul-open");
    }
  });
});

// check & unchecked radio input
$('.features-btn-input').on('mousedown', function (e) {
  if ($(this).prop("checked") === true) {
    $(this).prop("checked", false);
  } else {
    $(this).prop("checked", true);
  }
});

$('.features-btn-input').on('click', function (e) {
  e.preventDefault();
});

document.body.addEventListener('click', openSticker)

function openSticker(e) {
  if (e.target.classList.contains("product-card-arrow")) {
    const cardTopline = e.target.closest(".product-card-topline")
    const url = cardTopline.dataset.href || null

    if (document.documentElement.clientWidth > 1024) {
      return e.target.closest('.product-card').classList.toggle('opened');
    }

    if (!url) return
    $.magnificPopup.open({
      items: { src: url },
      type: "ajax",
      overflowY: "scroll",
      removalDelay: 610,
      mainClass: "my-mfp-zoom-in",
      ajax: {
        tError: "Error. Not valid url",
      },

      callbacks: {
        open: function () {
          document.documentElement.style.overflow = 'hidden'
        },

        close: function () {
          document.documentElement.style.overflow = ''
        }
      }
    });
  }
}

// map for tab\radio\select
function initMapTarget(selector, id) {
  const town = document.querySelectorAll(selector);
  const defaultTown = JSON.parse(town[0].dataset.map);

  ymaps.ready(function () {
    const map = new ymaps.Map(id, {
      zoom: 9,
      center: defaultTown.coordinates,
      controls: [],
    });

    town.forEach(item => {
      const mapObj = JSON.parse(item.dataset.map);

      myPlacemark = new ymaps.Placemark(mapObj.coordinates);
      map.geoObjects.add(myPlacemark);

      item.addEventListener('click', () => {
        map.setCenter(mapObj.coordinates);
      })
    })
  })
}

// map for single init map
function initSingleMap(id, allMap) {
  const defaultTown = JSON.parse(allMap[0].dataset.map)
  const idMap = document.getElementById(id)

  ymaps.ready(function () {
    const map = new ymaps.Map(idMap, {
      zoom: defaultTown.zoom,
      center: defaultTown.defaultCoordinates,
      controls: [],
    });

    allMap.forEach(item => {
      const mapObj = JSON.parse(item.dataset.map);

      myPlacemark = new ymaps.Placemark(mapObj.coordinates);
      map.geoObjects.add(myPlacemark);
    })
  })
}

$(document).on('mouseup', function (e) {
  if ($('.enter-mobile').has(e.target).length === 0 && $('.mob-menu-img').has(e.target).length === 0) {
    $('.enter-mobile').removeClass('enter-mobile-open')
    $('.mob-menu-img').removeClass('mob-menu-img-open')
  }
});

if (document.querySelector('.catalog-products')) {
  const categoryBtnClose = document.querySelectorAll('.js-close')

  categoryBtnClose.forEach(item => {
    item.addEventListener('click', () => {
      const allCheckbox = document.querySelectorAll('.js-checkbox')

      allCheckbox.forEach(item => {
        item.checked = false
      })

      item.closest('.js-menu').classList.remove('opened')
    })
  })
}

let mainTrustSwiper = new Swiper(".main-trust-slider", {
  spaceBetween: 24,
  loop: true,

  breakpoints: {
    768: {
      slidesPerView: 3,

      pagination: {
        dynamicBullets: true,
        dynamicMainBullets: 2,
      }
    },


    420: {
      slidesPerView: 2,

      pagination: {
        dynamicBullets: true,
        dynamicMainBullets: 3,
      }
    },

    300: {
      slidesPerView: 1,

      pagination: {
        dynamicBullets: true,
        dynamicMainBullets:4,
      }
    },
  },

  pagination: {
    el: ".swiper-pagination.swiper-adaptive-trust",
    clickable: true,
  },

  navigation: {
    nextEl: ".main-trust-next",
    prevEl: ".main-trust-prev",
  },
});

const swiperRent = new Swiper('.swiper.slider-rent', {
  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});


const swiperService = new Swiper('.swiper.service', {
  spaceBetween: 24,

  // Navigation arrows
  navigation: {
    nextEl: '.service-button-next',
    prevEl: '.service-button-prev',
  },

  breakpoints: {
    1140: {
      slidesPerView: 4,
      spaceBetween: 24,
    },

    1024: {
      slidesPerView: 3,
      spaceBetween: 24,
    },

    300: {
      slidesPerView: 2,
      spaceBetween: 16,
    }
  }
});

const swiperRepair = new Swiper('.swiper.repair', {
  spaceBetween: 24,
  slidesPerView: 'auto',

  // Navigation arrows
  navigation: {
    nextEl: '.repair-button-next',
    prevEl: '.repair-button-prev',
  },

  breakpoints: {
    1140: {
      // slidesPerView: 3,
      spaceBetween: 24,
    },

    768: {
      // slidesPerView: 2.13,
      spaceBetween: 24,
    },

    300: {
      // slidesPerView: 1.2,
      spaceBetween: 16,
    }
  }
});

(function() {
  let swiperAuditExamples;
  if(!document.querySelector('.swiper.audit-examples')) return;

  function initSwiper() {
    if (window.innerWidth >= 576 && !swiperAuditExamples) {
      swiperAuditExamples = new Swiper('.swiper.audit-examples', {
        spaceBetween: 0,
        slidesPerView: 1,
        navigation: {
          nextEl: '.audit-examples-button-next',
          prevEl: '.audit-examples-button-prev',
        },
        breakpoints: {
          1024: {
            slidesPerView: 1,  
            spaceBetween: 0,          
          },
          576: {
            slidesPerView: 1.05,
            spaceBetween: 24,
          }
        }
      });
    } else if (window.innerWidth <= 1024 && swiperAuditExamples) {
      swiperAuditExamples.destroy(true, true);
      swiperAuditExamples = null;
    }
  }

  // Инициализация при загрузке страницы
  initSwiper();

  // Обработка изменения размера окна
  window.addEventListener('resize', initSwiper);
})();

// const swiperAuditExamples = new Swiper('.swiper.audit-examples', {
//   spaceBetween: 24,
//   slidesPerView: 1,

//   // Navigation arrows
//   navigation: {
//     nextEl: '.audit-examples-button-next',
//     prevEl: '.audit-examples-button-prev',
//   },
// });

const swiperMonitoringResults = new Swiper('.swiper.monitoring-results-slider', {
  slidesPerView: 1.22,
  spaceBetween: 16,

  // Navigation arrows
  navigation: {
    nextEl: '.monitoring-results-next',
    prevEl: '.monitoring-results-prev',
  },
  breakpoints: {
    1025: {
      slidesPerView: 1,  
      spaceBetween: 0,          
    },
    576: {
      slidesPerView: 1.15,
      spaceBetween: 24,
    }
  }
});


const swiperReviews = new Swiper('.swiper.swiper-reviews', {
  slidesPerView: 6,
  spaceBetween: 24,

  // Navigation arrows
  navigation: {
    nextEl: '.reviews-button-next',
    prevEl: '.reviews-button-prev',
  },
});


$( document ).ready(function() {
  // Handler for .ready() called.
  const reviewsCard = document.querySelectorAll('.feedback-card');

  if(reviewsCard.length) {
    reviewsCard.forEach(card => {
      const reviewsCardCompany = card.querySelector('.feedback-card-company');
      const reviewsCardContent = card.querySelector('.feedback-card-content');
      const reviewsCardImg = card.querySelector('.feedback-card-img');

      (function () {
        if (matchMedia) {
          const screen = window.matchMedia("(max-width:1024px)");
          screen.addListener(changes);
          changes(screen);
        }
        function changes(screen) {
          if (screen.matches) {
            //экран менее 1024
            card.prepend(reviewsCardCompany);
            reviewsCardContent.append(reviewsCardImg);
          } else {
            //экран более 1024
            card.append(reviewsCardImg);
            reviewsCardContent.prepend(reviewsCardCompany);
          }
        }
      })();
    })
  }

  const rentCheckbox = document.querySelectorAll('.ui-checkbox-input')

  if(rentCheckbox.length) {
    rentCheckbox.forEach(item => {
      const parent = item.closest('.rent-solution-product') || item.closest('.rent-solution-services')

      item.addEventListener('change', () => {

        if(item.checked) {
          parent.classList.add('checked')
        } else {
          parent.classList.remove('checked')
        }
      })
    })
  }

  function showPopup() {
    $.magnificPopup.open({
      items: { src: './popups/zaglushka-phone.html' },
      type: 'ajax',
      overflowY: 'scroll',
      removalDelay: 300,
      mainClass: 'my-mfp-zoom-in',
      ajax: {
        tError: 'Ошибка. <a href="%url%">Контент</a> не может быть загружен',
      },
      callbacks: {
        open: function () {
          setTimeout(function () {
            $('.mfp-wrap').addClass('not_delay');
            $('.white-popup').addClass('not_delay');
          }, 700);
        }
      }
    });
  }

  var tab = $('#tabs .tabs-items > div');
	tab.hide().filter(':first').show();

	// Клики по вкладкам.
	$('#tabs .tabs-nav a').click(function(){
		tab.hide();
    tab.removeClass('active')
    tab.filter(this.hash).addClass('active')
		tab.filter(this.hash).show();
		$('#tabs .tabs-nav a').removeClass('active');
		$(this).addClass('active');
		return false;
	}).filter(':first').click();

  // rent
  const rentTabs = document.querySelectorAll('.rent-tab')

  if(rentTabs.length !== 0 && rentTabs !== undefined) {
    let rentProductCheckbox
    let rentInput
    const totalBlock = document.querySelector('.rent-calculation-total')
    const emptyBlock = document.querySelector('.rent-calculation-empty')
    const list = document.querySelector('.rent-calculation-list ul')
    const rentSlider = document.querySelector('.rent-calculation-slider')
    const rentBtn = document.querySelector('.rent-calculation .ui-btn')
    const cardStickyRent = document.querySelector('.rent.card-price-current')

    rentTabs.forEach(item => {
      if(item.classList.contains('active')) {
        rentTab = document.querySelector('.tabs-item.active')
        rentProductCheckbox = rentTab.querySelectorAll('.rent-solution-product .ui-checkbox-input');
        rentInput = rentTab.querySelector('.ui-input.period')
      }

      item.addEventListener('click', () => {
        rentTab = document.querySelector('.tabs-item.active')
        rentProductCheckbox = rentTab.querySelectorAll('.rent-solution-product .ui-checkbox-input');
        rentInput = rentTab.querySelector('.ui-input.period')

        $('li.product').remove();

        checkProducts()
        rentList()
        rentImgSlider()
        rentAdd()

        swiperRent.update(true)
      })
    })

    function checkProducts() {
      let allPrice = []

      const checked = Array.from(rentProductCheckbox).filter(item => {
        return item.checked
      })

      if(checked.length !== 0) {
        emptyBlock.classList.add('hidden')

        rentSlider.classList.remove('hidden')
        totalBlock.classList.remove('hidden')

        rentBtn.disabled = false
      } else {
        emptyBlock.classList.remove('hidden')

        rentSlider.classList.add('hidden')
        totalBlock.classList.add('hidden')

        rentBtn.disabled = true
      }

      checked.forEach(item => {
        const parent = item.closest('.rent-solution-product')
        const priceBlock = parent.querySelector('.rent-solution-amount.month').innerHTML
        const price = priceBlock.split(' ')[0]

        return allPrice.push(+price)
      })

      rentCalculation(allPrice)
    }

    function rentCalculation(allPrice) {
      const rent = rentInput.value

      if(rent !== '' && +rent !== 0) {
        const sum = allPrice.reduce((previousValue, currentValue) => previousValue + currentValue, 0)
        const total = sum * rent

        totalBlock.innerHTML = `${total} <span>р.</span>`
        cardStickyRent.innerHTML = `${total} BYN`
      } else {
        totalBlock.classList.add('hidden')

        rentBtn.disabled = true
      }

      rentInput.addEventListener('keyup', () => {
        checkProducts()
      })
    }

    function rentImgSlider() {
      rentProductCheckbox.forEach((item, index) => {
        const parent = item.closest('.rent-solution-product')
        const imgBlock = parent.querySelector('.rent-solution-img')
        const imgPath = imgBlock.dataset.img

        swiperRent.removeSlide(index);

        if(item.checked) {
          swiperRent.appendSlide(`
            <div class="swiper-slide">
              <div class="rent-calculation-img">
                <img src="${imgPath}" alt="alt">
              </div>
            </div>`)
          swiperRent.update(true)
        } else {
          swiperRent.removeSlide(index);
        }
      })
    }

    function rentList() {
      let test = list.querySelectorAll('li.product')

      test.forEach(item => {
        item.remove()
      })

      rentProductCheckbox.forEach((item, index) => {
        const parent = item.closest('.rent-solution-product')
        const name = parent.querySelector('.rent-solution-name').textContent
        let li = document.createElement("li")

        if(item.checked) {
          li.classList.add('product')
          li.append(name)
          list.prepend(li)
        }
      })
    }

    function rentAdd() {
      rentProductCheckbox.forEach((item, index) => {
        item.addEventListener('change', () => {
          swiperRent.update(true)
          checkProducts()
          rentImgSlider()
          rentList()
        })
      })
    }

    rentList()
    rentImgSlider()
    rentList()
    checkProducts()
    rentAdd()
  };

  // cookie
  (function() {
    const cookie = document.querySelector('.cookie');
    const accept = document.querySelector('.cookie-btns-accept');
    const cookiesInfo = localStorage.getItem('cookies');
    const close = document.querySelector('.cookie-close');

    if (!cookie && !accept) return
    
    if (cookiesInfo === 'yes') {
      // Если есть информация о "cookies", скрываем блок с сообщением       
      cookie.classList.add('closed');     
    } else {
      setTimeout(() => {
        cookie.classList.remove('closed'); 
      }, 5000);
    }

    accept.addEventListener('click', () => {
      localStorage.setItem('cookies', 'yes');
      cookie.classList.add('closed');
    })

    close.addEventListener('click', () => {     
      cookie.classList.add('closed');
    })
  })();

  // калькулятор оплаты по частям
  (function() {
    const leasingCalck = document.getElementById('leasingCalck');
    const leasinCards = document.querySelectorAll('.leasing-calc-card');
    const entityTypeButtons = document.querySelectorAll('#entityType .calculation-btn-input');  

    let selectedSum = '0';
    let firstPaymentSum = '0';
    let selectedPeriod = '6';

    entityTypeButtons.forEach(button => {
      button.addEventListener('change', handleEntityTypeChange);
    })

    function handleEntityTypeChange(ev) {
      const selectedType = ev.target.closest('.calculation-btn').getAttribute('data-value');

      leasinCards.forEach(card => { 
        if(card.getAttribute('data-card-type') !== selectedType) {
          card.classList.add('hidden');
        } else {
          card.classList.remove('hidden');
        }
      });

      cardsOrder();
    }

    // первый взнос
    let selectedFirstPayment = '0';
    const firstPaymentButtons = document.querySelectorAll('#contribution .calculation-btn-input');

    firstPaymentButtons.forEach((button) => {
      if (button.checked) {
        selectedFirstPayment = button.closest('.calculation-btn').getAttribute('data-value');
      }

      button.addEventListener('change', handleFirstPaymentChange)
    });

    function handleFirstPaymentChange(ev) {
      selectedFirstPayment = ev.target.closest('.calculation-btn').getAttribute('data-value');

      firstPaymentSum = (selectedSum / 100) * selectedFirstPayment; 

      monthlyPayment();
      cardsOrder();
    }

    // период оплаты    
    const periodButtons = document.querySelectorAll('#period .calculation-btn-input');

    periodButtons.forEach((button) => {
      if (button.checked) {
        selectedPeriod = button.closest('.calculation-btn').getAttribute('data-value');
      }

      button.addEventListener('change', handlePeriodChange)
    });

    function handlePeriodChange(ev) {
      selectedPeriod = ev.target.closest('.calculation-btn').getAttribute('data-value');

      monthlyPayment();
      cardsOrder();
    }

    // расчет значений в зависимости от выбранных условий    
    const paymentInput = document.querySelector('#payment .ui-input');

    if(paymentInput) {
      paymentInput.addEventListener('input', handlePaymentChange)
    }

    function handlePaymentChange(ev) {
      selectedSum = ev.target.value;
      firstPaymentSum = (selectedSum / 100) * selectedFirstPayment;   

      monthlyPayment();
      cardsOrder();
    }

    // функция рассчета ежемесячного платежа
    function monthlyPayment() {
      leasinCards.forEach(card => {      
        const percent = card.getAttribute('data-percent');  
        const increase = card.getAttribute('data-increase') || 1;       

        // const monthlyPaymentSum = ((Number(selectedSum) - Number(firstPaymentSum)) / Number(selectedPeriod)) + ((Number(selectedSum) - Number(firstPaymentSum)) * Number(percent)) / 12;
        const monthlyPaymentSum = ((Number(selectedSum) - Number(firstPaymentSum)) / Number(selectedPeriod)) + ((Number(selectedSum) - Number(firstPaymentSum)) * (Number(percent) / 100)) / 12 * Number(selectedPeriod) * Number(increase);
        
        const totalSum = monthlyPaymentSum * selectedPeriod;
        
        card.querySelector('.leasing-calc-value-payment').textContent = monthlyPaymentSum.toFixed(2).replace('.', ',') + ' BYN';
        card.querySelector('.leasing-calc-total').textContent = totalSum.toFixed(2).replace('.', ',') + ' BYN';
        card.querySelector('.leasing-calc-first-payment').textContent = parseFloat(firstPaymentSum).toFixed(2).replace('.', ',') + ' BYN';
      })
    }

    // порядок и отображение карточек в зависимости от условий
    function cardsOrder() {
      let minValue = Infinity;
      let bestCard = null;

      leasinCards.forEach(card => {
        const cardPeriodStart = parseInt(card.getAttribute('data-period-start'));
        const cardPeriodEnd = parseInt(card.getAttribute('data-period-end'));
        const cardFirstPaymentStart = parseInt(card.getAttribute('data-contribution-start'));
        const cardFirstPaymentEnd = parseInt(card.getAttribute('data-contribution-end'));
        const cardMaxPayment = Number(card.getAttribute('data-max-payment'));
        const cardMinPayment = Number(card.getAttribute('data-min-payment'));
    
        // Преобразуем selectedFirstPayment и selectedPeriod в числа
        const numSelectedFirstPayment = parseInt(selectedFirstPayment);
        const numSelectedPeriod = parseInt(selectedPeriod);
    
        // Проверяем, находится ли selectedFirstPayment в пределах cardFirstPaymentStart и cardFirstPaymentEnd
        const isValidFirstPayment = !isNaN(numSelectedFirstPayment) && !isNaN(cardFirstPaymentStart) && !isNaN(cardFirstPaymentEnd) && numSelectedFirstPayment >= cardFirstPaymentStart && numSelectedFirstPayment <= cardFirstPaymentEnd;
    
        // Проверяем, находится ли selectedPeriod в пределах cardPeriodStart и cardPeriodEnd
        const isValidPeriod = !isNaN(numSelectedPeriod) && !isNaN(cardPeriodStart) && !isNaN(cardPeriodEnd) && numSelectedPeriod >= cardPeriodStart && numSelectedPeriod <= cardPeriodEnd;

        // Проверяем не превышает ли максимальную стоимость
        let isValidMaxPayment = Number(selectedSum) <= cardMaxPayment;

        // Проверяем не превышает ли минимальную стоимость
        let isValidMinPayment = Number(selectedSum) >= cardMinPayment;
    
        // Сбрасываем класс "not-available" у всех карточек
        card.classList.remove('not-available');
    
        // Если карточка скрыта или не соответствует условиям периода и первоначального взноса, добавляем класс "not-available"
        if (card.classList.contains('hidden') || !isValidFirstPayment || !isValidPeriod || !isValidMaxPayment || !isValidMinPayment) {
          card.classList.add('not-available');
          card.querySelector('.leasing-calc-value-payment').textContent = '0,00 BYN';
          card.querySelector('.leasing-calc-first-payment').textContent = '0,00 BYN';
          card.querySelector('.leasing-calc-total').textContent = '0,00 BYN';          
          
          return;
        }  
    
        const value = parseFloat(card.querySelector('.leasing-calc-value-payment').textContent.replace(/\s/g, ''));
    
        if (!isNaN(value) && value < minValue) {
          minValue = value;
          bestCard = card;
        }
      });
    
      // Удаляем класс "best" у всех карточек
      leasinCards.forEach(card => card.classList.remove('best'));
    
      // Добавляем класс "best" к карточке с минимальным значением
      if (bestCard) {
        bestCard.classList.add('best');
      }
    }
    

    if(leasingCalck) {
      monthlyPayment();
      cardsOrder();
    }



  })();

  // конструктор пневмосети
  (function() {
    document.querySelectorAll('.pneumatic-constructor .trigger').forEach(function(trigger) {
      trigger.addEventListener('mouseover', function() {
        let triggerIndex = this.classList.value.match(/trigger-(\d+)/)[1];
        document.querySelectorAll('.line').forEach(function(line) {
          let lineIndex = line.classList.value.match(/line-(\d+)/)[1];
          if (lineIndex === triggerIndex) {
            line.classList.add('active');
          }
        });
      });
  
      trigger.addEventListener('mouseout', function() {
        let triggerIndex = this.classList.value.match(/trigger-(\d+)/)[1];
        document.querySelectorAll('.line').forEach(function(line) {
          let lineIndex = line.classList.value.match(/line-(\d+)/)[1];
          if (lineIndex === triggerIndex) {
            line.classList.remove('active');
          }
        });
      });
    });
  })();

  // аккордион
  (function() {
    document.querySelectorAll('.accordion-item-head').forEach(item => {
      item.addEventListener('click', event => {
        let parent = event.target.closest('.accordion-item');
        if (parent) {
          parent.classList.toggle('opened');

          parent.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest'
          });
        }
      });
    });
  })();

  // скролл вакансии
  (function () {
    if (!document.querySelector('.vacancies-header-scroller') || !document.querySelector('#vacanciesLst')) return

    document.querySelector('.vacancies-header-scroller').addEventListener('click', (e) => {
      e.preventDefault()
      document.querySelector('#vacanciesLst').scrollIntoView({behavior: "smooth"})
    })
  
  }());

  (function() {
    let items = document.querySelectorAll('.vacancies-list-item');

    items.forEach((item) => {
      let salaryElement = item.querySelector('.vacancies-list-salary');
      
      if (salaryElement) {
        let salaryText = salaryElement.textContent;
        
        // Проверяем текст на наличие цифр
        if (/\d/.test(salaryText)) {
          let headSalaryElement = item.querySelector('.vacancies-list-head-salary');
          
          if (headSalaryElement) {
            headSalaryElement.textContent = salaryText;
          }
        }
      }
    });

  })();
  
});

$('.mfp-img').magnificPopup({
  type: 'image',
  gallery:{
    enabled:false
  }
});

function openSearchMenu() {
  closeInput.classList.remove("main-search-input-close-open");

  mainLogo.classList.add("main-logo-close");
  mainWatalog.classList.add("main-catalog-wrapper-close");
  searchMenu.classList.add("search-menu-open");
  bodyOpenCatalog.classList.add("body-hidden-search");
  closeInput.classList.add("main-search-input-close-open");

  topSum = menuHeight.offsetHeight + mainHeight.offsetHeight;

  if ($(".header").hasClass("header_fixed")) {
    $(searchMenu).css("top", `${mainHeight.offsetHeight}px`);
  } else {
    $(searchMenu).css("top", `${topSum}px`);
  }
}


document.addEventListener('click', (event) => {
  const ignoredBlock = document.querySelector('.search-menu');
  const ignoredBlock2 = document.querySelector('.main-search-form');

  const isClickInsideIgnoredBlock = ignoredBlock.contains(event.target);
  const isClickInsideIgnoredBlock2 = ignoredBlock2.contains(event.target);

  if (!isClickInsideIgnoredBlock && !isClickInsideIgnoredBlock2) {
    // Код для обработки клика вне блока
    mainLogo.classList.remove("main-logo-close");
    mainWatalog.classList.remove("main-catalog-wrapper-close");
    searchMenu.classList.remove("search-menu-open");
    bodyOpenCatalog.classList.remove("body-hidden-search");
  }
});

// Аналогичные товары
(function() {
  function adjustAnalogParamHeights() {
    const currentCard = document.querySelector('.analog-card.analog-current');
    const otherCards = document.querySelectorAll('.analog-card:not(.analog-current)');
  
    if (!currentCard || otherCards.length === 0) return;
  
    const currentParams = currentCard.querySelectorAll('.analog-param');
  
    currentParams.forEach((param, index) => {
      const height = param.getBoundingClientRect().height;
      
      otherCards.forEach(card => {
        const correspondingParam = card.querySelectorAll('.analog-param')[index];
        if (correspondingParam) {
          correspondingParam.style.height = `${height}px`;
        }
      });
    });
  }
  
  // Вызываем функцию при загрузке страницы
  window.addEventListener('load', adjustAnalogParamHeights);
  
  // Вызываем функцию при изменении размера окна
  window.addEventListener('resize', adjustAnalogParamHeights);
})();

// фиксированная плашка "узнать цену"
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    const stickyTrigger = document.querySelector('.sticky-trigger');
    const stickyBottom = document.querySelector('.sticky-bottom');
    const header = document.querySelector('.header .main');
    const middle = document.querySelector('.middle');

    if(!stickyTrigger || !stickyBottom || !header || !middle) return
    
    let stickyTriggerRect, headerRect, middleRect;
    let stickyBottomOriginalTop = stickyBottom.offsetTop;
    let isSticky = false;

    function updateSticky() {
      console.log(123)
        stickyTriggerRect = stickyTrigger.getBoundingClientRect();
        headerRect = header.getBoundingClientRect();
        middleRect = middle.getBoundingClientRect();

        const shouldStick = stickyTriggerRect.bottom <= headerRect.bottom &&
                            middleRect.bottom > window.innerHeight;

        if (shouldStick && !isSticky) {
            stickyBottom.classList.add('fixed-bottom');
            isSticky = true;
        } else if ((!shouldStick || middleRect.bottom <= window.innerHeight) && isSticky) {
            stickyBottom.classList.remove('fixed-bottom');
            isSticky = false;
        }

        // Проверяем, не выходит ли sticky-bottom за пределы middle
        if (isSticky) {
            const stickyBottomRect = stickyBottom.getBoundingClientRect();
            if (stickyBottomRect.top <= middleRect.top) {
                stickyBottom.style.position = 'absolute';
                stickyBottom.style.bottom = '';
                stickyBottom.style.top = '0';
            }
        }
    }

    window.addEventListener('scroll', updateSticky);
    window.addEventListener('resize', updateSticky);
    updateSticky();
  });
})();

// скрытие/раскрытие примеров на странице аудита пневмосистемы
(function() {
  const moreButton = document.querySelector('.audit-examples-more');
  const cards = document.querySelectorAll('.audit-examples-slide');
  const parentSlides = document.querySelectorAll('.swiper-slide');

  if (!moreButton || cards.length === 0 || parentSlides.length === 0) return;

  function updateVisibility() {
    const isMobile = window.innerWidth < 576;

    cards.forEach((card, index) => {
      const parent = card.closest('.swiper-slide');
      if (index !== 0) {
        card.style.display = isMobile ? 'none' : 'block';
        if (parent) {
          parent.style.margin = isMobile ? '0' : '';
          parent.style.padding = isMobile ? '0' : '';
        }
      }
    });

    moreButton.textContent = isMobile ? 'Показать больше' : 'Скрыть';
  }

  // Изначально показываем только первую карточку
  updateVisibility();

  moreButton.addEventListener('click', () => {
    const isExpanded = moreButton.textContent === 'Скрыть';

    cards.forEach((card, index) => {
      if (index !== 0) {
        card.style.display = isExpanded ? 'none' : 'block';
        const parent = card.closest('.swiper-slide');
        if (parent) {
          parent.style.margin = isExpanded ? '0' : '';
          parent.style.padding = isExpanded ? '0' : '';
        }
      }
    });

    moreButton.textContent = isExpanded ? 'Показать больше' : 'Скрыть';
  });

  // Обновляем видимость при изменении размера окна
  window.addEventListener('resize', updateVisibility);
})();

// Переносы знаков равенства в формулах
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    const formulaBlocks = document.querySelectorAll('.formula-block');

    if(!formulaBlocks.length) return;

    function updateFirstInRowClass() {
      // Сбрасываем значения для первого элемента при каждом вызове функции
      let prevFirstElementHeight = formulaBlocks[0].offsetHeight;
      let prevFirstElementY = formulaBlocks[0].offsetTop;

      formulaBlocks.forEach((block, index) => {
        const currentTop = block.offsetTop;
        const currentHeight = block.offsetHeight;

        // Сначала удаляем класс со всех элементов
        block.classList.remove('first-in-row');

        // Если это первый элемент или текущая позиция Y плюс высота текущего элемента
        // больше, чем предыдущая позиция Y, значит мы перешли на новую строку
        if (index === 0 || currentTop + currentHeight > prevFirstElementY + prevFirstElementHeight) {
          block.classList.add('first-in-row');
          // Обновляем высоту и позицию Y первого элемента в новой строке
          prevFirstElementHeight = currentHeight;
          prevFirstElementY = currentTop;
        }
      });
    }

    // Вызываем функцию при первичной загрузке страницы
    updateFirstInRowClass();

    // Добавляем небольшую задержку перед вызовом функции при изменении размера окна
    let resizeTimer;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateFirstInRowClass, 250);
    });
  });
})();

// работы нашего сервиса. Показать еще
(function() {
  const items = document.querySelectorAll('.work-slider-swiper .work-slider-swiper-slide');
  const moreBtn = document.querySelector('.work-slider-more');
  
  if (!items.length || !moreBtn) return;

  // Функция для управления отображением карточек
  function manageSliderVisibility() {  
    const isMobile = window.innerWidth <= 599;

    if (isMobile) {
      // Изначально показываем только первую карточку
      for (let i = 1; i < items.length; i++) {
        items[i].classList.add('hidden');
      }

      // Текущий индекс отображаемых карточек
      let currentVisibleIndex = 1;

      // Очищаем предыдущий обработчик, если он был
      moreBtn.removeEventListener('click', clickHandler);

      // Создаем новый обработчик
      function clickHandler() {
        // Находим следующую скрытую карточку
        const nextHiddenItem = Array.from(items).find((item, index) => 
          index > currentVisibleIndex - 1 && item.classList.contains('hidden')
        );

        if (nextHiddenItem) {
          // Показываем следующую карточку
          nextHiddenItem.classList.remove('hidden');
          currentVisibleIndex++;

          // Проверяем, все ли карточки показаны
          const allVisibleCount = Array.from(items).filter(item => !item.classList.contains('hidden')).length;
          
          if (allVisibleCount === items.length) {            
            moreBtn.textContent = 'Скрыть';
          }
        } else { 
          for (let i = 1; i < items.length; i++) {
            items[i].classList.add('hidden');
          }          

          moreBtn.textContent = 'Показать еще';          

          currentVisibleIndex = 1;
        }
      }

      moreBtn.addEventListener('click', clickHandler);

      // Показываем кнопку
      moreBtn.style.display = 'block';
    } else {
      // На больших экранах показываем все карточки и скрываем кнопку
      items.forEach(item => item.classList.remove('hidden'));
      moreBtn.style.display = 'none';
    }
  }

  manageSliderVisibility();
  window.addEventListener('resize', manageSliderVisibility);
})();

(function ($) {
  $(document).ready(function() {
    // Клонирование табов с добавлением префикса Mob
    const $cardTabs = $('.card-more-info .card-tabs');
    const $cardMoreResp = $('.card-more-resp');

    if ($cardTabs.length && $cardMoreResp.length) {
      // Удаляем предыдущий клон, если он есть
      $cardMoreResp.find('.card-tabs').remove();

      // Клонируем и добавляем в .card-more-resp
      const $clonedTabs = $cardTabs.clone();
      $cardMoreResp.append($clonedTabs);

      // Модифицируем href и id в клонированных элементах
      $clonedTabs.find('.card-tabs-link').each(function() {
        const originalHref = $(this).attr('href'); // Например, #tab1
        const newHref = '#Mob' + originalHref.substring(1); // #Mobtab1
        $(this).attr('href', newHref);
      });

      $clonedTabs.find('.card-tabs-tab').each(function() {
        const originalId = $(this).attr('id'); // Например, tab1
        const newId = 'Mob' + originalId; // Mobtab1
        $(this).attr('id', newId);
      });

      // Находим все табы и ссылки в .card-more-resp
      const $tabs = $clonedTabs.find('.card-tabs-tab');
      const $tabLinks = $clonedTabs.find('.card-tabs-link');

      // Скрываем все табы изначально
      $tabs.css({
        'display': 'none',
        'opacity': '0'
      });

      // Показываем первый таб с анимацией
      if ($tabLinks.length > 0) {
        const $firstLink = $tabLinks.first();
        const firstTabId = $firstLink.attr('href').substring(1); // Убираем #, получаем Mobtab1
        $firstLink.addClass('selected');
        $(`#${firstTabId}`).css({ 'display': 'block' }).animate({ 'opacity': '1' }, 10); // Плавное появление
      }

      // Обработчик клика по ссылкам табов
      $tabLinks.on('click', function(e) {
        e.preventDefault();

        // Получаем текущий таб и его ID
        const $this = $(this);
        const tabId = $this.attr('href').substring(1); // Например, Mobtab1
        const $targetTab = $(`#${tabId}`);

        // Если таб уже активен, ничего не делаем
        if ($this.hasClass('selected')) return;

        // Скрываем все табы с анимацией
        $tabs.not($targetTab).css({ 'display': 'block' }).animate({ 'opacity': '0' }, 10, function() {
          $(this).css({ 'display': 'none' });
        });

        // Убираем класс selected у всех ссылок
        $tabLinks.removeClass('selected');

        // Показываем выбранный таб с анимацией
        $this.addClass('selected');
        $targetTab.css({ 'display': 'block' }).animate({ 'opacity': '1' }, 10);
      });
    }
  });
})(jQuery);

(function () {
  /**
   * Плавный скролл к элементу с указанным id
   * @param {Event} event - Событие клика
   */
  function smoothScroll(event) {
    const targetId = this.getAttribute('href');

    if (targetId.length > 1) {
      event.preventDefault();

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }
  }

  const scrollLinks = document.querySelectorAll('a[href^="#"]');

  scrollLinks.forEach(link => {
    link.addEventListener('click', smoothScroll);
  });
})();

// сворачивание и разворачивание контструктора товара
(function () {
  const triggers = document.querySelectorAll('.card-features-trigger');

  document.querySelectorAll('.card-features-content').forEach(content => {
    content.style.maxHeight = '0px'; // Контент скрыт
    const card = content.closest('.card-block');
    const title = card.querySelector('.card-features-title:not(.simple)');
    if (title) {
      title.style.marginBottom = '0';
    }
  });

  triggers.forEach(trigger => {
    if (trigger.classList.contains('card-features-trigger__text')) {
      const closeText = trigger.getAttribute('data-close') || 'Показать';
      trigger.firstChild.textContent = closeText.trim() + ' ';
    }

    trigger.addEventListener('click', () => {
      const card = trigger.closest('.card-block');
      const content = card.querySelector('.card-features-content');
      const title = card.querySelector('.card-features-title:not(.simple)');

      card.classList.toggle('active');

      if (trigger.classList.contains('card-features-trigger__text')) {
        const openText = trigger.getAttribute('data-open') || 'Скрыть';
        const closeText = trigger.getAttribute('data-close') || 'Показать';
        if (card.classList.contains('active')) {
          trigger.firstChild.textContent = openText.trim() + ' ';
        } else {
          trigger.firstChild.textContent = closeText.trim() + ' ';
        }
      }

      if (content.style.maxHeight && content.style.maxHeight !== '0px') {
        content.style.maxHeight = '0px';
        setTimeout(() => {
          if (!card.classList.contains('active')) {
            title.style.marginBottom = '0';
          }
        }, 300);
      } else {
        content.style.maxHeight = content.scrollHeight + 'px';
        title.style.marginBottom = '';
      }
    });
  });
})();