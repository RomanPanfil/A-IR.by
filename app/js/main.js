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
      callback()
    }
  },

  scroller(selector) {
    const link = D.querySelectorAll(selector);
    if (!link.length) return

    link.forEach(el => {
      const target = D.querySelector(el.dataset.target)
      if (target) {
        el.addEventListener('click',(e)=> {
          e = e || window.event
          e.preventDefault()
          // target.scrollIntoView({
          //   behavior: "smooth"
          // });
          window.scrollTo({
            top: target.offsetTop,
            behavior: "smooth"
        });
        })
      }
    })
  }
}

$.fn.Tabs = function() {
  var selector = this;

  this.each(function() {
    var obj = $(this);
    $(obj.attr('href')).hide();
    $(obj).click(function() {
      $(selector).removeClass('selected');

      $(selector).each(function(i, element) {
        $($(element).attr('href')).hide();
      });

      $(this).addClass('selected');
      $($(this).attr('href')).fadeIn();
      return false;
    });
  });

  $(this).show();
  $(this).first().click();
  if(location.hash!='' && $('a[href="' + location.hash + '"]').length)
    $('a[href="' + location.hash + '"]').click();
};


//mobile tabs
(function () {
  if (!D.querySelector('.card-tabs-link')) return

  D
    .querySelectorAll('.card-tabs-link')
    .forEach(el => {
      const tab = D.querySelector(el.getAttribute('href'))
      if (tab) {
        const link = D.createElement('a')
        link.href = 'javascript:void(0)'
        link.className = 'card-tabs-link-mobile'
        link.textContent = el.textContent
        link.dataset.href = el.getAttribute('href')
        tab.before(link)
      }
    });

  D
    .querySelectorAll('.card-tabs-link-mobile')
    .forEach(el => el.addEventListener('click', function(e) {
      e = e || window.event;
      e.preventDefault();

      const tab = D.querySelector(this.dataset.href)

      this.classList.toggle('opened')
      tab.classList.toggle('opened')
    }));
})();


//card rebuild
(function() {
  if(matchMedia) {
    const screen = window.matchMedia('(max-width:1024px)');
    screen.addListener(changes);
    changes(screen);
  }
  function changes(screen) {
    if(screen.matches) {
      //экран менее 1024
      $('.card-more-mobile').prepend($('#tabs'))
      $('.card-more-mobile').after($('.card-contacts'))
      $('.col-card-right').append($('.card-services'))
      $(".deliverypay-items-matchmedia").appendTo($(".deliverypay-mathmedia"));

    } else {
      //экран более 1024
      $('.card-more-info').prepend($('#tabs'))
      $('.card-features').after($('.card-contacts'))
      $('.card-txt').append($('.card-services'))
      $('.deliverypay-wrapper-matchmedia').append($('.deliverypay-items-matchmedia'))

    }
  }
})();


//card carousels
(function() {
  if (!D.querySelector('.swiper-card-imgs')) return

  if (D.querySelectorAll('.card-imgs-link').length <= 1) {
    $('.swiper-card-imgs .card-imgs-arrow').remove()
    return false
  }

  const imgsClone = $('.swiper-card-imgs').clone().addClass('swiper-mobile-imgs').removeClass('swiper-card-imgs');
  imgsClone.find('.card-imgs-prev').addClass('mobile-imgs-prev').removeClass('card-imgs-prev')
  imgsClone.find('.card-imgs-next').addClass('mobile-imgs-next').removeClass('card-imgs-next')
  imgsClone.find('.card-imgs-link').addClass('mobile-imgs-link').removeClass('card-imgs-link mfp-link').removeAttr('data-href')
  imgsClone.find('.mobile-imgs-link').eq(0).addClass('active');

  $('.card-imgs').append(imgsClone)
  $('.swiper-mobile-imgs').wrap('<div class="mobile-imgs"></div>')

  const cardMini = new Swiper('.swiper-mobile-imgs',{
    slidesPerView: 3,
    // shortSwipes: false,
    spaceBetween: 10,
    navigation: {
      nextEl: ".mobile-imgs-next",
      prevEl: ".mobile-imgs-prev",
    },
    breakpoints: {
      841: {
        slidesPerView: 4
      }
    }
  })

  const cardSwiper = new Swiper('.swiper-card-imgs',{
    slidesPerView: 1,
    // shortSwipes: false,
    autoHeight: true,
    navigation: {
      nextEl: ".card-imgs-next",
      prevEl: ".card-imgs-prev",
    },
    pagination: {
      el: '.card-imgs-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      769: {
        pagination: false
      }
    }
  })

  $(document).on('click','.mobile-imgs-link',function(e) {
    e.preventDefault();

    const index = $(this).closest('.swiper-slide').index()
    cardSwiper.slideTo(index)
    $('.mobile-imgs-link').removeClass('active')
    $(this).addClass('active');
  })

  cardSwiper.on('slideChange',function(swiper){
    const index = swiper.realIndex
    cardMini.slideTo(index)
    $('.mobile-imgs-link').removeClass('active');
    $('.swiper-mobile-imgs .swiper-slide').eq(index).find('.mobile-imgs-link').addClass('active');
  })
})();



const changeCatalogStyle = (style) => {
  localStorage.setItem('catalogStyle', style);
  document.querySelector('#catalog').dataset.style = style
  document.querySelectorAll('.catalog-style-toggler').forEach(el => {
    el.classList.remove('active')
    if (el.dataset.style && el.dataset.style === style) {
      el.classList.add('active')
    }
  })
}

(function(){
  if (!document.querySelector('.catalog-style-toggler')) return;

  document.querySelectorAll('.catalog-style-toggler')
    .forEach(el => {
      el.addEventListener('click', function(e) {
        e = e || window.event
        e.preventDefault();

        const style = this.dataset.style || 'grid'
        changeCatalogStyle(style)
      })
    });

  if (localStorage.getItem('catalogStyle')) {
    changeCatalogStyle(localStorage.getItem('catalogStyle'))
  }
})();



(function (){
  if (!$('#catalog_search').length) return;

  let catalogProductsSearch = $('#catalog_search');
  let catalogProductsReniev = $('.catalog-products-reniev')
  let cardReview = $('#card_review').offset().top;
  let catalogSerachOffset = catalogProductsSearch.offset().top

  window.addEventListener('scroll',function() {
    if(window.scrollY > catalogSerachOffset && window.scrollY < cardReview) {
      catalogProductsReniev.addClass('catalog-search-open')
    }else {
      catalogProductsReniev.removeClass('catalog-search-open')
    }
  })
})();


// counter
$(document).on("click", ".btn-plus", function () {
  let input = $(this).prev("input"),
      minus = input.prev('.btn-minus'),
      val = parseInt(input.val(), 10);

  if (isNaN(val)) { return input.val(1); }

  input.val(++val);
  if (val > 1) {
    minus.removeClass('disabled');
  }
});
$(document).on("click", ".btn-minus", function (e) {
  e.preventDefault();
  let thisInput = $(this).next("input"),
    val = parseInt(thisInput.val(), 10);

  if (isNaN(val)) {
    $(this).addClass('disabled');
    return thisInput.val(1);
  }

  if (val <= 2) {
    $(this).addClass('disabled');
    return thisInput.val(1);
  }

  thisInput.val(--val)
});


