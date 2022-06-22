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
$(document).on("change", ".card-counter-input", function (e) {
  let val = parseInt($(this).val(), 10);
  if (val < 0) {
    $(this).val(0);
  }
});
$(document).on("click", ".product-item-like", function () {
  if ($(this).hasClass("like-select")) {
    $(this).removeClass("like-select");
  } else {
    $(this).addClass("like-select");
  }
});
// $(document).on("click", ".product-item-installments ", function () {
//   if (document.documentElement.clientWidth <= 1024) {
//     var a = $(this);
//     $.magnificPopup.open({
//       items: { src: a.attr("data-href") },
//       type: "ajax",
//       overflowY: "scroll",
//       removalDelay: 610,
//       mainClass: "my-mfp-zoom-in",
//       ajax: {
//         tError: "Error. Not valid url",
//       },
//       callbacks: {
//         open: function () {
//           setTimeout(function () {
//             $(".mfp-wrap, .mfp-bg").addClass("delay-back");
//             $(".mfp-popup").addClass("delay-back");
//           }, 700);
//         },
//       },
//     });
//   }
//   return false;
// });
// $(document).on("click", ".product-item-open", function () {
//   // сделать переменную  $(this).closest
//   if (document.documentElement.clientWidth > 1024) {
//     if ($(this).closest(".product-item").hasClass("product-open")) {
//       $(this).closest(".product-item").removeClass("product-open");
//     } else {
//       $(this).closest(".product-item").addClass("product-open");
//     }
//   } else {
//     var a = $(this);
//     $.magnificPopup.open({
//       items: { src: a.attr("data-href") },
//       type: "ajax",
//       overflowY: "scroll",
//       removalDelay: 610,
//       mainClass: "my-mfp-zoom-in",
//       ajax: {
//         tError: "Error. Not valid url",
//       },
//       callbacks: {
//         open: function () {
//           setTimeout(function () {
//             $(".mfp-wrap, .mfp-bg").addClass("delay-back");
//             $(".mfp-popup").addClass("delay-back");
//           }, 700);
//         },
//       },
//     });
//   }
// });
//уменьшаем значение

// const productSliderMarkUp = $(".slider-preferably")
//   .clone()
//   .removeClass("slider-adaptive-none");

// // let enableSwiper = undefined;
// if (matchMedia) {
//   var screen768 = window.matchMedia("(max-width:1024px)");
//   screen768.addListener(changes);
//   changes(screen768);
// }
// function changes(screen768) {
//   if (screen768.matches) {
//     $(".product-swiper-mob").append(productSliderMarkUp);
//   } else {
//     $(".product-swiper-desc").append(productSliderMarkUp);

//     new Swiper(".product-swiper-desc .product-swiper ", {
//       slidesPerView: 4,
//       // Navigation arrows
//       navigation: {
//         nextEl: ".swiper-button-next",
//         prevEl: ".swiper-button-prev",
//       },
//       spaceBetween: 24,
//       breakpoints: {
//         1024: {
//           slidesPerView: 3,
//           spaceBetween: 16,
//         },
//         1110: {
//           slidesPerView: 4,
//           // spaceBetween: 16,
//         },
//       },
//     });
//   }
// }

const productSliderMarkUppreferably = $(".slider-preferably")
  .clone()
  .removeClass("slider-adaptive-none slider-preferably");

//оборачиваем исходную разметку дивом, будем использовать для адаптива как нативный скролл
$(".slider-preferably").wrap(
  '<div class="product-swiper-mob-preferably"></div>'
);

//вставляем копию разметки и навешиваем свайпер для десктопа
$(".product-swiper-desc-preferably").append(productSliderMarkUppreferably);

new Swiper(".product-swiper-desc-preferably .product-swiper", {
  slidesPerView: 4,
  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  spaceBetween: 8,
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
////////////////////////////////////////////////////////////////////////слайдер
// const productSliderMarkUpInterest = $(".slider-interest")
//   .clone()
//   .removeClass("slider-adaptive-none");
// $(".product-swiper-mob-interest").append(productSliderMarkUpInterest);

// $(".product-swiper-desc-interest").append(productSliderMarkUpInterest);

// new Swiper(".product-swiper-desc-interest .product-swiper ", {
//   slidesPerView: 4,
//   // Navigation arrows
//   navigation: {
//     nextEl: ".swiper-button-next",
//     prevEl: ".swiper-button-prev",
//   },
//   spaceBetween: 24,
//   breakpoints: {
//     1024: {
//       slidesPerView: 3,
//       spaceBetween: 16,
//     },
//     1110: {
//       slidesPerView: 4,
//       // spaceBetween: 16,
//     },
//   },
// });
function qwe() {
  const productSliderMarkUpitem = $(".slider-interest")
    .clone()
    .removeClass("slider-adaptive-none slider-interest");

  //оборачиваем исходную разметку дивом, будем использовать для адаптива как нативный скролл
  $(".slider-interest").wrap('<div class="product-swiper-mob-interest"></div>');

  //вставляем копию разметки и навешиваем свайпер для десктопа
  $(".product-swiper-desc-interest").append(productSliderMarkUpitem);

  new Swiper(".product-swiper-desc-interest .product-swiper", {
    slidesPerView: 4,
    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    spaceBetween: 8,
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
qwe();


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


$(document).ready(function () {
  $("select").styler();
});


if (matchMedia) {
  let removeHover23 = window.matchMedia("(max-width:1025px)");
  removeHover23.addListener(removeHover);
  removeHover(removeHover23);
}

function removeHover(removeHover23) {
  if (removeHover23.matches) {
    $(".product-item").removeClass("product-hover");
  } else {
    $(".product-item").addClass("product-hover");
  }
}
