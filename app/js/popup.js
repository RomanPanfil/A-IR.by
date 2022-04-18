$(document).on("click", ".mfp-link", function () {
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
    slider1: $(function () {
      const popupSliderEl = new Swiper('.vertical-slider', {
        slidesPerView: 4,
        slideToClickedSlide: true,
        loop: true,
        direction: 'vertical',

        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
    }),
    slider2: $(function () {
      const slider2 = new Swiper('.main-slider', {
        loop: true,
      });
    }),
    callbacks: {
      open: function () {
        setTimeout(function () {
          $(".mfp-wrap, .mfp-bg").addClass("delay-back");
          $(".mfp-popup").addClass("delay-back");
        }, 700);
      },
    },
  });
  return false;
});
