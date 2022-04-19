$(document).on("click", ".mfp-link", function () {
  $(document).ready(function () {
    let minusBtn = document.querySelector(".btn-minus");
    let plusBtn = document.querySelector(".btn-plus");
    let inputBtn = document.querySelector(".card-item-counter-input");
    // let reg = /[^\d]/g;
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
  });

  var a = $(this);
  $.magnificPopup.open({
    items: { src: a.attr("data-href") },
    type: "ajax",
    overflowY: "scroll",
    removalDelay: 610,
    mainClass: "my-mfp-zoom-in",
    ajax: {
      tError: "Error. Not valid url",
    },
    callbacks: {
      open: function () {
        setTimeout(function () {
          $(".mfp-wrap, .mfp-bg").addClass("delay-back");
          $(".mfp-popup").addClass("delay-back");
        }, 700);
      },
    },
  });
  return false;
});
