// if (matchMedia) {
//   let screen1023 = window.matchMedia("(max-width:1024px)");
//   screen1023.addListener(accordionChangesPop);
//   accordionChangesPop(screen1023);
// }

// function accordionChangesPop(screen1023) {
//   if (screen1023.matches) {
//     // $(".popup-card-wrapper-adaptive").appendTo($(".popup-card"));
//     // $(".product-item-adaptive").appendTo($(".product-info-adaptive"));
//     let productAdaptive = document.querySelectorAll(".product-item-adaptive");

//     $(".product-item-adaptive").each(function (el) {
//       $(this).appendTo(".product-info-adaptive");

//       console.log(this);
//     });
//   } else {
//     // $(".popup-card-wrapper-adaptive").appendTo($(".qwe"));
//   }
// }
// accordionChangesPop(screen1023);

catalogLine.onclick = () => {
  catalog.classList.add("catalog-products-line");
  catalog.classList.remove("catalog-products-grid");
  catalogGrid.style.opacity = "0.3";
  catalogLine.style.opacity = "1";
};
catalogGrid.onclick = () => {
  catalog.classList.add("catalog-products-grid");
  catalog.classList.remove("catalog-products-line");
  catalogGrid.style.opacity = "1";
  catalogLine.style.opacity = "0.3";
};
catalogLineMob.onclick = () => {
  catalog.classList.add("catalog-products-line");
  catalog.classList.remove("catalog-products-grid");
  catalogGridMob.style.opacity = "0.3";
  catalogLineMob.style.opacity = "1";
};
catalogGridMob.onclick = () => {
  catalog.classList.add("catalog-products-grid");
  catalog.classList.remove("catalog-products-line");
  catalogGridMob.style.opacity = "1";
  catalogLineMob.style.opacity = "0.3";
};

catalogGrid.click();
catalogGridMob.click();
