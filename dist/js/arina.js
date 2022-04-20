const ratings = document.querySelectorAll('.card-item-rating');
const btnAccordion = document.querySelector('.accordion-items-title');
const contentAccordion = document.querySelector('.accordion-content');

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

// btnAccordion.addEventListener('click', function() {
//   console.log(contentAccordion)
//   contentAccordion.classList.toggle('active');
// })

var acc = document.getElementsByClassName("accordion-items-title");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    this.classList.toggle("active");

    /* Toggle between hiding and showing the active panel */
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}

if (matchMedia) {
  var screen1024 = window.matchMedia("(max-width:1024px)");
  screen1024.addListener(changes);
  changes(screen1024);
}

function changes(screen768) {
  if (screen768.matches) {
    $('.accordion-content').appendTo($(".accordion"));
  } else {
    $('.accordion-content').appendTo($(".tabs-items #tab-1"));
  }
}