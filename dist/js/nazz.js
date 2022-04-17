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

let productOpen = document.querySelectorAll(".product-item-open");
let productItem = document.querySelector(".product-item");
let isOpen = false;
// productOpen.onclick = () => {
//   console.log(productOpen);
// };

productOpen.forEach((el) => {
  el.onclick = () => {
    isOpen = !isOpen;

    if (isOpen === true) {
      productItem.classList.add("product-open");
      productLike.src = "./images/icons/product-like-shadow.svg";
      productAdd.src = "./images/icons/product-add-shadow.svg";
      productArrow.src = "./images/icons/product-arrow-left.svg";
      productCart.innerHTML = "Оформить";
    } else {
      productItem.classList.remove("product-open");
      productLike.src = "./images/icons/product-like.svg";
      productAdd.src = "./images/icons/product-add.svg";
      productArrow.src = "./images/icons/product-arrow.svg";
      productCart.innerHTML = "В корзину";
    }
  };
});
