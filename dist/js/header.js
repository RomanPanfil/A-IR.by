


  $(function () {
    let header = $(".header"),
      headerMenu = $(".header .menu"),
      headerNav = $(".header .nav-wrapper"),
      wrapperFixed = $(".wrapper"),
      footerBreackpoint = $("#footer"),
      footerJs = document.getElementById('footer'),
      footerHeight = $('#footer').innerHeight(),
      headerHeight = $('header').outerHeight(true);
      
    

    $(window).scroll(function () {
      let cardBreackpointOpen = $('.card-breackpoint-open');
      let headerCardFixedHeight = $('.header_fixed').innerHeight();

      function getCoords(elem) {
        let box = elem.getBoundingClientRect();
        
        return {
          top: box.top + window.pageYOffset,
          // left: box.left + window.pageXOffset,

        };
      
      }
    console.log(getCoords(footerJs));

      

      // const rect = footerJs.getBoundingClientRect()

      // console.log('Смещение Y относительно документа:', rect.y + pageYOffset)
      console.log(window.scrollY)
      console.log(document.body.scrollHeight + 'asdasd')

      console.log(document.body.innerHeight)
      // console.log(footerJs.scrollY + "----------")

      if (matchMedia) {
        var screen678 = window.matchMedia("(max-width:678px)");
        screen678.addListener(changes);
        changes(screen678);
      }
      function changes(screen678) {
        if (screen678.matches) {
          cardBreackpointOpen.css({
            'top': 'initial',
            'bottom': 0
          })
          
          if (window.scrollY > 4500) {
            cardBreackpointOpen.css({
              'top': 'initial',
              'position': 'absolute',
              'bottom': footerHeight + 'px',
            })
            
          } else {
            cardBreackpointOpen.css({
              'top': 'initial',
              'position': 'fixed',
              'bottom': 0,
            })
          }
         
        } else {
          cardBreackpointOpen.css('top', headerCardFixedHeight + 'px')
          cardBreackpointOpen.css('bottom', 'initial')
         
        }
      }
      
    
      // console.log(headerCardFixedHeight)

      if ($(this).scrollTop() > headerHeight) {
        wrapperFixed.css('paddingTop', headerHeight + 'px')
        header.addClass("header_fixed");
        wrapperFixed.addClass("wrapper_fixed");
        headerMenu.hide();
        headerNav.hide();
      } else {
        wrapperFixed.css('paddingTop', 0)
        header.removeClass("header_fixed");
        wrapperFixed.removeClass("wrapper_fixed");
        headerMenu.show();
        headerNav.show();
      }
    });
  });


  // let cardStickyBtn = document.querySelector('.card-sticky-btn')

  // if (matchMedia) {
  //   var screen1024 = window.matchMedia("(max-width:1024px)");
  //   screen1024.addListener(changes);
  //   changes(screen1024);
  // }

  // function changes(screen1024) {
  //   if (screen1024.matches) {
  //     cardStickyBtn.innerHTML = ''
  //   } else {
  //     cardStickyBtn.innerHTML = 'В корзину' 
  //   }
  // }