$(document).on("change", ".card-counter-input", function (e) {
  let val = parseInt($(this).val(), 10),
      minus = $(this).prev('.btn-minus');
  if (val < 0) {
    $(this).val(0);
  }
  if (val !== 1) {
    minus.removeClass('disabled');
  } else {
    minus.addClass('disabled');
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




(function(){
  let arrows = document.querySelectorAll(".main-contacts-tel-arrow, .mob-menu-phone");
  let numbers = document.querySelector(".main-contacts-drop");
  if (!arrows.length || !numbers) return

  arrows.forEach(el => {
    el.addEventListener("click", function (e) {
      e = e || window.event
      e.preventDefault()
      this.classList.toggle("opened");
      numbers.classList.toggle("numbers-open");
    })
  });


  document.addEventListener('click', (e) => {
    const withinBoundaries = e.composedPath().includes(numbers);
    const isArrow = e.composedPath().includes(document.querySelector(".main-contacts-tel-arrow"));
    const isMob = e.composedPath().includes(document.querySelector(".mob-menu-phone"));

    if ( !withinBoundaries && !isArrow && !isMob) {
      numbers.classList.remove("numbers-open");
      document.querySelector(".main-contacts-tel-arrow").classList.remove('opened')
      document.querySelector(".mob-menu-phone").classList.remove('opened')
    }
  })
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
      // console.log(footerBreackpoint)
      // console.log(window.scrollY)
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

if (document.querySelector(".making-order-validate")) {
  // let cardBreackpoint = $("#card-breackpoint").offset().top;
  // var offBottom = $("#card-breackpoint").offset().top + $("#card-breackpoint").outerHeight();
  // let cardSticky = $(".making-order-info");
  // const cardHeight = cardSticky.innerHeight();
  // const box = document.querySelector('#card-breackpoint').getBoundingClientRect()
  // const stickyBox = document.querySelector('.making-order-info').getBoundingClientRect()

  // window.addEventListener("resize", function () {
  //   cardBreackpoint = $("#card-breackpoint").offset().top;
  // });
  const stickyBlock = document.querySelector('.making-order-info')
  const card = document.querySelector('#card-breackpoint')

  function flipOrSticky() {
    const box = card.getBoundingClientRect()
    const stickyBox = stickyBlock.getBoundingClientRect()
    const boxTop = box.top
    const boxBottom = box.bottom
    const stickyBottom = stickyBox.height
    const py = window.pageYOffset

    if (py > boxTop + py) {
      if (py < (boxBottom + py - stickyBottom - 100)) {
        stickyBlock.classList.add("sticky-box");
        stickyBlock.classList.remove("card-breackpoint-flipbottom");
      } else {
        stickyBlock.classList.remove("sticky-box");
        stickyBlock.classList.add("card-breackpoint-flipbottom");
      }
    } else {
      stickyBlock.classList.remove("sticky-box", "card-breackpoint-flipbottom");
    }
    // if (py > boxTop + py && py < (boxBottom + py - stickyBottom - 185)) {
    //   stickyBlock.classList.add("card-breackpoint-open");
    // } else {
    //   stickyBlock.classList.remove("card-breackpoint-open");
    // }
  }

  window.addEventListener("scroll", flipOrSticky);
  window.addEventListener("load", flipOrSticky);
}


if (document.querySelector(".making-form") ) {
  const stickyBlock = document.querySelector('.cart-order')
  const card = document.querySelector('#card-breackpoint')

  function flipOrSticky() {
    const box = card.getBoundingClientRect()
    const stickyBox = stickyBlock.getBoundingClientRect()
    const boxTop = box.top
    const boxBottom = box.bottom
    const stickyBottom = stickyBox.height
    const py = window.pageYOffset

    if (py > boxTop + py) {
      if (py < (boxBottom + py - stickyBottom - 100)) {
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

let deliverypay = document.querySelector('.ui-rightbar')
if (document.querySelector('.ui-rightbar')) {
  const stickyBlock = document.querySelector('.ui-rightbar')
  const card = document.querySelector('#card-breackpoint')

  function flipOrSticky() {
    const box = card.getBoundingClientRect()
    const stickyBox = stickyBlock.getBoundingClientRect()
    const boxTop = box.top
    const boxBottom = box.bottom
    const stickyBottom = stickyBox.height
    const py = window.pageYOffset

    if (py > boxTop + py) {
      if (py < (boxBottom + py - stickyBottom - 100)) {
        stickyBlock.classList.add("ui-rightbar-sticky");
        stickyBlock.classList.remove("ui-rightbar-flipbottom");
      } else {
        stickyBlock.classList.remove("ui-rightbar-sticky");
        stickyBlock.classList.add("ui-rightbar-flipbottom");
      }
    } else {
      stickyBlock.classList.remove("ui-rightbar-sticky", "ui-rightbar-flipbottom");
    }
  }

  window.addEventListener("scroll", flipOrSticky);
  window.addEventListener("load", flipOrSticky);
}

(function (){
  if (!D.querySelector('.catalog-marks')) return;

  const wrapBtn =D.querySelector('.catalog-marks-toggler');
  const wrapSettings = D.querySelector('.catalog-marks-list')

  function resSetting() {
    const wrapSettingContainer = document.querySelector('.catalog-marks-height').clientHeight;

    if (wrapSettingContainer <= 80){
      wrapSettings.classList.add("opened");
      wrapBtn.classList.add('ui-hidden');
    }
    else {
      wrapSettings.classList.remove("opened");
      wrapBtn.classList.remove('ui-hidden');
    }
  }
  resSetting();
  window.addEventListener('resize', resSetting)
})();


(function (){
  if (!D.querySelector('.ux-collapsible-toggler')) return;

  D
    .querySelectorAll('.ux-collapsible-toggler')
    .forEach(el => {
      el.addEventListener('click',function(e) {
        e = e || window.event
        e.preventDefault()
        e.stopPropagation()

        const openTxt = this.dataset.open || 'Показать все'
        const closeTxt = this.dataset.close || 'Скрыть'
        const icon = this.querySelector('.ui-btn-icon')
        const txt = this.querySelector('.ui-btn-txt')
        const content = this.closest('.ux-collapsible').querySelector('.ux-collapsible-content')

        if (this.classList.contains('opened')) {
          txt.textContent = openTxt
          icon.classList.remove('ui-btn-icon-cancel')
          icon.classList.add('ui-btn-icon-plus')
          content.classList.remove('opened')
        } else {
          txt.textContent = closeTxt
          icon.classList.add('ui-btn-icon-cancel')
          icon.classList.remove('ui-btn-icon-plus')
          content.classList.add('opened')
        }

        this.classList.toggle('opened')
      })
    })
})();


(function (){
  if (!D.querySelector('.ui-spoiler')) return;

  D
    .querySelectorAll('.ui-spoiler-toggler')
    .forEach(el => {
      el.addEventListener('click',function(e) {
        e = e || window.event
        e.preventDefault()
        e.stopPropagation()

        const openTxt = this.dataset.open || 'Показать все'
        const closeTxt = this.dataset.close || 'Скрыть'
        const icon = this.querySelector('.ui-btn-icon')
        const txt = this.querySelector('.ui-btn-txt')
        const content = this.closest('.ui-spoiler').querySelector('.ui-spoiler-body')

        if (this.classList.contains('opened')) {
          txt.textContent = openTxt
          icon.classList.remove('ui-btn-icon-cancel')
          icon.classList.add('ui-btn-icon-plus')
          content.classList.remove('opened')
        } else {
          txt.textContent = closeTxt
          icon.classList.add('ui-btn-icon-cancel')
          icon.classList.remove('ui-btn-icon-plus')
          content.classList.add('opened')
        }

        this.classList.toggle('opened')
      })
    })
})();




(function () {
  if (!document.querySelector('.catalog-reviews-desktop')) return
  let slider = null, native = null;
  let servicesSwiper = document.querySelector('.services-swiper');
  let producentpgSwiper = document.querySelector('.producentpg-swiper');


  //desktop
  if(matchMedia) {
    var bp = window.matchMedia('(min-width:1024.02px)');
    bp.addListener(changes);
    changes(bp);
  }
  function changes(bp) {
    if(bp.matches && !slider && producentpgSwiper) {
      slider = new Swiper(".producentpg-swiper", {
        slidesPerView: 2,
        spaceBetween: 24,
        direction: "vertical",
        // autoHeight: true,
        // shortSwipes: false,
        navigation: {
          nextEl: ".producentpg-reviews-next",
          prevEl: ".producentpg-reviews-prev",
        }
      });
    }
    if(bp.matches && !slider && servicesSwiper) {
      slider = new Swiper(".services-swiper", {
        slidesPerView: 1,
        spaceBetween: 24,
        // shortSwipes: false,
        navigation: {
          nextEl: ".catalog-reviews-next",
          prevEl: ".catalog-reviews-prev",
        }
      });
    }
    if(bp.matches && !slider) {
      slider = new Swiper(".catalog-reviews", {
        slidesPerView: 2,
        spaceBetween: 24,
        // shortSwipes: false,
        navigation: {
          nextEl: ".catalog-reviews-next",
          prevEl: ".catalog-reviews-prev",
        }
      });
    }
    if (!bp.matches && !native && producentpgSwiper) {
      //mobile
      const clone = $('.catalog-reviews-desktop .producentpg-swiper').clone();
      $('.catalog-reviews-mobile .ui-scroller').prepend(clone)
      native = true
    }
    if (!bp.matches && !native && servicesSwiper) {
      //mobile
      const clone = $('.catalog-reviews-desktop .services-card').clone();
      $('.catalog-reviews-mobile .ui-scroller').prepend(clone)
      native = true
    }

    if (!bp.matches && !native) {
      //mobile
      const clone = $('.catalog-reviews-desktop .review-card').clone();
      $('.catalog-reviews-mobile .ui-scroller').prepend(clone)
      native = true
    }

  }
})();

(function () {
  if (!document.querySelector('.catalog-articles-desktop')) return;
  let sliderArticle = 'no';

  //mobile
  const clone = $('.catalog-articles-desktop .catalog-articles-item').clone();
  $('.catalog-articles-mobile .ui-scroller').prepend(clone)

  //desktop
  if(matchMedia) {
    var bp = window.matchMedia('(min-width:1024.02px)');
    bp.addListener(changes);
    changes(bp);
  }
  function changes(bp) {
    if(bp.matches && sliderArticle === 'no') {
      sliderArticle = new Swiper(".slider_article", {
        slidesPerView: 1,
        spaceBetween: 24,
        autoHeight: true,
        // shortSwipes: false,
        navigation: {
          nextEl: ".article-button-next",
          prevEl: ".article-button-prev",
        }
      });
    }
  }
})();

(function(){
  if (!document.querySelector('.catalog-related-desktop')) return
  let slider = null, native = null;

  //desktop
  if(matchMedia) {
    var bp = window.matchMedia('(min-width:1024.02px)');
    bp.addListener(changes);
    changes(bp);
  }
  function changes(bp) {
    if(bp.matches && !slider) {
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
        }
      });
    }
    if (!bp.matches && !native) {
      //mobile
      const clone = $('.catalog-related-desktop .slider-product').clone();
      $('.catalog-related-mobile .ui-scroller').prepend(clone)
      native = true
    }
  }
})();


(function(){
  if (!document.querySelector('.card-related-desktop')) return
  let slider = null, native = null;

  //desktop
  if(matchMedia) {
    var bp = window.matchMedia('(min-width:1024.02px)');
    bp.addListener(changes);
    changes(bp);
  }
  function changes(bp) {
    if(bp.matches && !slider) {
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
        }
      });
    }

    if (!bp.matches && !native) {
      const clone = $('.card-related-desktop .slider-product').clone();
      $('.card-related-mobile .ui-scroller').prepend(clone)
      native = true
    }
  }
})();


(function(){
  if (!document.querySelector('.card-reviews-desktop')) return
  let slider = null, native = null;

  //desktop
  if(matchMedia) {
    var bp = window.matchMedia('(min-width:1024.02px)');
    bp.addListener(changes);
    changes(bp);
  }
  function changes(bp) {
    if(bp.matches && !slider) {
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
        }
      });
    }

    if (!bp.matches && !native) {
      const clone = $('.card-reviews-desktop .review-card').clone();
      $('.card-reviews-mobile .ui-scroller').prepend(clone)
      native = true
    }
  }
})();


(function(){
  if (!document.querySelector('.card-interest-desktop')) return
  let slider = null, native = null;

  //desktop
  if(matchMedia) {
    var bp = window.matchMedia('(min-width:1024.02px)');
    bp.addListener(changes);
    changes(bp);
  }
  function changes(bp) {
    if(bp.matches && !slider) {
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
        }
      });
    }
    if (!bp.matches && !native) {
      //mobile
      const clone = $('.card-interest-desktop .slider-product').clone();
      $('.card-interest-mobile .ui-scroller').prepend(clone)
      native = true
    }
  }
})();


(function(){
  if (!document.querySelector('.slider-product-topline')) return

  document.querySelectorAll('.slider-product-topline')
    .forEach(el => {
      el.addEventListener('click', function (event) {
        event = event || window.event
        event.preventDefault()
        event.stopPropagation()

        const url = this.dataset.href || null

        if (document.documentElement.clientWidth > 1024) {
          return event.target.closest('.slider-product').classList.toggle('opened');
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
          // @todo добавить везде, где инициализация
          callbacks: {
            open: function() {
              document.documentElement.style.overflow = 'hidden'
            },
            close: function() {
              document.documentElement.style.overflow = ''
            }
          }
        });
      })
    })
})();

