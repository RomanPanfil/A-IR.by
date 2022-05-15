


  $(function () {
    let header = $(".header"),
      headerMenu = $(".header .menu"),
      headerNav = $(".header .nav-wrapper"),
      wrapperFixed = $(".wrapper"),
      footerBreackpoint = $("#footer"),
      footerHeight = $('#footer').innerHeight(),
      headerHeight = $('header').outerHeight(true);
      
    

    $(window).scroll(function () {
      let cardBreackpointOpen = $('.card-breackpoint-open');
      let headerCardFixedHeight = $('.header_fixed').innerHeight();


      let offsetFooter = footerBreackpoint.offset().top
   

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
          
          if (offsetFooter < document.documentElement.clientHeight + window.scrollY) {
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

