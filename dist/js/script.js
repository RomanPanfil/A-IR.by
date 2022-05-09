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
    $(".catalog_link").appendTo($('.catalog-articles'))
    $(".video_link").appendTo($('.catalog-video'))
    $(".feedback_link").appendTo($('.catalog-brands'))
  } else {
    $(".catalog_link").appendTo($('.catalog-articles-title'))
    $(".video_link").appendTo($('.video_wrap'))
    $(".feedback_link").appendTo($('.feedback-brands-header'))
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

// Sticker hidden catalog.html
if (document.querySelector(".sticker-hide")) {
  let stickerHideBtn = document.querySelector(".sticker-hide"),
    stickerHiden = document.querySelectorAll(".sticker-hidden"),
    catalogText = document.querySelector(".catalog-stickers-btn-text"),
    imgChange = document.querySelector(".img-change");

    // console.log(stickerHiden)

    stickerHideBtn.onclick = () => {
      stickerHiden.forEach((e) => {
        e.classList.toggle("sticker-hidden-open");
      })
    // stickerHiden.

    if (catalogText.innerHTML === "Скрыть") {
      catalogText.innerHTML = "Ещё подборки";
      imgChange.src = "./images/icons/green-cross.svg";
    } else {
      catalogText.innerHTML = "Скрыть";
      imgChange.src = "./images/icons/red-cross.svg";
    }
  };
}

// Input range

// checkbox hide on click

if (document.querySelector(".catalog-products-field-btn")) {
  let checkboxBtn = document.querySelector(".catalog-products-field-btn"),
    catalogbtnText = document.querySelector(".catalog-products-field-text"),
    catalogbtnImg = document.querySelector(".catalog-products-field-img img"),
    checkboxHiden = document.querySelectorAll(".checkbox-hide");
 

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
}

// Validation for catalog email input

$(document).ready(function () {
  $(".catalog-search-form").validate({
    errorElement: "span",
    rules: {
      email: {
        email: true,
      },
    },
    messages: {
      email: {
        email: "Пожалуйста, введите корректный Email",
      },
    },
  });
});

// ion range input
$(".slider-wrapper").each(function () {
  var $range = $(".js-range-slider", this),
    $inputFrom = $(".js-input-from", this),
    $inputTo = $(".js-input-to", this),
    instance,
    min_1 = $inputFrom[0].dataset.min,
    max_1 = $inputTo[0].dataset.max,
    from_1 = $inputFrom[0].dataset.min,
    to_1 = $inputTo[0].dataset.max,
    steps = $range[0].dataset.steps;

  $range.ionRangeSlider({
    skin: "round",
    type: "double",
    min: min_1,
    max: max_1,
    from: from_1,
    to: to_1,
    step: steps,
    onStart: updateInputs,
    onChange: updateInputs,
  });

  instance = $range.data("ionRangeSlider");

  function updateInputs(data) {
    from = data.from;
    to = data.to;

    $inputFrom.prop("value", from);
    $inputTo.prop("value", to);
  }

  $inputFrom.on("input", function () {
    var val = $(this).prop("value");

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
    var val = $(this).prop("value");

    // validate
    if (val < from) {
      val = from;
    } else if (val > max) {
      val = max;
    }

    instance.update({
      to: val,
    });
  });
});

// catalog-info-btn
if (document.querySelector(".sticker-info-hide")) {
  let stickerHideBtnInfo = document.querySelector(".sticker-info-hide"),
    stickerHidenInfo = document.querySelectorAll(".catalog-info-list-hidden"),
    catalogTextInfo = document.querySelector(".catalog-info-btn-text"),
    imgChangeInfo = document.querySelector(".catalog-info-img");

  stickerHideBtnInfo.onclick = () => {
    stickerHidenInfo.forEach((element) => {
      element.classList.toggle("sticker-hidden-open-info");
    });
    // stickerHidenInfo.classList.toggle("sticker-hidden-open-info");

    if (catalogTextInfo.innerHTML === "Скрыть") {
      catalogTextInfo.innerHTML = "Ещё подборки";
      imgChangeInfo.src = "./images/icons/green-cross.svg";
    } else {
      catalogTextInfo.innerHTML = "Скрыть";
      imgChangeInfo.src = "./images/icons/red-cross.svg";
    }
  };

  $(document).on("click", ".catalog-question-item-title", function (e) {
    $(this)
      .closest(".catalog-question-item")
      .toggleClass("catalog-question-toggle");
  });
}


if(document.getElementById('card-breackpoint')) {
  $(document).ready(function () {
    let cardBreackpoint = $("#card-breackpoint").offset().top;
    let cardSticky = $(".card-sticky");
    let headerCard = $(".header");
  
  
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
  });
  
}