(function(){
  if (!document.querySelector('.slider-produc-topline')) return

  document.querySelectorAll('.slider-produc-topline')
    .forEach(el => {
      el.addEventListener('click', function (event) {
        event = event || window.event
        event.preventDefault()
        event.stopPropagation()

        const url = this.dataset.href || null

        if (document.documentElement.clientWidth > 1024) {
          return event.target.closest('.slider-product').classList.toggle('opened');
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
          // @todo добавить везде, где инициализация
          callbacks: {
            open: function() {
              document.documentElement.style.overflow = 'hidden'
            },
            close: function() {
              document.documentElement.style.overflow = ''
            }
          }
        });
      })
    })
})();

(function(){
  if (!document.querySelector('.product-card-topline')) return

  document.querySelectorAll('.product-card-topline')
    .forEach(el => {
      el.addEventListener('click', function (event) {
        event = event || window.event
        event.preventDefault()
        event.stopPropagation()

        const url = this.dataset.href || null

        if (document.documentElement.clientWidth > 1024) {
          return event.target.closest('.product-card').classList.toggle('opened');
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
            open: function() {
              document.documentElement.style.overflow = 'hidden'
            },

            close: function() {
              document.documentElement.style.overflow = ''
            }
          }
        });
      })
    })
})();


(function(){
  if (!document.querySelector('.catalog-filters-toggler')) return

  document
    .querySelectorAll('.catalog-filters-toggler')
    .forEach(el => el.addEventListener('click', function (e) {
      e = e || window.event
      e.preventDefault()

      const txt = this.querySelector('.catalog-filters-toggler-txt')
      const icon = this.querySelector('.ui-btn-icon')

      if (this.classList.contains('opened')) {
        txt.textContent = 'Показать все'
        icon.classList.add('ui-btn-icon-plus')
        icon.classList.remove('ui-btn-icon-cancel')
      } else {
        txt.textContent = 'Скрыть'
        icon.classList.remove('ui-btn-icon-plus')
        icon.classList.add('ui-btn-icon-cancel')
      }

      this.classList.toggle('opened')

      const group = this.closest('.catalog-filters-group')
      if (!group) return

      group
        .querySelectorAll('.catalog-filters-hidden')
        .forEach(item => item.classList.toggle('opened'))
    }))
})();



//fixing submit btn in filters
(function(){
  if (!document.querySelector('.catalog-filters-submit')) return

  const filters = document.querySelector('.catalog-filters')
  const submit = filters.querySelector('.catalog-filters-submit')

  document.addEventListener('scroll',() => {
    if (document.documentElement.clientWidth < 1024) return;

    const sc = window.pageYOffset;
    const offset = filters.offsetTop
    const rect = filters.getBoundingClientRect()
    const vh = document.documentElement.clientHeight

    //81 = btn height + position offset from bottom
    if (sc + vh - 81 > offset && sc + vh < offset + rect.height) {
      submit.classList.add('fixed')
      submit.classList.remove('fixed-bottom')
      submit.style.width = rect.width + 'px'
    } else if (sc + vh > offset + rect.height) {
      submit.classList.add('fixed-bottom')
      submit.classList.remove('fixed')
      submit.style.width = rect.width + 'px'
    } else {
      submit.classList.remove('fixed')
      submit.classList.remove('fixed-bottom')
      submit.style.width = ''
    }
  })
})();


(function() {
  if (!document.querySelector('.catalog-filters-close')) return

  document
    .querySelector('.catalog-filters-close')
    .addEventListener('click',() => {
      document.documentElement.classList.remove('no-overflow');
      document.querySelector('.catalog-filters').classList.remove('opened');
    })
})();


(function() {
  if (!document.querySelector('.catalog-filters-bg')) return

  document
    .querySelector('.catalog-filters-bg')
    .addEventListener('click',() => {
      document.documentElement.classList.remove('no-overflow');
      document.querySelector('.catalog-filters').classList.remove('opened');
    })
})();


(function() {
  if (!document.querySelector('.catalog-settings-filters')) return

  document
    .querySelector('.catalog-settings-filters')
    .addEventListener('click',() => {
      document.documentElement.classList.add('no-overflow');
      document.querySelector('.catalog-filters').classList.add('opened');
    })
})();

$('.main-list-li').click(function(){
  if($(this).hasClass("list-open")) {
    $(this).removeClass('list-open');
  } else {
    $(this).addClass('list-open');
  }
});

let arrStars = document.querySelectorAll('.ui-rating-star');
let arrBlock = document.querySelectorAll('.ui-rating');

arrBlock.forEach((e) => {
  if(arrStars.length !== 0) {
    let arrLength = e.children[0].children.length;
    let elValue = e.children[1].textContent;
    let numValue = Math.round(elValue);
    let countRating = arrLength - (arrLength - numValue);

    for(let i = 0; i < countRating; i++) {
      e.children[0].children[i].classList.add('active');
    }
  }
})

$(function () {
  let header = $(".header"),
    headerMenu = $(".header .menu"),
    headerNav = $(".header .nav-wrapper"),
    wrapperFixed = $(".wrapper"),
    footerBreackpoint = $("#footer"),
    footerHeight = $('#footer').innerHeight();
  const headerOffset = $('header .main').offset().top;
  const swipercontaer = document.querySelector(".swiper-carousel-compare")


    $(window).scroll(function () {
      let cardBreackpointOpen = $('.card-breackpoint-open');
      let headerCardFixedHeight = $('.header_fixed .main').innerHeight();
      const headerHeight = $('header .main').outerHeight(true);
  
      let offsetFooter = footerBreackpoint.offset().top
    
    if (matchMedia) {
      var screen678 = window.matchMedia("(max-width:678px)");
      screen678.addListener(changes);
      changes(screen678);
    }
    function changes(screen678) {
   
    if (screen678.matches) {
      if (offsetFooter < document.documentElement.clientHeight + window.scrollY) {
                    D.querySelector('#middle').classList.remove("panel-is-float")
                    if(swipercontaer) {
                      cardBreackpointOpen.css({
                        'top': headerCardFixedHeight + 'px',
                        'position': 'fixed',
                        'bottom': 'initial',
                      }) 
                    } else {
                      cardBreackpointOpen.css({
                        'position': 'relative',
                      })
                    }
                   
                  
                
              } else {
                D.querySelector('#middle').classList.add("panel-is-float")
              
                  $('.main').removeClass('compare-remove-shadow')
                if(swipercontaer) {
                  cardBreackpointOpen.css({
                                'top': headerCardFixedHeight + 'px',
                                'position': 'fixed',
                                'bottom': 'initial',
                              }) 
                } else {
                  cardBreackpointOpen.css({
                    'top': 'initial',
                    'position': 'fixed',
                    'bottom': 0,
                  })
                }
                  
                
                  
                
                
              }

  
    } else {
      cardBreackpointOpen.css('top', headerCardFixedHeight + 'px')
      cardBreackpointOpen.css('bottom', 'initial')
    }
  }
    
     
        
   
  
      
      
  
      if ($(this).scrollTop() > headerOffset) {
        wrapperFixed.css('paddingTop', headerHeight + 'px')
        header.addClass("header_fixed");
        wrapperFixed.addClass("wrapper_fixed");
      } else {
        wrapperFixed.css('paddingTop', 0)
        header.removeClass("header_fixed");
        wrapperFixed.removeClass("wrapper_fixed");
      }
    });


  
});


//фиксируем блок с картинками при скроле на планшетах
function fixCardImgsTablet(card,imgs,section) {
  let dw = document.documentElement.clientWidth
  if (dw > 1024 || dw < 768) return;

  const sc = window.pageYOffset;
  const offset = card.offsetTop
  const rect = card.getBoundingClientRect()
  const vh = document.documentElement.clientHeight
  const to = 165 //offset from top of screen
  const ih = imgs.clientHeight
  const w = section.clientWidth


  if (sc > offset - to && sc + vh - (vh - ih - to) < offset + rect.height) {
    imgs.classList.add('fixed')
    imgs.classList.remove('fixed-bottom')
    imgs.style.width = w + 'px'
  } else if (sc + vh -  (vh - ih - to) > offset + rect.height) {
    imgs.classList.add('fixed-bottom')
    imgs.classList.remove('fixed')
    imgs.style.width = w + 'px'
  } else {
    imgs.classList.remove('fixed')
    imgs.classList.remove('fixed-bottom')
    imgs.style.width = ''
  }
}

(function() {
  const card = document.querySelector('.card')
  const imgs = document.querySelector('.card-imgs')
  const section = document.querySelector('.card-section')

  if(!card) return
  document.addEventListener('scroll',fixCardImgsTablet.bind(null,card,imgs,section))
  window.addEventListener('resize',fixCardImgsTablet.bind(null,card,imgs,section))
})();


