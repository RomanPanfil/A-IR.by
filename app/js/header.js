// if (matchMedia) {
//   var screen1024 = window.matchMedia("(max-width:1024px)");
//   screen1024.addListener(changes);
//   changes(screen1024);
// }


  $(function () {
    let header = $(".header"),
      headerMenu = $(".header .menu"),
      headerNav = $(".header .nav-wrapper"),
      wrapperFixed = $(".wrapper");
  
    $(window).scroll(function () {
      if ($(this).scrollTop() > 1) {
        header.addClass("header_fixed");
        wrapperFixed.addClass("wrapper_fixed");
        headerMenu.hide();
        headerNav.hide();
      } else {
        header.removeClass("header_fixed");
        wrapperFixed.removeClass("wrapper_fixed");
        headerMenu.show();
        headerNav.show();
      }
    });
  });


