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
