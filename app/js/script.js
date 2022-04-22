let arrow = document.querySelector(".main-contacts-tel-arrow");
let numbers = document.querySelector(".main-contacts-tel-numbers");
arrow.addEventListener("click", function () {
  if (numbers.classList.contains("numbers-open")) {
    numbers.classList.toggle("numbers-open");
  } else {
    numbers.classList.add("numbers-open");
  }
});

// Footer change media
if (matchMedia) {
  var screen1170 = window.matchMedia("(max-width:1170px)");
  screen1170.addListener(changes);
  changes(screen1170);

  var screen768 = window.matchMedia("(max-width:768px)");
  screen768.addListener(changes768);
  changes768(screen768);
}

function changes(screen1170) {
  if (screen1170.matches) {
    $(".footer-bottom-links").appendTo($(".footer-top-contact"));
    $(".footer-top-wrapper").appendTo($(".footer-top-info"));
    $(".footer-top-services").appendTo($(".footer-top-about"));
    $(".footer-top-resource").appendTo($(".footer-bootom-media-links"));
    $(".footer-bottom-info").appendTo($(".footer-bootom-media-links"));
    $(".footer-bottom-reit").appendTo($(".footer-bottom-socials-wrapper"));
    // $('.col-f-phones').prependTo($('.footer__top > .row'))
  } else {
    $(".footer-bottom-links").appendTo($(".footer-bootom-media-links"));
    $(".footer-top-services").appendTo($(".footer-top-services-wrapper"));
    $(".footer-top-wrapper").appendTo($(".footer-top-about"));
    $(".footer-top-resource").appendTo($(".footer-top-resource-container"));
    $(".footer-bottom-info").appendTo($(".footer-bottom-info-wrapper"));
    $(".footer-bottom-reit").appendTo($(".footer-bottom-reit-wrapper"));
    // $(".footer__top .col-f-phones").insertAfter(
    //   $(".footer__bottom .col-f-wide")
    // );
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
// Sticker hidden catalog.html

let stickerHideBtn = document.querySelector(".sticker-hide"),
  stickerHiden = document.querySelector(".sticker-hidden"),
  catalogText = document.querySelector(".catalog-stickers-btn-text"),
  imgChange = document.querySelector(".img-change");
// imgChange.src = "./images/icons/red-cross.svg";

stickerHideBtn.onclick = () => {
  stickerHiden.classList.toggle("sticker-hidden-open");

  if (catalogText.innerHTML === "Скрыть") {
    catalogText.innerHTML = "Ещё подборки";
    imgChange.src = "./images/icons/green-cross.svg";
  } else {
    catalogText.innerHTML = "Скрыть";
    imgChange.src = "./images/icons/red-cross.svg";
  }
};

// Input range

const rangeInput = document.querySelectorAll(
    ".catalog-products-range-input input"
  ),
  priceInput = document.querySelectorAll(".catalog-products-price-input input"),
  range = document.querySelector(".catalog-products-slider .progress");
let priceGap = 100000;
priceInput.forEach((input) => {
  input.addEventListener("input", (e) => {
    let minPrice = parseInt(priceInput[0].value),
      maxPrice = parseInt(priceInput[1].value);

    if (maxPrice - minPrice >= priceGap && maxPrice <= rangeInput[1].max) {
      if (e.target.className === "input-min") {
        rangeInput[0].value = minPrice;
        range.style.left = (minPrice / rangeInput[0].max) * 100 + "%";
      } else {
        rangeInput[1].value = maxPrice;
        range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
      }
    }
  });
});

rangeInput.forEach((input) => {
  input.addEventListener("input", (e) => {
    let minVal = parseInt(rangeInput[0].value),
      maxVal = parseInt(rangeInput[1].value);
    if (maxVal - minVal < priceGap) {
      if (e.target.className === "range-min") {
        rangeInput[0].value = maxVal - priceGap;
      } else {
        rangeInput[1].value = minVal + priceGap;
      }
    } else {
      priceInput[0].value = minVal;
      priceInput[1].value = maxVal;
      range.style.left = (minVal / rangeInput[0].max) * 100 + "%";
      range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
    }
  });
});

// checkbox hide on click

let checkboxBtn = document.querySelector(".catalog-products-field-btn"),
  catalogbtnText = document.querySelector(".catalog-products-field-text"),
  catalogbtnImg = document.querySelector(".catalog-products-field-img img"),
  checkboxHiden = document.querySelectorAll(".checkbox-hide");
console.log(catalogbtnImg.src);
checkboxBtn.onclick = () => {
  if (catalogbtnText.innerHTML === "Показать еще 4") {
    catalogbtnText.innerHTML = "Скрыть";
    catalogbtnImg.src = "./images/icons/red-cross.svg";
  } else {
    catalogbtnText.innerHTML = "Показать еще 4";
    catalogbtnImg.src = "./images/icons/green-cross.svg";
  }
  checkboxHiden.forEach((el) => {
    el.classList.toggle("checkbox-on");
  });
};
