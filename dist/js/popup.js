$(document).on("click", ".mfp-link", function () {
  $(document).ready(function () {
    const ratings = document.querySelectorAll('.card-item-rating');

    let ratingActive;
    let ratingValue;

    if (ratings.length > 0) {
      initRatings();
    }

    function initRatings() {
      for (let i = 0; i < ratings.length; i++) {
        const rating = ratings[i];

        if (rating.classList.contains('rating-set')) {
          setRating(rating);
        }

        initRatingVars(rating);
        setRatingActiveWidth();
      }
    }

    function initRatingVars(rating) {
      ratingActive = rating.querySelector('.card-item-rating-active');
      ratingValue = rating.querySelector('.card-item-rating-value');
    }

    function setRatingActiveWidth(index = ratingValue.innerHTML) {
      const ratingActiveWidth = index / 0.05;

      if (index === 'Нет оценки') {
        ratingActive.style.width = '0%';
      } else {
        ratingActive.style.width = `${ratingActiveWidth}%`;
      }
    }

    function setRating(rating) {
      const ratingItems = rating.querySelectorAll('.card-item-rating-item');

      for (let i = 0; i < ratingItems.length; i++) {
        const ratingItem = ratingItems[i];

        ratingItem.addEventListener('mouseenter', function (e) {
          initRatingVars(rating);
          setRatingActiveWidth(ratingItem.value);
        });

        ratingItem.addEventListener('mouseleave', function (e) {
          setRatingActiveWidth();
        });

        ratingItem.addEventListener('click', function (e) {
          initRatingVars(rating);

          ratingValue.innerHTML = ratingItem.value;
          setRatingActiveWidth();
        })
      }
    }
  });

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
