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



if (matchMedia) {
  let screen1023 = window.matchMedia("(max-width:1024px)");
  screen1023.addListener(accordionChangesPop);
  accordionChangesPop(screen1023);
}

function accordionChangesPop(screen1023) {
  if (screen1023.matches) {
    $(".catalog-products-filter-popular").appendTo($(".filter-adaptive"));
  } else {
    $(".catalog-products-filter-popular").appendTo($(".filter-adaptive-first"));
  }
}


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