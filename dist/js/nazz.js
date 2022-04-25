// let minusBtn = document.querySelector(".btn-minus");
// let plusBtn = document.querySelector(".btn-plus");
// let inputBtn = document.querySelector(".card-item-counter-input");
// let reg = /[^\d]/g;
// plusBtn.onclick = () => {
//   console.log("plus");
//   inputBtn.value++;
// };

// minusBtn.onclick = () => {
//   inputBtn.value == 1 ? false : inputBtn.value--;
// };

// inputBtn.oninput = function () {
//   this.value = this.value.replace(reg, "");
// };

// For Arina
// let productOpen = document.querySelectorAll(".product-item-open");
// let productItem = document.querySelector(".product-item");
// function kakNibud(e) {
//   // e.classList.toggle("product-open");
//   if (e.target.classList[0] === "product-item-open") {
//     productItem.classList.toggle("product-open");
//     // document.querySelector(".product-item-btn").innerHTML = "123";
//   }
// }
// productOpen.forEach((el) => {
//   el.addEventListener("click", kakNibud);
// });

const productSliderMarkUp = $(".product-swiper")
  .clone()
  .removeClass("slider-adaptive-none");
let enableSwiper = undefined;
if (matchMedia) {
  var screen768 = window.matchMedia("(max-width:1024px)");
  screen768.addListener(changes);
  changes(screen768);
}
function changes(screen768) {
  if (screen768.matches) {
    // $(".product-swiper-mob").append(productSliderMarkUp);
  } else {
    $(".product-swiper-desc").append(productSliderMarkUp);
    new Swiper(".product-swiper-desc .product-swiper", {
      // Optional parameters
      // loop: true,
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
          // spaceBetween: 16,
        },
        1300: {
          slidesPerView: 4,
          // spaceBetween: 16,
        },
      },
    });
  }
}
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

$(document).on("click", ".product-item-open", function (e) {
  // e.stopPropagation();
  let item = $(this).closest(".product-item").toggleClass("product-open");
});
