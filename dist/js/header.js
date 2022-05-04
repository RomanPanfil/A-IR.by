// if (matchMedia) {
//   var screen1024 = window.matchMedia("(max-width:1024px)");
//   screen1024.addListener(changes);
//   changes(screen1024);
// }


  $(function () {
    let header = $(".header"),
      headerMenu = $(".header .menu"),
      headerNav = $(".header .nav-wrapper"),
      wrapperFixed = $(".wrapper"),
      headerHeight = $('header').outerHeight(true);
    $(window).scroll(function () {
      let cardBreackpointOpen = $('.card-breackpoint-open');
      
      let headerCardFixedHeight = $('.header_fixed').innerHeight();
      cardBreackpointOpen.css('top', headerCardFixedHeight + 'px')
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
// });

// const ani = () => {
//   let scrollDistance = -document.body.getBoundingClientRect().top;
//   let height100 =
//     (scrollDistance /
//       (document.body.getBoundingClientRect().height -
//         document.documentElement.clientHeight)) *
//     100;

//   console.log();
//   console.log(Math.floor(height100));
//   console.log(document.body.getBoundingClientRect().height + " - 1 число ");
//   console.log(document.documentElement.clientHeight + " - 2 число ");
//   console.log(scrollDistance)
// };

// window.addEventListener("scroll", ani);