jQuery(document).ready(function($){
  $('.card-tabs-link').Tabs();

  $(document).on('click','.tabs-target',function(e){
    e.preventDefault();

    const id = $(this).attr('href');

    if ($(id).length) {
      $('.card-tabs-link[href="'+id+'"]').click();
      const offset = $('.card-tabs-body').offset().top
      $('html,body').animate({scrollTop: offset-160},300)
    }
  })

  $("select").styler();

  $(document).on("click", ".mfp-link", function () {
    var a = $(this);
    $.magnificPopup.open({
      items: { src: a.attr("data-href") },
      type: "ajax",
      overflowY: "scroll",
      removalDelay: 300,
      mainClass: 'my-mfp-zoom-in',
      ajax: {
        tError: "Error. Not valid url",
      },
      callbacks: {
        open: function () {
          setTimeout(function(){
            $('.mfp-wrap').addClass('not_delay');
            $('.mfp-popup').addClass('not_delay');
          },700);
        }
      },

      callbacks: {
        open: function() {
          document.documentElement.style.overflow = 'hidden'
        },

        close: function() {
          document.documentElement.style.overflow = ''
        }
      }
    });
    return false;
  });

  $('.video-card-link, .mfp-frame').on('click',function(e){
    e.preventDefault();

    const url = $(this).attr('data-href') || null
    if (!url) return

    $.magnificPopup.open({
      items: { src: url },
      type: 'iframe',
      disableOn: 700,
      mainClass: 'mfp-fade',
      removalDelay: 160,
      preloader: false,
      fixedContentPos: false
    });
  })


  // Validation for catalog email input
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


  $('.card-tabs-link').Tabs();

  $(document).on('click','.mfp-custom-close',function(e){
    e.preventDefault()
    $.magnificPopup.close()
  })

  $(function() {
    let tabOrder = $('#making-order-pickup .making-order-content > div');
    let tabPayment = $('#making-order-payment .making-order-content > div');

    tabOrder.hide().filter(':first').show();

    // Клики по вкладкам.
    $('#making-order-pickup .making-order-tabs a').click(function(){
      tabOrder.hide();
      tabOrder.filter(this.hash).show();
      $('#making-order-pickup .making-order-tabs a').removeClass('active');
      $(this).addClass('active');
      return false;
    }).filter(':first').click();

    // Клики по вкладкам.
    $('#making-order-payment .making-order-tabs a').click(function(){
      tabPayment.hide();
      tabPayment.filter(this.hash).show();
      $('#making-order-payment .making-order-tabs a').removeClass('active');
      $(this).addClass('active');
      return false;
    }).filter(':first').click();
  });

  function mapContactInit() {
  var mapOptions = {
    zoom: 17,
    center: new google.maps.LatLng(53.924723, 27.511615),
    mapTypeControl:false,
    scrollwheel: false,
    zoomControl: false,
    scaleControl:false,
    disableDefaultUI: true,

    mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
    },

    navigationControlOptions: {
        style: google.maps.NavigationControlStyle.SMALL
    },
  }

  // initial map
  var map = new google.maps.Map(document.getElementById('map-address'), mapOptions);
  var myCenter = new google.maps.LatLng(53.924723, 27.511615);
  var marker = new google.maps.Marker({position:myCenter});

  marker.setMap(map);

  // for select
  let minsk = document.getElementById('minsk');
  let mogilev = document.getElementById('mogilev');

  minsk.addEventListener('click', () => {
    location(minsk)
  })

  mogilev.addEventListener('click', () => {
    location(mogilev)
  })

  function location(town) {
    let thsLat = town.dataset.lat;
    let thsLng = town.dataset.lng

    map.setCenter(new google.maps.LatLng(thsLat, thsLng));

    var myCenter = new google.maps.LatLng(thsLat, thsLng);
    var marker = new google.maps.Marker({position:myCenter});

    marker.setMap(map);
  }
}

if(document.getElementById('map-address')) {
  mapContactInit();
}

  let header = document.querySelector('.making-order-header');
  let list = document.querySelector('.making-order-list');

  if(header) {
    header.addEventListener('click', () => {
      list.classList.toggle('active')
      header.classList.toggle('opened')
    })
  }

  let orderForm = document.querySelector('.making-order-payment .making-order-form');

  $(function () {
    $('.making-order-payment #tab-2 input[type=radio]').change(function() {
      if($(this).val() === 'Безналичный расчёт') {
        orderForm.classList.add('active');
      } else {
        orderForm.classList.remove('active')
      }
    })
  })

  //cal-arr

  // validate for marking-order.html
   $(".making-order-validate").validate({
      errorElement: "span",
      rules: {
        name: {
            required: true,
            lettersonly: true,
        },

        email: {
            required: true,
            email: true,
            // emailErr: true,
        },

        telephone: {
          required: true,
          minlength: 19,
          // telephone: true,
        },

        locality: {
          required: true,
          lettersonly: true,
        },

        street: {
          required: true,
          lettersonly: true,
        },

        house: {
          required: true,
          number: true,
        },

        company: {
          required: true,
          lettersonly: true,
        },

        inn: {
          required:true,
          number: true,
        },

        address: {
          required: true,
          lettersonly: true,
        },

        bank: {
          required: true,
          lettersonly: true,
        },

        bik: {
          required: true,
          // number: true,
        },

        iban: {
          required: true,
          // number: true,
        },

        test: {
          required: true,
          number: true,
        },
      },

      highlight: function(element, errorClass, validClass) {
        $(element).addClass(errorClass).removeClass(validClass);
        $(element).closest('.ui-field').find('.popup-icon')
          .addClass(errorClass).removeClass(validClass);

      },
      unhighlight: function(element, errorClass, validClass) {
        $(element).removeClass(errorClass).addClass(validClass);
        $(element).closest('.ui-field').find('.popup-icon')
          .removeClass(errorClass).addClass(validClass);
      },

      errorPlacement: function (error, element) {
        if (element.attr("name") == "customCheckbox") {
          error.appendTo(".form-cell-field-send");
        } else {
          error.insertAfter(element);
        }
      },

      messages: {
        name: {
          required: "Введите своё ФИО",
          lettersonly: "Введите корректное ФИО",
        },

        email: {
          required: "Введите свой email",
          email: "Введите корректный email",
        },

        telephone: {
          required: "Введите данные",
          minlength: "Введите полный номер",
        },

        locality: {
          required: "Введите населенный пункт",
          lettersonly: "Введите данные",
        },

        street: {
          required: "Введите улицу",
          lettersonly: "Введите данные",
        },

        house: {
          required: "Введите номер дома",
          number: "Введите данные",
        },

        company: {
          required: "Введите название",
          lettersonly: "Введите данные",
        },

        inn: {
          required:"Введите свой ИНН",
          number: 'Введите корректный ИНН',
        },

        address: {
          required: "Введите адрес",
          lettersonly: "Введите данные",
        },

        bank: {
          required: "Введите название банка",
          lettersonly: "Введите данные",
        },

        bik: {
          required: "Введите данные БИК",
          // number: "Введите корректные данные",
        },

        iban: {
          required: "Введите расчётный счет IBAN",
          // number: "Введите корректные данные",
        },

        test: {
          required: "Введите данные",
          number: "Введите корректные данные",
        },
      },
    });

    jQuery.validator.addMethod(
      "emailErrPerson",
      function (value, element) {
        if(/123@gmail.com/.test(value))  {
          return false;
        } else {
            return true
        }
      },
      "Incorrect format"
    );

    let inputPhone = document.getElementById('telephone');

    if(inputPhone) {
      var phoneMask = IMask(
        document.getElementById('telephone'), {
          mask: '+{375} (00) 000 00 00'
        });
    }

    jQuery.validator.addMethod(
        "lettersonly",
        function (value, element) {
          return this.optional(element) || /^[a-zA-ZА-Яа-я\s,ё]+$/i.test(value);
        },
        "Incorrect format"
      );

    (function() {
      if(matchMedia) {
        const screen1024 = window.matchMedia('(max-width:1024px)');
        screen1024.addListener(changes);
        changes(screen1024);
      }

      function changes(screen) {
        let block = document.querySelectorAll('.cart-item-info');

        for(let i = 0; i < block.length; i++) {
          let header = block[i].querySelectorAll('.cart-item-headline')[0];
          let remove = block[i].querySelectorAll('.cart-item-remove')[0];
          let control = block[i].querySelectorAll('.cart-item-control')[0];

          if(screen.matches) {
            header.after(remove)
          } else {
            control.prepend(remove)
          }
        }
      }
    })();

    (function() {
      if(matchMedia) {
        const screen576 = window.matchMedia('(max-width:576px)');
        screen576.addListener(changes);
        changes(screen576);
      }

      function changes(screen) {
        if(screen.matches) {
          $('.making-order-comment.self-call').before($('#map-address'));
        } else {
          $('.col-xs-6.map').append($('#map-address'))
        }
      }
    })();

    let allInputs = document.querySelector('.making-order-myAddress');
    let otherAddressForm = document.querySelector('.making-order-pickup .making-order-form');

    if(allInputs && otherAddressForm) {
      allInputs.addEventListener('click', (e) => {
        if(e.target.classList[0] === 'other') {
          otherAddressForm.style.display = 'block';
        } else {
          otherAddressForm.style.display = 'none';
        }
      })
    }

    let deleteSelected = document.querySelector('.cart-delete-btn');
    let deleteCheckBoxAll = document.querySelector('.cart-delete input[name=customCheckbox]');
    let itemList = document.querySelector('.cart-list');

    if(itemList) {
      itemList.addEventListener('click', (e) => {
        if(e.target.classList[0] === 'cart-item-remove') {
          e.target.closest('.cart-item').remove()
        }
      })
    }

    if(deleteCheckBoxAll) {
      deleteCheckBoxAll.addEventListener('click', (e) => {
        let checkedInput = document.querySelectorAll('.cart-list input[name=customCheckbox]');

        for(let i = 0; i < checkedInput.length; i++) {
          if(deleteCheckBoxAll.checked === true) {
            checkedInput[i].checked = true
          } else {
            checkedInput[i].checked = false
          }
        }
      })
    }

    if(deleteSelected) {
      deleteSelected.addEventListener('click', (e) => {
        let checkedInput = document.querySelectorAll('.cart-list input[name=customCheckbox]:checked')

        for(let i = 0; i < checkedInput.length; i++) {
          checkedInput[i].closest('.cart-item').remove()
        }
      })
    }

    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    // We listen to the resize event
    window.addEventListener('resize', () => {
      // We execute the same script as before
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    });
});//ready


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



new Swiper(".main-trust-slider", {
  slidesPerView: 1,
  spaceBetween: 24,
  loop: true,



  breakpoints: {
    421: {
      slidesPerView: "auto",
    },
    1024: {
      slidesPerView: 3,
    },
    1140: {
      slidesPerView: 4,
    },
  },

  pagination: {
    el: ".main-trust-pagintaion",
    clickable: true,
    dynamicBullets:true,
    // dynamicMainBullets:3,
  },

  navigation: {
    nextEl: ".main-trust-next",
    prevEl: ".main-trust-prev",
  },
});



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

$('.waitList-item-remove-link').click(function(){
  $(this).closest($('div.waitList-item')).remove();
});

$('.profile-setup-delete').click(function(){
  $(this).closest($('div.profile-setup-wrapper')).remove();
});

$(document).ready(function () {
  $(".request-body-wrap-form").validate({
    errorElement: "span",
    rules: {
      name: {
        required: true,
        // lettersonly: true,
      },

      textbox: {
        required: true,
        maxlength: 500,
      },

      url: {
        url: true,
        required: true,
        // email: true,
      },

    },

    messages: {
      name: {
        required: "Пожалуйста, введите ваше Наименование",
        name: " ",
      },

      textbox: {
        required: "Пожалуйста, оставьте свой комментарий",
        maxlength: "Комментарий не должен превышать 500 символов",
      },

      url: {
        required: "Введите данные",
      }
    },
    highlight: function(element, errorClass, validClass) {
      $(element).addClass(errorClass).removeClass(validClass);
      $(element).closest('.ui-field').find('.popup-icon')
        .addClass(errorClass).removeClass(validClass);

    },
    unhighlight: function(element, errorClass, validClass) {
      $(element).removeClass(errorClass).addClass(validClass);
      $(element).closest('.ui-field').find('.popup-icon')
        .removeClass(errorClass).addClass(validClass);
    }
  });
})

