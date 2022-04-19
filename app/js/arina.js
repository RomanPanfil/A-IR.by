const ratings = document.querySelectorAll('.card-item-rating');



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
  let ratingActive;
  let ratingValue;

  for (let i = 0; i < ratings.length; i++) {
    const rating = ratings[i];
    initRating(rating);
  }

  function initRating(rating) {
    initRatingVars(rating);
    setRatingActiveWidth();

    if (rating.classList.contains('rating-set')) {
      setRating(rating);
    }
  }

  function initRatingVars(rating) {
    ratingActive = rating.querySelector('.card-item-rating-active');
    ratingValue = rating.querySelector('.card-item-rating-value');
  }

  function setRatingActiveWidth(index = ratingValue.innerHTML) {
    const ratingActiveWidth = index / 0.05;
    ratingActive.style.width = `${ratingActiveWidth}%`;
  }

  function setRating(rating) {
    const ratingItems = rating.querySelectorAll('.card-item-rating-item');

    for (let i = 0; i < ratingItems.length; i++) {
      const ratingItem = ratingItems[i];
  
      ratingItem.addEventListener('mouseenter', function (e) {
        initRatingVars(rating);
        setRatingActiveWidth(ratingItem.value);
      })
    }
  }
}