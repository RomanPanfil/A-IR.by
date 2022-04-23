let minusBtn = document.querySelector(".btn-minus");
let plusBtn = document.querySelector(".btn-plus");
let inputBtn = document.querySelector(".card-item-counter-input");
let reg = /[^\d]/g;
plusBtn.onclick = () => {
  console.log("plus");
  inputBtn.value++;
};

minusBtn.onclick = () => {
  inputBtn.value == 1 ? false : inputBtn.value--;
};

inputBtn.oninput = function () {
  this.value = this.value.replace(reg, "");
};

// productOpen.forEach((el) => {
//   el.addEventListener("click", (e)=> {
//     let productItem = document.querySelector(".product-item");
//     productItem.classList.toggle("product-open");

//     if (isOpen === true) {
//       // productItem.classList.add("product-open");
//       productLike.src = "./images/icons/product-like-shadow.svg";
//       productAdd.src = "./images/icons/product-add-shadow.svg";
//       productArrow.src = "./images/icons/product-arrow-left.svg";
//       productCart.innerHTML = "Оформить";
//     } else {
//       // productItem.classList.remove("product-open");
//       productLike.src = "./images/icons/product-like.svg";
//       productAdd.src = "./images/icons/product-add.svg";
//       productArrow.src = "./images/icons/product-arrow.svg";
//       productCart.innerHTML = "В корзину";
//     }

//   })
// For Arina
let productOpen = document.querySelectorAll(".product-item-open");
let productItem = document.querySelector(".product-item");
function kakNibud(e) {
  // e.classList.toggle("product-open");
  if (e.target.classList[0] === "product-item-open") {
    productItem.classList.toggle("product-open");
  }
}
productOpen.forEach((el) => {
  el.addEventListener("click", kakNibud);
});
// $(document).on("click", ".product-item-open", function () {
//   var parent = $(this).closest(".product-item");
//   parent.classList.toggle("product-open");
// console.log(parent);

// var input = +parent.find(".input").val();
// var perItem = +parent.find(".target-value").attr("data-price");
// var price = parent.find(".target-value");
// var total = (input * perItem).toFixed(2);
// price.html(total + `<span>РУБ.</span>`);
// });

// let mql = window.matchMedia("(min-width: 1260px)");

// window.addEventListener("resize", () => {
//   if (mql.matches) {
//   } else {
//     console.log("done");

//     document.querySelector(".zxc").classList.remove("swiper");
//     document.querySelector(".zxc-wrap").classList.remove("swiper-wrapper");
//     let arr = document.querySelectorAll(".zxc-slide");
//     arr.forEach((el) => {
//       el.classList.remove("swiper-slide");
//     });
//   }
// });
// const mySwiper = new Swiper(".product-swiper", {
//   // Optional parameters
//   loop: true,
//   slidesPerView: 4,
//   // Navigation arrows
//   navigation: {
//     nextEl: ".swiper-button-next",
//     prevEl: ".swiper-button-prev",
//   },
// });

// let mql = window.matchMedia("(min-width: 1260px)");

// window.addEventListener("resize", () => {
//   if (mql.matches) {
//   } else {
//     document.querySelector(".zxc").classList.remove("swiper");
//     document.querySelector(".zxc-wrap").classList.remove("swiper-wrapper");
//     let arr = document.querySelectorAll(".zxc-slide");
//     arr.forEach((el) => {
//       el.classList.remove("swiper-slide");
//       el.classList.remove("swiper-slide-duplicate");
//       el.classList.remove("swiper-slide-duplicate-active");
//       el.classList.remove("swiper-slide-duplicate-next");
//     });
//   }
// });

// const breakpoint = window.matchMedia("(min-width:1260px)");

// let mySwiper;

// const breakpointChecker = function () {
//   if (breakpoint.matches === true) {
//     if (mySwiper !== undefined) {
//       document.querySelector(".zxc").classList.remove("swiper");
//       document.querySelector(".zxc-wrap").classList.remove("swiper-wrapper");
//       let arr = document.querySelectorAll(".zxc-slide");
//       arr.forEach((el) => {
//         el.classList.remove("swiper-slide");
//         el.classList.remove("swiper-slide-duplicate");
//         el.classList.remove("swiper-slide-duplicate-active");
//         el.classList.remove("swiper-slide-duplicate-next");
//       });
//       mySwiper.destroy(true, true);
//     }

//     // or/and do nothing
//     return;

//     // else if a small viewport and single column layout needed
//   } else if (breakpoint.matches === false) {
//     // fire small viewport version of swiper
//     return enableSwiper();
//   }
// };
// const enableSwiper = function () {
//   mySwiper = new Swiper(".product-swiper", {
//     // Optional parameters
//     loop: true,
//     slidesPerView: 4,
//     // Navigation arrows
//     navigation: {
//       nextEl: ".swiper-button-next",
//       prevEl: ".swiper-button-prev",
//     },
//   });
// };

// breakpoint.addListener(breakpointChecker);

// breakpointChecker();
const productSliderMarkUp = $(".product-swiper").clone();
let enableSwiper = undefined;
if (matchMedia) {
  var screen768 = window.matchMedia("(max-width:1024px)");
  screen768.addListener(changes);
  changes(screen768);
}
function changes(screen768) {
  if (screen768.matches) {
    $(".product-swiper-mob").append(productSliderMarkUp);
    // enableSwiper.destroy(true, true);
    // document.querySelector(".zxc").classList.remove("swiper");
    // document.querySelector(".zxc-wrap").classList.remove("swiper-wrapper");
    // let arr = document.querySelectorAll(".zxc-slide");
    // arr.forEach((el) => {
    //   el.classList.remove("swiper-slide");
    //   el.classList.remove("swiper-slide-duplicate");
    //   el.classList.remove("swiper-slide-duplicate-active");
    //   el.classList.remove("swiper-slide-duplicate-next");
    // });
  } else {
    // arr.forEach((el) => {
    //   el.classList.add("swiper-slide");
    //   el.classList.add("swiper-slide-duplicate");
    //   el.classList.add("swiper-slide-duplicate-active");
    //   el.classList.add("swiper-slide-duplicate-next");
    // });

    $(".product-swiper-desc").append(productSliderMarkUp);
    new Swiper(".product-swiper-desc .product-swiper", {
      // Optional parameters
      loop: true,
      slidesPerView: 4,
      // Navigation arrows
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });

    console.log("else");
    //экран более 768
  }
}