$(document).ready(function () {
  $(".assistance-form").validate({
    errorElement: "span",
    rules: {
      topic: {
        required: true,
      },

      textbox: {
        required: true,
        maxlength: 500,
      },



    },

    messages: {
      topic: {
        required: "Пожалуйста, введите ваше тему обращения",
        name: " ",
      },

      textbox: {
        required: "Пожалуйста, оставьте свой комментарий",
        maxlength: "Комментарий не должен превышать 500 символов",
      },


},
    highlight: function(element, errorClass, validClass) {
      $(element).addClass(errorClass).removeClass(validClass);
      $(element).closest('.ui-field').find('.popup-icon')
        .addClass(errorClass).removeClass(validClass);

    },
    unhighlight: function(element, errorClass, validClass) {
      $(element).removeClass(errorClass).addClass(validClass);
      $(element).closest('.ui-field').find('.popup-icon')
        .removeClass(errorClass).addClass(validClass);
    }
  });
})

$(document).ready(function () {
  $('.check-comment').click(function(){
    $(this).hasClass("has-comment")?$(this).removeClass("has-comment"):$(this).addClass("has-comment");
  });
})

let el = document.querySelector(".favorites-grid");

if(el) {
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

let flag = false

var scrollLoader = {
  //разметка прелоадера
  preloader: '<div class="ui-preloader"><div class="lds-ellipsis ui-preloader-spinner"><div></div><div></div><div></div><div></div></div><div class="ui-preloader-hint">Подождите, идет загрузка</div></div>',
  //высота экрана + апдейт при ресайзе
  screenHeight: document.documentElement.clientHeight,
  update() {
      this.screenHeight = document.documentElement.clientHeight;
  },
  //загружаем контент
  loader(selector) {
    const that = this;
    let scroll = $(window).scrollTop();

    $(selector).each(function(key,item){
      const url = $(item).attr('data-href');

      if ($(item).attr('data-isloaded') === 'true' || url === undefined || url === '') return false;

      let offset = $(item).offset().top;
      if (scroll + that.screenHeight*1.5 > offset) {
        $(item).attr('data-isloaded','true')
        $(item).html(that.preloader);
        $.ajax({
            url: url,
            method: 'GET',
            dataType:"html",
            contentType:"application/x-www-form-urlencoded",
            success: function(data) {
                $(item).attr('data-loaded','true');
                $(item).html(data);
            },
            error: function() {
                $(item).attr('data-loaded','true');
                $(item).html('<div class="ui-error">Произошла непредвиденная ошибка. Обратитесь в поддержку сайта.</div>')
            }
        })
      }
    });
  }
}//scrollLoader

jQuery(window).on('resize',scrollLoader.update);
jQuery(document).ready(function(){
  jQuery(window).on('scroll',function(){
    scrollLoader.loader('.ajx-scroll-load[data-loaded="false"]');
  })
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

    const getSelectors = (parent,link) => {
      parent.querySelectorAll(link).forEach(item => {
        if (!item.closest('.swiper-slide-duplicate')) {
          item.classList.add('ux-not-duplicate')
        } else {
          item.classList.add('ux-gallery-link-duplicate')
          item.classList.remove('ux-gallery-link')
        }
      })
    }

    const shadowSelectors = (parent) => {
      const event = new Event('click')

      D.querySelectorAll('.ux-gallery-link-duplicate')
      .forEach(item => {
        item.addEventListener('click',(e)  => {
          e = e || window.event;
          e.preventDefault();
          const src = item.querySelector('img').getAttribute('src')

          const notDuplicate = parent.querySelector(`img[src="${src}"]`).parentElement
          if (notDuplicate) {
            notDuplicate.dispatchEvent(event)
          }

        })
      })
    }

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

            setTimeout(()=>{D.querySelector('.lg-outer').classList.add('lg-appear')},550)
          });

          let selector = 'a.ux-gallery-link'
          if (el.classList.contains('swiper-rewards-wrp')) {
            getSelectors(el,'a.ux-gallery-link')
            shadowSelectors(el)
            selector = 'a.ux-gallery-link.ux-not-duplicate'
          }

          lightGallery(el, {
            download: false,
            selector: selector,
            backdropDuration: 500,
            speed: 1000
          });


          el.addEventListener("onSlideClick",function(){
            window.lgData[el.getAttribute("lg-uid")].goToNextSlide()
          })

          el.addEventListener("onBeforeClose",function(){
            D.querySelector('.lg-outer').classList.remove('lg-appear')
          })
        });
      }
    );
  })();


  let pageTitleCategory = document.querySelector('.page-title-category');
  $(function() {
    var tab = $('#tabs .sign-popup-content > div');
    tab.hide().filter(':first').show();

    // Клики по вкладкам.
    $('#tabs .sign-popup-tabs a').click(function(e){
      if(pageTitleCategory) {
        let newCategory = e.target.innerHTML
        pageTitleCategory.innerHTML = newCategory;
      }
     
      tab.hide();
      tab.filter(this.hash).show();
      $('#tabs .sign-popup-tabs a').removeClass('active');
      $(this).addClass('active');
      return false;
    }).filter(':first').click();
  });


  // ymaps.ready(init);
 
  // function init() {
      
  // }





//! PART 3 JAVA SCRIPT CODE

//карта на странице delivery&pay
let deliverypayMap = document.querySelector('.deliverypayMap')
if(deliverypayMap) {

  const deliveryCity = [
    { coord: [ 53.902735, 27.555696 ], title: 'Минск', content: 'Минск' },
    { coord: [ 53.894548, 30.330654 ], title: 'Могилёв', content: 'Могилёв' },
    { coord: [ 34.052235, -118.243683 ], title: 'Другие города', content: 'Другие города' },
  ];

  ymaps.ready(function() {
    const map = new ymaps.Map('deliverypayMap', {
      zoom: 9,
      center: deliveryCity[0].coord,
      controls: [],
    });

    const marker = new ymaps.Placemark(deliveryCity[0].coord, {
      balloonContent: balloonContent(deliveryCity[0]),
    });
    map.geoObjects.add(marker);
    map.behaviors.disable('scrollZoom');


    document.querySelectorAll('#citylink li a').forEach((n, i) => {
      n.addEventListener('click', onClick.bind(n, deliveryCity[i]));
    });


    function onClick(item) {
      map.setCenter(item.coord);
      marker.geometry.setCoordinates(item.coord);
      marker.properties.set('balloonContent', balloonContent(item));
    }

    function balloonContent(item) {
      return `<b>${item.content}</b>`;
    }



  });
}

let mapContact1 = document.getElementById('mapContact1')
let mapContact2 = document.getElementById('mapContact2')

if (mapContact1) {
  ymaps.ready(init);
  ymaps.ready(init1);
  function init(){
    var mapContact1 = new ymaps.Map("mapContact1", {
        center: [53.834601, 28.994249],
        zoom: 8,
        controls: [],
    });
    // mapContact1.setZoom(7)
  
    (function() {
      if(matchMedia) {
        const screen = window.matchMedia('(max-width:1024.99px)');
        screen.addListener(changes);
        changes(screen);
      }
      function changes(screen) {
        if(screen.matches) {
             mapContact1.setZoom(7)
        } else {
              mapContact1.setZoom(8)
        }
      }
    })();

        // Первая метка
       MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
          '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
      ),
      myPlacemarkWithContent = new ymaps.Placemark([53.933166, 27.451803], {
          // hintContent: 'Собственный значок метки с контентом',
          // balloonContent: 'А эта — новогодняя',
          // iconContent: '12'
      }, {

        preset: 'islands#dotIcon',
        iconColor: '#4A95F7'
      });

      // Вторая метка
      MyIconContentLayout1 = ymaps.templateLayoutFactory.createClass(
        '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
    ),
    myPlacemarkWithContent1 = new ymaps.Placemark([53.879127, 30.265464], {
        // hintContent: 'Собственный значок метки с контентом',
        // balloonContent: 'А эта — новогодняя',
        // iconContent: '12'
    }, {

      preset: 'islands#dotIcon',
      iconColor: '#4A95F7'
    });

      mapContact1.behaviors.disable('scrollZoom');
      mapContact1.geoObjects.add(myPlacemarkWithContent);
      mapContact1.geoObjects.add(myPlacemarkWithContent1);

  }
  function init1(){
    var mapContact2 = new ymaps.Map("mapContact2", {
      center: [53.834601, 28.994249],
      zoom: 8,
      controls: [],
  });
  (function() {
    if(matchMedia) {
      const screen = window.matchMedia('(max-width:1024.99px)');
      screen.addListener(changes);
      changes(screen);
    }
    function changes(screen) {
      if(screen.matches) {
           mapContact2.setZoom(7)
      } else {
            mapContact2.setZoom(8)
      }
    }
  })();

  
    //     // Первая метка
       MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
          '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
      ),
      myPlacemarkWithContent = new ymaps.Placemark([53.933166, 27.451803], {
          // hintContent: 'Собственный значок метки с контентом',
          // balloonContent: 'А эта — новогодняя',
          // iconContent: '12'
      }, {
        preset: 'islands#dotIcon',
        iconColor: '#4A95F7'
      });

    //   // Вторая метка
      MyIconContentLayout1 = ymaps.templateLayoutFactory.createClass(
        '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
    ),
    myPlacemarkWithContent1 = new ymaps.Placemark([53.879127, 30.265464], {
        // hintContent: 'Собственный значок метки с контентом',
        // balloonContent: 'А эта — новогодняя',
        // iconContent: '12'
    }, {

      preset: 'islands#dotIcon',
      iconColor: '#4A95F7'
    });
  
      //вторая карта
      mapContact2.behaviors.disable('scrollZoom');
      mapContact2.geoObjects.add(myPlacemarkWithContent);
      mapContact2.geoObjects.add(myPlacemarkWithContent1);
  }
 
}



let uiSearchSettings = document.querySelector('.ui-search-settings')


if(uiSearchSettings) {
  $('.ui-search-settings').on('click', () => {
    $('.ui-search-settings-text-content').toggleClass('ui-search-settings-open')
    $('.ui-search-settings-img').toggleClass('ui-search-settings-img-open')

  })
  $('.ressearch-settings-filters').on('click', () => {
    $('.ui-search-settings-text-content').toggleClass('ui-search-settings-open')
    $('.ui-search-settings-img').toggleClass('ui-search-settings-img-open')
  })

}


// repaircmp.html

