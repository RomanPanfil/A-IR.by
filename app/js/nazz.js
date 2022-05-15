// counter
$(document).on("click", ".btn-plus", function () {
  var thisInput = $(this).prev("input"),
    thisInputVal = parseInt(thisInput.val(), 10);

  if (isNaN(thisInputVal)) {
    thisInput.val(1);
  } else {
    thisInput.val(parseInt(thisInput.val(), 10) + 1);
  }
});
$(document).on("click", ".product-item-installments ", function () {
  if (document.documentElement.clientWidth <= 1024) {
    var a = $(this);
    $.magnificPopup.open({
      items: { src: a.attr("data-href") },
      type: "ajax",
      overflowY: "scroll",
      removalDelay: 610,
      mainClass: "my-mfp-zoom-in",
      ajax: {
        tError: "Error. Not valid url",
      },
      callbacks: {
        open: function () {
          setTimeout(function () {
            $(".mfp-wrap, .mfp-bg").addClass("delay-back");
            $(".mfp-popup").addClass("delay-back");
          }, 700);
        },
      },
    });
  }
  return false;
});
$(document).on("click", ".product-item-open", function () {
  // сделать переменную  $(this).closest
  if (document.documentElement.clientWidth > 1024) {
    if ($(this).closest(".product-item").hasClass("product-open")) {
      $(this).closest(".product-item").removeClass("product-open");
    } else {
      $(this).closest(".product-item").addClass("product-open");
    }
  } else {
    var a = $(this);
    $.magnificPopup.open({
      items: { src: a.attr("data-href") },
      type: "ajax",
      overflowY: "scroll",
      removalDelay: 610,
      mainClass: "my-mfp-zoom-in",
      ajax: {
        tError: "Error. Not valid url",
      },
      callbacks: {
        open: function () {
          setTimeout(function () {
            $(".mfp-wrap, .mfp-bg").addClass("delay-back");
            $(".mfp-popup").addClass("delay-back");
          }, 700);
        },
      },
    });
  }
});
//уменьшаем значение
$(document).on("click", ".btn-minus", function () {
  var thisInput = $(this).next("input"),
    thisInputVal = parseInt(thisInput.val(), 10);

  if (isNaN(thisInputVal)) {
    thisInput.val(0);
  } else {
    if (thisInputVal < 2) {
      thisInput.val(1);
    } else {
      thisInput.val(parseInt(thisInput.val(), 10) - 1);
    }
  }
});
$(document).on("change", ".card-item-counter-input", function (e) {
  let val = parseInt($(this).val(), 10);
  if (val < 0) {
    $(this).val(0);
  }
});

const productSliderMarkUp = $(".slider-preferably")
  .clone()
  .removeClass("slider-adaptive-none");

// let enableSwiper = undefined;
if (matchMedia) {
  var screen768 = window.matchMedia("(max-width:1024px)");
  screen768.addListener(changes);
  changes(screen768);
}
function changes(screen768) {
  if (screen768.matches) {
    $(".product-swiper-mob").append(productSliderMarkUp);
  } else {
    $(".product-swiper-desc").append(productSliderMarkUp);

    new Swiper(".product-swiper-desc .product-swiper ", {
      slidesPerView: 4,
      // Navigation arrows
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      spaceBetween: 24,
      breakpoints: {
        1024: {
          slidesPerView: 3,
          spaceBetween: 16,
        },
        1110: {
          slidesPerView: 4,
          // spaceBetween: 16,
        },
      },
    });
  }
}

// if (matchMedia) {
//   // var screen768 = window.matchMedia("(max-width:1024px)");
//   screen768.addListener(changes2);
//   changes2(screen768);
// }
// function changes2(screen768) {

//   if (screen768.matches) {
//     // $(".product-swiper-mob").append(productSliderMarkUp);
//   } else {
//     // $(".product-swiper-desc").append(productSliderMarkUp);
//   }
// }
const productSliderMarkUpInterest = $(".slider-interest")
  .clone()
  .removeClass("slider-adaptive-none");
$(".product-swiper-mob-interest").append(productSliderMarkUpInterest);

$(".product-swiper-desc-interest").append(productSliderMarkUpInterest);

new Swiper(".product-swiper-desc-interest .product-swiper ", {
  slidesPerView: 4,
  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  spaceBetween: 24,
  breakpoints: {
    1024: {
      slidesPerView: 3,
      spaceBetween: 16,
    },
    1110: {
      slidesPerView: 4,
      // spaceBetween: 16,
    },
  },
});

// accordionChangesPop(screen1023);

// catalogLine.onclick = () => {
//   catalog.classList.add("catalog-products-line");
//   catalog.classList.remove("catalog-products-grid");
//   console.log("line");
//   // $(".product-price").appendTo($(".product-item"));
// };
// catalogGrid.onclick = () => {
//   catalog.classList.add("catalog-products-grid");
//   catalog.classList.remove("catalog-products-line");
//   console.log("grid");
//   // $(".product-price").appendTo($(".product-info"));
// };
// let qwe = document.querySelector(".features-disable");
// console.log(qwe);
// qwe.disabled = true;
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
  spaceBetween: 8,
  breakpoints: {
    1024: {
      slidesPerView: 4,
      spaceBetween: 8,
    },
  },
});
(function ($) {
  $(function () {
    $("select").styler();
  });
})(jQuery);
