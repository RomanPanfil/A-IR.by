$(function () {
  let header = $(".header"),
    headerMenu = $(".header .menu"),
    headerNav = $(".header .nav-wrapper");

  $(window).scroll(function () {
    if ($(this).scrollTop() > 1) {
      header.addClass("header_fixed");
      headerMenu.hide();
      headerNav.hide();
    } else {
      header.removeClass("header_fixed");
      headerMenu.show();
      headerNav.show();
    }
  });
});

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