let repairTypeBtn = document.querySelector('.repair-type-btn'),
    repaircmpTypeWrapper = document.querySelector('.repaircmp-type-wrapper'),
    repaircmpTypeItem = document.querySelectorAll('.repaircmp-type-item');

if(repairTypeBtn) {
  if( repaircmpTypeItem.length > 6) {
    repairTypeBtn.addEventListener('click', () => {
      repairTypeBtn.style.display = 'none'
      repaircmpTypeWrapper.classList.add('repaircmp-type-wrapper-open')
    })
  } else {
    repairTypeBtn.style.display = 'none'
  }
}



//complite.html

let complite = document.querySelector('.complite');

if(complite) {
  const buildSwiperSlider = sliderElm => {
    const sliderIdentifier = sliderElm.dataset.id;
    return new Swiper(`#${sliderElm.id}`, {

        pagination: {
            el: `.swiper-pagination-${sliderIdentifier}`,
            clickable: true,
        },
    });
}
const allSliders = document.querySelectorAll('.swiper');
allSliders.forEach(slider => buildSwiperSlider(slider));
}



//producent-page rebuild
let cardReviewsMediaContainer = document.querySelector('.card-reviews-media-container')
if(cardReviewsMediaContainer) {
  (function() {
    if(matchMedia) {
      const screen = window.matchMedia('(max-width:1024.99px)');
      screen.addListener(changes);
      changes(screen);
    }
    function changes(screen) {
      if(screen.matches) {
        $(".card-reviews").appendTo($(".card-reviews-media-container"));

      } else {
        $('.card-reviews').appendTo($('.catalog-filters'))

      }
    }
  })();
}

//header mobile

  (function() {
    if(matchMedia) {
      const screen = window.matchMedia('(max-width:1024.99px)');
      screen.addListener(changes);
      changes(screen);
    }
    function changes(screen) {
      if(screen.matches) {
        $(".mobile-card").appendTo($(".mob-menu"));
        $(".main-catalog").appendTo($(".mob-menu"));


      } else {
        $(".mobile-card").appendTo($(".main-catalog-wrapper"));
        $(".main-catalog").appendTo($(".main-catalog-wrapper"));
      }
    }
  })();


//Открываем каталог
let catalogBtn = document.querySelector('.main-catalog'),
headerHeightC = document.querySelector('.header').clientHeight,
navWrapperC = document.querySelector('.nav-wrapper').clientHeight,
changeIcon = document.querySelector('.main-toggler'),
mainSearchForm = document.querySelector('.main-search-form'),
// catalogItemList = document.querySelectorAll('.catalog-item-list'),
mainOpenCatalog = document.querySelector('.main'),
navWrapperOpenCatalog = document.querySelector('.nav-wrapper'),
bodyOpenCatalog = document.querySelector('body'),

containerMenu = document.querySelector('.container-menu');

let mobMenuImg = document.querySelector('.mob-menu-img')
let enterMobile = document.querySelector('.enter-mobile')
//  let mobMenuImg = document.getElementsByClassName('mob-menu-img')
containerMenu.addEventListener('click', (e) => {
  // console.log(e.target.classList)
  if(e.target.classList.value == 'container-menu container-menu-open') {
      changeIcon.classList.remove('main-toggler-cross');
      containerMenu.classList.remove('container-menu-open');
  }
})
catalogBtn.addEventListener('click', () => {
  //open first li on menu
  let menuZero = $('.menu-desktop-ul')[0]
  menuZero.classList.add('menu-desktop-ul-open')
  

      if(containerMenu.classList.contains('container-menu-open') == false) {
        mainSearchForm.classList.add('main-search-form-open');
        mainOpenCatalog.classList.add('main-open-catalog');
        
       } else {
        mainSearchForm.classList.remove('main-search-form-open');
          mainOpenCatalog.classList.remove('main-open-catalog');

       }
       searchMenu.classList.remove('search-menu-open')

      changeIcon.classList.toggle('main-toggler-cross');
      containerMenu.classList.toggle('container-menu-open');


      navWrapperOpenCatalog.classList.toggle('nav-wrapper-open-catalog')
      bodyOpenCatalog.classList.toggle('body-hidden')

      mobMenuImg.classList.remove('mob-menu-img-open')
      enterMobile.classList.remove('enter-mobile-open')
      if(matchMedia) {
        const screen = window.matchMedia('(max-width:1024.99px)');
        screen.addListener(changes);
        changes(screen);
      }
      function changes(screen) {
        if(screen.matches) {
          // containerMenu.style.top = headerHeightC - navWrapperC + mainSearchForm.clientHeight + 'px';
          containerMenu.style.top = $('.main').outerHeight()
        } else {
          containerMenu.style.top = headerHeightC - navWrapperC + 'px';

        }
      }

      //устанавливаем минимальную высоту подменю
      let menuDesktopHeight = document.querySelector('.menu-desktop').clientHeight;
      $('.menu-desktop-second').css('min-height', `${menuDesktopHeight - 115 - 40 + 5}px`)
    
})


mobMenuImg.addEventListener('click', () => {
  mobMenuImg.classList.toggle('mob-menu-img-open')
  enterMobile.classList.toggle('enter-mobile-open')
  
  // hide menu
  changeIcon.classList.remove('main-toggler-cross')
  mainSearchForm.classList.remove('main-search-form-open')
  containerMenu.classList.remove('container-menu-open')
  mainOpenCatalog.classList.remove('main-open-catalog')
  bodyOpenCatalog.classList.remove('body-hidden')

})
//Высота при скроле шапки
window.addEventListener('scroll', () => {
  containerMenu.style.top = mainOpenCatalog.clientHeight + 'px'
})




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

let carouselCompare = document.querySelector('.swiper-carousel-compare');



