const ratings = document.querySelectorAll('.card-item-rating');

let ratingActive;
let ratingValue;

// tabs on page card.html
$(function () {
  let tab = $('#tabs .tabs-items > div');
  tab.hide().filter(':first').show();

  // Клики по вкладкам.
  $('#tabs .tabs-nav a').click(function () {
    tab.hide();
    tab.filter(this.hash).show();
    $('#tabs .tabs-nav a').removeClass('active');
    $(this).addClass('active');
    return false;
  }).filter(':first').click();

  // Клики по якорным ссылкам.
  $('.tabs-target').click(function () {
    $('#tabs .tabs-nav a[href=' + $(this).attr('href') + ']').click();
  });
});

// rating stars 
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