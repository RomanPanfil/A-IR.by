const ratings = document.querySelectorAll(".card-rating");
const acc = document.getElementsByClassName("accordion-items-title");

let ratingActive;
let ratingValue;

// tabs on page card.html
$(function () {
  let tab = $("#tabs .tabs-items > div.tabs-item");

  tab.hide().filter(":first").show();

  // click on tabs
  $("#tabs .tabs-nav a")
    .click(function () {
      tab.hide();
      tab.filter(this.hash).show();
      $("#tabs .tabs-nav a").removeClass("active");
      $(this).addClass("active");
      return false;
    })
    .filter(":eq(1)")
    .click();

  // if you click on a link 'перейти к описанию' then will open the tab 'описание'
  $(".tabs-target").click(function () {
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

    if (rating.classList.contains("rating-set")) {
      setRating(rating);
    }

    initRatingVars(rating);
    setRatingActiveWidth();
  }
}

function initRatingVars(rating) {
  ratingActive = rating.querySelector(".card-rating-active");
  ratingValue = rating.querySelector(".card-rating-value");
}

function setRatingActiveWidth(index = ratingValue.innerHTML) {
  const ratingActiveWidth = index / 0.05;

  if (index === "Нет оценки") {
    ratingActive.style.width = "0%";
  } else {
    ratingActive.style.width = `${ratingActiveWidth}%`;
  }
}

function setRating(rating) {
  const ratingItems = rating.querySelectorAll(".card-rating-item");

  for (let i = 0; i < ratingItems.length; i++) {
    const ratingItem = ratingItems[i];

    ratingItem.addEventListener("mouseenter", function (e) {
      initRatingVars(rating);
      setRatingActiveWidth(ratingItem.value);
    });

    ratingItem.addEventListener("mouseleave", function (e) {
      setRatingActiveWidth();
    });

    ratingItem.addEventListener("click", function (e) {
      initRatingVars(rating);

      ratingValue.innerHTML = ratingItem.value;
      setRatingActiveWidth();
    });
  }
}

// accordion arrow rotate (you can see this in small size screen)
for (let i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    let panel = this.nextElementSibling;

    panel.classList.toggle("active");
    this.classList.toggle("active");

    if (this.classList[1] === "active") {
      acc[i].children[0].style.transform = "translate(0, -50%) rotate(-180deg)";
    } else {
      acc[i].children[0].style.transform = "translate(0, -50%) rotate(0)";
    }
  });
}

// moving some blocks in to another block when the screen size is 1024px
// if (matchMedia) {
//   let screen1024 = window.matchMedia("(max-width:1024px)");
//   screen1024.addListener(accordionChanges);
//   accordionChanges(screen1024);
// }

// function accordionChanges(screen1024) {
//   if (screen1024.matches) {
//     $(".accordion-content.tab1").appendTo($(".accordion.tab1"));
//     $(".accordion-content.tab2").appendTo($(".accordion.tab2"));
//     $(".accordion-content.tab3").appendTo($(".accordion.tab3"));
//     $(".accordion-content.tab4").appendTo($(".accordion.tab4"));
//     $("#tabs").appendTo($(".card-info-media"));
//     $(".reviews.ui-btn.all").appendTo($(".card-reviews"));
//     $(".card-services").appendTo($(".card-wrapper.card-radio"));
//     $(".card-container-adaptive").appendTo($(".card-info-media"));
//   } else {
//     $(".accordion-content.tab1").appendTo($(".tabs-items #tab-1"));
//     $(".accordion-content.tab2").appendTo($(".tabs-items #tab-2"));
//     $(".accordion-content.tab3").appendTo($(".tabs-items #tab-3"));
//     $(".accordion-content.tab4").appendTo($(".tabs-items #tab-4"));
//     $("#tabs").appendTo($(".card-more-info"));
//     $(".reviews.ui-btn.all").prependTo($(".card-reviews-btn"));
//     $(".card-services").appendTo($(".card-specifications"));
//     $(".card-container-adaptive").appendTo($(".card-container"));
//   }
// }


let fav = document.querySelector('.card-fav');
let comparison = document.querySelector('.card-comparison');
if(fav) {
  fav.addEventListener('click', selectedFav)
  comparison.addEventListener('click', selectedComparison)

  // selected favorite
  function selectedFav() {
    fav.children[0].style.fill = '#2A4455';
    fav.children[1].innerText = 'В избранном';
  }

  // selected comparison
  function selectedComparison() {
    comparison.children[0].style.fill = '#2A4455';
    comparison.children[1].innerText = 'В сравнении';
  }
}
