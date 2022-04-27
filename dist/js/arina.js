const ratings = document.querySelectorAll('.card-item-rating');
const acc = document.getElementsByClassName("accordion-items-title");

let ratingActive;
let ratingValue;

// tabs on page card.html
$(function () {
  let tab = $('#tabs .tabs-items > div.tabs-item');

  tab.hide().filter(':first').show();

  // Клики по вкладкам.
  $('#tabs .tabs-nav a').click(function () {
    tab.hide();
    tab.filter(this.hash).show();
    $('#tabs .tabs-nav a').removeClass('active');
    $(this).addClass('active');
    return false;
  }).filter(':eq(1)').click();

  // Клики по якорным ссылкам.
  $('.tabs-target').click(function () {
    $("#tabs .tabs-nav * a[href*='#tab-1']").click();
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

for (let i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    let panel = this.nextElementSibling;

    panel.classList.toggle('active');
    this.classList.toggle("active");

    if (this.classList[1] === "active") {
      acc[i].children[0].style.transform = "rotate(-180deg)";
    } else {
      acc[i].children[0].style.transform = "rotate(0deg)";
    }
  });
}

if (matchMedia) {
  let screen1024 = window.matchMedia("(max-width:1024px)");
  screen1024.addListener(accordionChanges);
  accordionChanges(screen1024);
}

function accordionChanges(screen1024) {
  if (screen1024.matches) {
    $('.accordion-content.tab1').appendTo($(".accordion.tab1"));
    $('.accordion-content.tab2').appendTo($(".accordion.tab2"));
    $('.accordion-content.tab3').appendTo($(".accordion.tab3"));
    $('.accordion-content.tab4').appendTo($(".accordion.tab4"));
    $('#tabs').appendTo($(".card-info-media"));
    $('.reviews.ui-btn.all').appendTo($(".card-reviews"));
    $('.card-item-services').prependTo($('.card-item-container'));
  } else {
    $('.accordion-content.tab1').appendTo($(".tabs-items #tab-1"));
    $('.accordion-content.tab2').appendTo($(".tabs-items #tab-2"));
    $('.accordion-content.tab3').appendTo($(".tabs-items #tab-3"));
    $('.accordion-content.tab4').appendTo($(".tabs-items #tab-4"));
    $('#tabs').appendTo($(".card-item-more-info"));
    $('.reviews.ui-btn.all').prependTo($(".card-reviews-btn"));
    $('.card-item-services').appendTo($(".card-item-specifications"));
  }
}