let swiperCarouselCompare = new Swiper(".swiper-carousel-compare", {

navigation: {
  nextEl: `.compare-slider-next-carousel-compare_1`,
  prevEl: `.compare-slider-prev-carousel-compare_1`,
},
slidesPerView: 'auto',
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
let posYEnd = 0


// swiper-carousel-compare
let deliverypayTouch = document.querySelector('.deliverypay-content')
let stickyTouch = document.querySelector('.compare-sticky-body')
if(carouselCompare) {
  deliverypayTouch.addEventListener('touchstart', ev => {
    // ev.preventDefault();
    ev.stopImmediatePropagation();
    posXStart = ev.touches[0].clientX;
    posYStart = ev.touches[0].clientY


}, { passive: true });

deliverypayTouch.addEventListener('touchend', ev => {
  // ev.preventDefault();
  ev.stopImmediatePropagation();
  posXEnd = ev.changedTouches[0].clientX
  posYEnd = ev.changedTouches[0].clientY
 
if(posYStart - posYEnd < 20) {
  swiperCarouselCompare.forEach((swiperSlide) => {

    let activeSlide = swiperSlide.activeIndex
    if(posXStart - posXEnd > 20) {
      swiperSlide.slideTo(activeSlide + 1)
    } else {
      swiperSlide.slideTo(activeSlide - 1)
    }
  })
}
  
}, { passive: true });
// Mobile touch

stickyTouch.addEventListener('touchstart', ev => {
  ev.preventDefault();
  ev.stopImmediatePropagation();
  posXStart = ev.touches[0].clientX;
  posYStart = ev.touches[0].clientY


}, { passive: true });

stickyTouch.addEventListener('touchend', ev => {
ev.preventDefault();
ev.stopImmediatePropagation();
posXEnd = ev.changedTouches[0].clientX
posYEnd = ev.changedTouches[0].clientY

if(posYStart - posYEnd < 20) {
swiperCarouselCompare.forEach((swiperSlide) => {

  let activeSlide = swiperSlide.activeIndex
  if(posXStart - posXEnd > 0) {
    swiperSlide.slideTo(activeSlide + 1)
  } else {
    swiperSlide.slideTo(activeSlide - 1)
  }
})
}

}, { passive: true });

}





let compareSection = document.querySelectorAll('.compare-table-section-head')

if(compareSection) {
  compareSection.forEach((e) => {
    e.addEventListener('click', (elem) => {
      let clickElem = elem.target.closest('.compare-table-section')
      let closeElem =  clickElem.querySelector('.compare-table-section-body')
      let closeIcon =  clickElem.querySelector('.compare-table-section-head_arrow')

      closeElem.classList.toggle('compare-table-section-body_close')
      closeIcon.classList.toggle('compare-table-section-head_arrow_close')
    })
  })
}



//compary-body mobile
(function() {
  if(matchMedia) {
    const screen = window.matchMedia('(max-width:1024.99px)');
    screen.addListener(changes);
    changes(screen);
  }
  function changes(screen) {
    if(screen.matches) {
      $(".compare-btn-clear").appendTo($(".compare-grid-aside-container"));
    } else {
      $(".compare-btn-clear").appendTo($(".compare-aside-clear"));
    }
  }
})();




// удаляем элементы по клику на крестик

let targetElment = document.querySelectorAll('.product-card'),
    removeBtn = document.querySelectorAll('.product-card-remove'),
    allSliders = document.querySelectorAll('.swiper-carousel-compare'),
    fixedBtn = document.querySelectorAll('.product-card-fixed'),
    allInfo = document.querySelectorAll('.swiper-slide');
if (removeBtn) {
  removeBtn.forEach((e) => {
    e.addEventListener('click', (elem) => {
      // if(e === elem.target) {
      //   allSliders.forEach((slider) => {
      //     slider.querySelectorAll('.swiper-slide').forEach((elemIndex, i) => {
            
      //       swiperCarouselCompare.forEach((swiper) => {
      //         if(elemIndex == elem.target.closest('.swiper-slide')) {
      //           swiper.removeSlide(i)
                
      //         }
      //       })


      //     })
      //   })

      // }
      console.log(elem.target.closest('.swiper-slide').ariaLabel)
     let removeElement =  elem.target.closest('.swiper-slide').ariaLabel
      allInfo.forEach((ariaElem) => {
        if(ariaElem.ariaLabel === removeElement) {
          ariaElem.remove()
          fixedbtn()

          swiperCarouselCompare.forEach((swiper) => {
            swiper.update()
          })

        }
      })

    })
  })
}
if(fixedBtn) {
  fixedBtn.forEach((e) => {
    

    e.addEventListener('click', (elem) => {
let productCardBox = document.querySelector('.product-card');
let WidthProduct = productCardBox.clientWidth;
let fixedContainer = document.querySelector('.test-position');

// if(productCardBox) {
//   let HeightProduct = productCardBox.clientHeight;

//   console.log($('.test-position').children())
//   // $('.test-position').children().css({
//   //   'height': HeightProduct,
//   //   'width': WidthProduct,
//   // })


// }
      
      elem.preventDefault();

      function fixElement() {
        elem.target.closest('.product-card-fixed').classList.toggle('product-card-fixed-fix')
      }
      function removeFixElem() {
        if(elem.target.closest('.product-card-fixed').classList[2] == 'product-card-fixed-fix') {
          elem.target.closest('.product-card-fixed').classList.remove('product-card-fixed-fix')      

        }

      }

      
      let productFixed = document.querySelectorAll('.product-card-fixed-fix')
      if(productFixed.length < 4) {
       
        fixElement()
        e.children[1].classList.toggle('product-card-fixed-text-fix')

       
        
        allInfo.forEach((aria) => {
          if(aria.ariaLabel === elem.target.closest('.swiper-slide').ariaLabel) {
          $(aria.closest('.swiper-wrapper')).prepend($(aria))
       
          //! $(aria).closest('.compare-row-main').children('.test-position-info')[0] - то куда класть элемент
          let copyContainer = $(aria).closest('.compare-row-main').children('.test-position-info')[0];
         
          $(aria).clone().appendTo(copyContainer)
     
        
         
            swiperCarouselCompare.forEach((swiperSlide) => {
              swiperSlide.slideTo(0)
            })

          }
        })
        $(e).closest('.swiper-slide').clone().appendTo('.test-position')
        $(e).closest('.product-card').addClass('product-card-invivsible')
      
       

  
   

      //Кнопка закрепить - открепляем продукт
      
      let wrapPosition = document.querySelector('.test-position');
      let children_wrapPosition = wrapPosition.querySelectorAll('.swiper-slide')
      
      children_wrapPosition.forEach((card) => {
        removeFix = $(card).find('.product-card-fixed')[0];
        deleteFix = $(card).find('.product-card-remove')[0];

        //удаляем закрепленные элементы по нажатию на крестик
        deleteFix.addEventListener(('click'), () => {
          let allAriaId = document.querySelectorAll('.swiper-slide')
         
          
          allAriaId.forEach((ariaId) => {
            if(card.ariaLabel == ariaId.ariaLabel) {
             

              swiperCarouselCompare.forEach((swiperSlide) => {
                swiperSlide.slideTo(0)
                swiperSlide.update()
              })
              ariaId.remove()
             
            }
           
          })
          console.log(card)
          // console.log('asd')
          let mainSlider = document.querySelector('.swiper-carousel-compare-main');
          // console.log($(mainSlider).find('.swiper-slide')[0].ariaLabel);
          let newFirstIndex =  $(mainSlider).find('.swiper-slide')[0].ariaLabel
          //  console.log(newFirstIndex)
          //  console.log(children_wrapPosition[0])
           children_wrapPosition[0].setAttribute('aria-label', newFirstIndex)
           console.log(children_wrapPosition[0])
         
          //  let updateFirstCopyIndex = children_wrapPosition[0]
          //  updateFirstCopyIndex.setAttribute('aria-label', newFirstIndex)

          
        
        })

        removeFix.addEventListener('click', () => {

              //удаляем копированные значения 
              let warPositionTest = document.querySelectorAll('.test-position-info')
              warPositionTest.forEach((elemOfText) => {
                let children_elemOfText = elemOfText.querySelectorAll('.swiper-slide');
        
                children_elemOfText.forEach((slideText) => {
               
                  if(card.ariaLabel == slideText.ariaLabel) {
                    slideText.remove();
                  }
                })
            })


          card.remove()
         $(e).closest('.product-card').removeClass('product-card-invivsible')
          e.children[1].classList.remove('product-card-fixed-text-fix')
          elem.target.closest('.product-card-fixed').classList.remove('product-card-fixed-fix') 


          swiperCarouselCompare.forEach((swiperSlide) => {
            swiperSlide.slideTo(0)
          })

        })
      })
    

      } else {
        removeFixElem()
        e.children[1].classList.remove('product-card-fixed-text-fix')
      }

    })
  })
 
}



//Добавляем\убираем кнопку закрепить в зависимости от кол-во элементов
let product_c = document.querySelectorAll('.product-card');
let wrapPosition = document.querySelector('.test-position');
let wrapPositionText = document.querySelectorAll('.test-position-info')

if(carouselCompare) {
  function fixedbtn() {
    if($('.swiper-carousel-compare-main').find('.swiper-slide').length > 3) {
      $('.product-card-fixed').addClass('product-card-fixed-f')
    } else {
      $('.product-card-fixed').removeClass('product-card-fixed-f')
      product_c.forEach((product) => {
        $(product).removeClass('product-card-invivsible')
      })
      wrapPositionText.forEach((deleteText) => {
        deleteText.remove()
      })
      wrapPosition.remove()
    }
  }
  
  fixedbtn()
}

// catalog-item-list

const serviceReminder = document.querySelector('.service-reminder');

if(serviceReminder) {
  const txtHeadline = document.querySelector('.sign-company-headline');
  const txtSteps = document.querySelector('.sign-company-steps span');
  const firstStep = document.querySelector('.sign-company-first');
  const secondStep = document.querySelector('.sign-company-second');
  const progressBar = document.querySelector('.progress-bar');
  const btnBackStep = document.querySelector('.reminder-btn')

  btnBackStep.addEventListener('click', () => {
    txtHeadline.textContent = 'Об оборудовании';
    txtSteps.textContent = '1';

    firstStep.style.display = 'block';
    secondStep.style.display = 'none';
    progressBar.style.width = '50%';
  })

  // validate form
  $(".sign-sompany-first-form").validate({
    errorElement: 'span',
    errorPlacement: function (error, element) {
      if(element.attr("type") == "checkbox") {
        return element.next('label').append(error);
      }

      error.insertAfter($(element));
    },

    rules: {
      type: {
        required:true,
      },
      num: {
        required:true,
        number: true,
      },
      date: {
        required: true,
      },
      days: {
        required: true,
      },
      hours: {
        required: true,
      },
    },

    highlight: function(element, errorClass, validClass) {
      $(element).addClass(errorClass).removeClass(validClass);
      $(element).closest('.ui-field').find('.popup-icon')
        .addClass(errorClass).removeClass(validClass);
    },

    unhighlight: function(element, errorClass, validClass) {
      $(element).removeClass(errorClass).addClass(validClass);
      $(element).closest('.ui-field').find('.popup-icon')
        .removeClass(errorClass).addClass(validClass);
    },

    errorPlacement: function (error, element) {
      if (element.attr("name") == "customCheckbox") {
        error.appendTo(".form-cell-field-send");
      } else {
        error.insertAfter(element);
      }

      if (element.hasClass('catalog-settings-select')) {
        element.closest('.jq-selectbox').after(error);
      }
      if (element.hasClass('ui-checkbox-input')) {
        element.closest('.ui-checkbox-body').after(error);
      }
    },


    submitHandler: function(form) {
      txtHeadline.textContent = 'О получателе';
      txtSteps.textContent = '2';

      firstStep.style.display = 'none';
      secondStep.style.display = 'block';
      progressBar.style.width = '100%';

      return false;
    },

    messages: {
      type: {
        required:"Введите данные",
      },
      num: {
        required:"Введите данные",
        number:"Введите данные",
      },
      date: {
        required: 'Введите данные',
      },
      days: {
        required:"Введите данные",
      },
      hours: {
        required:"Введите данные",
      },
    },
  });

  $(".sign-sompany-second-form").validate({
    errorElement: 'span',
    errorPlacement: function (error, element) {
      if(element.attr("type") == "checkbox") {
        return element.next('label').append(error);
      }

      error.insertAfter($(element));
    },

    rules: {
      name: {
        required: true,
        lettersonly: true,
      },
      phone: {
        required: true,
        minlength: 19,
      },
    },

    highlight: function(element, errorClass, validClass) {
      $(element).addClass(errorClass).removeClass(validClass);
      $(element).closest('.ui-field').find('.popup-icon')
        .addClass(errorClass).removeClass(validClass);
    },

    unhighlight: function(element, errorClass, validClass) {
      $(element).removeClass(errorClass).addClass(validClass);
      $(element).closest('.ui-field').find('.popup-icon')
        .removeClass(errorClass).addClass(validClass);
    },

    messages: {
      name: {
        required: "Введите ФИО",
        lettersonly: "Введите корректные данные",
      },
      phone: {
        required: "Введите данные",
        minlength: "Введите полный номер",
      },
    },
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
      if(/123@gmail.com/.test(value))  {
        return false;
      } else {
          return true
      }
    },
    "Incorrect format"
  );

  var phoneMask = IMask(
    document.getElementById('phone'), {
      mask: '+{375} (00) 000 00 00'
  });

  // datetimepicker
   FARBA.lazyLibraryLoad("https://cdnjs.cloudflare.com/ajax/libs/jquery-datetimepicker/2.5.20/jquery.datetimepicker.full.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/jquery-datetimepicker/2.5.20/jquery.datetimepicker.css", () => {

    $( document ).ready(function() {
      let flag = false;
        $("select").styler();

        $('#datetimepicker').datetimepicker({
          // value:'12.03.2013',
          format:'d.m.Y',
          timepicker: false,
          // opened: true,
          closeOnDateSelect:true,
          lang: 'ru',
          yearStart: 1940,
          yearEnd: new Date().getFullYear(),
          dayOfWeekStart: 1,
          onGenerate: function() {
            if(!flag) {
              let blockOfYears = document.querySelector('.xdsoft_yearselect');
              let btnYears = document.querySelector('.xdsoft_label.xdsoft_year');
              let control = document.querySelector('.xdsoft_monthpicker')
              let blockScroll = blockOfYears.childNodes[0];
              let scroll = 30 * 9;

              blockScroll.classList.add('blockYears')

              let arrowUp = document.createElement('div');
              let arrowDown = document.createElement('div');

              arrowUp.classList.add('arrowUp');
              arrowDown.classList.add('arrowDown');

              blockOfYears.appendChild(arrowUp);
              blockOfYears.appendChild(arrowDown);


              control.addEventListener('click', (e) => {
                if(e.target.classList[1] === 'xdsoft_year') {
                  let valueMargin = blockScroll.style.marginTop;
                  let marginGet = valueMargin.split('px')[0];
                  let currentYearElement = document.querySelector('.xdsoft_year .xdsoft_current');
                  let numCurrentYear = +currentYearElement.textContent

                  if(numCurrentYear === 2022) {
                    blockScroll.style.marginTop = '-2242px'
                  } else if (numCurrentYear === 1940) {
                    blockScroll.style.marginTop = '0px'
                  } else {
                    blockScroll.style.marginTop = +marginGet + 40 + 'px'
                  }
                }
              })

              arrowUp.addEventListener('click', () => {
                let valueMargin = blockScroll.style.marginTop;
                let marginGet = valueMargin.split('px')[0];

                if(+marginGet < 0) {
                  blockScroll.style.marginTop = +marginGet + scroll + 'px';

                  if(+marginGet < -271) {
                    blockScroll.style.marginTop = +marginGet + scroll + 'px';
                  } else {
                    blockScroll.style.marginTop = '0px'
                  }
                } else {
                  blockScroll.style.marginTop = '0px'
                }
              })

              arrowDown.addEventListener('click', () => {
                let valueMargin = blockScroll.style.marginTop;
                let marginGet = valueMargin.split('px')[0];

                blockScroll.style.marginTop = +marginGet - scroll + 'px';

                if(+marginGet > (-$(".blockYears").height() + 250)) { //-2490
                  if(+marginGet > (-$(".blockYears").height() + 540)) {
                    blockScroll.style.marginTop = +marginGet - scroll + 'px';
                  } else {
                    blockScroll.style.marginTop = `${(-$(".blockYears").height() + 250)}px`
                  }
                } else {
                  blockScroll.style.marginTop = `${(-$(".blockYears").height() + 250)}px`
                }
              })

              $(document).on('click touchend', '.xdsoft_monthpicker', (e) => {
                if(e.target.parentElement.classList[1] === 'xdsoft_year') {
                  let valueMargin = blockScroll.style.marginTop;
                  let marginGet = valueMargin.split('px')[0];
                  let currentYearElement = document.querySelector('.xdsoft_year .xdsoft_current');
                  let numCurrentYear = +currentYearElement.textContent

                  if(numCurrentYear === 2022) {
                    blockScroll.style.marginTop = '-2242px'
                  } else if (numCurrentYear === 1940) {
                    blockScroll.style.marginTop = '0px'
                  } else {
                    blockScroll.style.marginTop = +marginGet + 40 + 'px'
                  }
                }
              })

              $(document).on('click touchend', '.arrowUp', (e) => {
                let valueMargin = blockScroll.style.marginTop;
                let marginGet = valueMargin.split('px')[0];

                if(+marginGet < 0) {
                  blockScroll.style.marginTop = +marginGet + scroll + 'px';

                  if(+marginGet < -271) {
                    blockScroll.style.marginTop = +marginGet + scroll + 'px';
                  } else {
                    blockScroll.style.marginTop = '0px'
                  }
                } else {
                  blockScroll.style.marginTop = '0px'
                }
              })

              $(document).on('click touchend', '.arrowDown', (e) => {
                let valueMargin = blockScroll.style.marginTop;
                let marginGet = valueMargin.split('px')[0];

                if(+marginGet > (-$(".blockYears").height() + 250)) { //-2490
                  if(+marginGet > (-$(".blockYears").height() + 540)) {
                    blockScroll.style.marginTop = +marginGet - scroll + 'px';
                  } else {
                    blockScroll.style.marginTop = `${(-$(".blockYears").height() + 250)}px`
                  }
                } else {
                  blockScroll.style.marginTop = `${(-$(".blockYears").height() + 250)}px`
                }
              })

              flag = true;
            }
          },
        });

        $.datetimepicker.setLocale('ru');
    });
  });
}



//input script

let mainSearchInput = document.querySelector('.main-search-input'),
mainLogo = document.querySelector('.main-logo'),
searchMenu = document.querySelector('.search-menu'),
mainHeight = document.querySelector('.main'),
menuHeight = document.querySelector('.menu'),
closeInput = document.querySelector('.main-search-input-close')
// headerConatins = document.querySelector('.header').classList.contains('.header_fixed'),
mainWatalog = document.querySelector('.main-catalog-wrapper');

closeInput.addEventListener('click', () => {
  mainSearchInput.value = ''

  mainLogo.classList.remove('main-logo-close')
  mainWatalog.classList.remove('main-catalog-wrapper-close')
  searchMenu.classList.remove('search-menu-open')
  bodyOpenCatalog.classList.remove('body-hidden-search')
  closeInput.classList.remove('main-search-input-close-open')
})

searchMenu.addEventListener('click', (e) => {
  if(e.target.classList[1] == 'search-menu-open') {
    mainLogo.classList.remove('main-logo-close')
    mainWatalog.classList.remove('main-catalog-wrapper-close')
    searchMenu.classList.remove('search-menu-open')
    bodyOpenCatalog.classList.remove('body-hidden-search')
  }
})
mainSearchInput.addEventListener('keyup', () => {

  closeInput.classList.remove('main-search-input-close-open')

  if(mainSearchInput.value !== '') {
    mainLogo.classList.add('main-logo-close')
    mainWatalog.classList.add('main-catalog-wrapper-close')
    searchMenu.classList.add('search-menu-open')
    bodyOpenCatalog.classList.add('body-hidden-search')
    closeInput.classList.add('main-search-input-close-open')

    topSum = menuHeight.offsetHeight + mainHeight.offsetHeight;
    if($('.header').hasClass('header_fixed')) {
      $(searchMenu).css('top', `${mainHeight.offsetHeight}px`)
    } else {
    $(searchMenu).css('top', `${topSum}px`)

    }
  } 
  else {
    mainLogo.classList.remove('main-logo-close')
    mainWatalog.classList.remove('main-catalog-wrapper-close')
    searchMenu.classList.remove('search-menu-open')
    bodyOpenCatalog.classList.remove('body-hidden-search')

  }


  // if(containerMenu.classList.contains('container-menu-open') == false){
  //   bodyOpenCatalog.classList.remove('body-hidden')
  // } 
})




// services.htmk validate form

$(".services-form").validate({
  errorElement: "span",
  rules: {
    name: {
      required: true,
    },
    textbox: {
      required: true,
    },
    telephone: {
      required: true,
    },
    model: {
      required: true,
    },
    customCheckbox: {
      required: true,
    },
  },
  messages: {
    name: {
      required: 'Заполните поле',
    },
    textbox: {
      required: 'Заполните поле',
    },
    telephone: {
      required: 'Заполните поле',
    },
    model: {
      required: 'Заполните поле',
    },
    customCheckbox: {
      required: 'Заполните поле',
    },
  },
});



let callMap = document.querySelector('#callMap')
if(callMap) {
  ymaps.ready(function () {
    var callMap = new ymaps.Map('callMap', {
            center: [53.924723, 27.511615],
            zoom: 12,
            controls: [],
        }, {
            searchControlProvider: 'yandex#search'
        });  
  
        callMap.geoObjects
        .add(new ymaps.Placemark([53.924723, 27.511615], {
          // balloonContent: 'цвет <strong>воды пляжа бонди</strong>'
      }, {
          preset: 'islands#dotIcon',
          iconColor: '#E94336'
      }));
      callMap.behaviors.disable('scrollZoom');
  });
}





let mobMenuSearch = document.querySelector('.mob-menu-search');

mobMenuSearch.addEventListener('click', () => {
 
  if(containerMenu.classList.contains('container-menu-open') == false) {
    mainSearchForm.classList.toggle('main-search-form-open')
    mainOpenCatalog.classList.toggle('main-open-catalog')
    // search-menu search-menu-open
    searchMenu.classList.remove('search-menu-open')
   } 

})


//LightGallery

// lightGallery(document.getElementById('productGallery'), {
//   licenseKey: 'your_license_key',
//   speed: 500,
  
// });

var lg = document.getElementById('productGallery');
 
// lg.addEventListener('onBeforeOpen.lg', function(e){
//   console.log('asdasd')
// }, false);
 
lightGallery(lg);







//Показать только отличия compare2.html
let inputSame = document.getElementById('f_v_1')
let inputSame2 = document.getElementById('f_v_2')



$(".compare-checkbox").on("click", function () {
  if ($(this).is(":checked")) {
    
      inputSame2.checked = true
      inputSame.checked = true

      $('.swiper-slide-same').addClass('swiper-slide-same-hidden')
  } else {
      inputSame2.checked = false
      inputSame.checked = false

      $('.swiper-slide-same').removeClass('swiper-slide-same-hidden')
  }
})




//скролл
$("a.scroll-to").on("click", function(e){
  e.preventDefault();
  var anchor = $(this).attr('href');
  $('html, body').stop().animate({
      scrollTop: $(anchor).offset().top - 100
  }, 800);
});



//Открываем меню

/*
$(document).ready(function() {
  let menudesktopLi = document.querySelectorAll('.menu-desktop li')
  // menu-desktop-ul
  
  menudesktopLi.forEach((elem) => {
    // console.log($(elem).find('.menu-desktop-ul')[0])
    // let move = $(elem).find('.menu-desktop-ul')[0].classList
    // console.log(move)
    // document.querySelector(`${elem} menu-desktop-ul`)
    let liA = $(elem).children('.menu-desktop-ul')
    // console.log(liA)
  // console.log($(elem).children('.menu-desktop-ul')[0])
  if($(liA[0]).hasClass('menu-desktop-ul')) {
   let liAx =  $(liA)[0]
    console.log(liAx)
    if(matchMedia) {
        const screen = window.matchMedia('(max-width:1024px)');
        screen.addListener(changes);
        changes(screen);
      }
      function changes(screen) {
        if(screen.matches) {
          //экран менее 1024
          // liAx.prepend($('body'))
          
        } else {
          //экран более 1024
          // $('.card-more-info').prepend($('#tabs'))
         
        }
      }
  } 
  
  // console.log($(elem).children('.menu-desktop-ul')[0].classList[0])
    elem.addEventListener('click', (t) => {
      elem.children[0].classList.toggle('menu-desktop-open')
    })
  
    // $(elem).click(function(){
    //   if($(this).hasClass("list-open")) {
    //     $(this).removeClass('list-open');
    //   } else {
    //     $(this).addClass('list-open');
    //   }
    // });
  
     
  
  
  })
})

*/


//убираем активный пункт в меню 
let menuDesktopHover = document.querySelectorAll('.menu-desktop li')

menuDesktopHover.forEach((e) => {
  e.addEventListener('mouseover', (mouse) => {
    if(mouse.target){
    $('.menu-desktop-ul').removeClass('menu-desktop-ul-open')
    } 
  })
})



