if (document.querySelector(".making-order-validate")) {
  // let cardBreackpoint = $("#card-breackpoint").offset().top;
  // var offBottom = $("#card-breackpoint").offset().top + $("#card-breackpoint").outerHeight();
  // let cardSticky = $(".making-order-info");
  // const cardHeight = cardSticky.innerHeight();
  // const box = document.querySelector('#card-breackpoint').getBoundingClientRect()
  // const stickyBox = document.querySelector('.making-order-info').getBoundingClientRect()

  // window.addEventListener("resize", function () {
  //   cardBreackpoint = $("#card-breackpoint").offset().top;
  // });
  const stickyBlock = document.querySelector('.making-order-info')
  const card = document.querySelector('#card-breackpoint')

  function flipOrSticky() {
    const box = card.getBoundingClientRect()
    const stickyBox = stickyBlock.getBoundingClientRect()
    const boxTop = box.top
    const boxBottom = box.bottom
    const stickyBottom = stickyBox.height
    const py = window.pageYOffset

    if (py > boxTop + py) {
      if (py < (boxBottom + py - stickyBottom - 100)) {
        stickyBlock.classList.add("sticky-box");
        stickyBlock.classList.remove("card-breackpoint-flipbottom");
      } else {
        stickyBlock.classList.remove("sticky-box");
        stickyBlock.classList.add("card-breackpoint-flipbottom");
      }
    } else {
      stickyBlock.classList.remove("sticky-box", "card-breackpoint-flipbottom");
    }
    // if (py > boxTop + py && py < (boxBottom + py - stickyBottom - 185)) {
    //   stickyBlock.classList.add("card-breackpoint-open");
    // } else {
    //   stickyBlock.classList.remove("card-breackpoint-open");
    // }
  }

  window.addEventListener("scroll", flipOrSticky);
  window.addEventListener("load", flipOrSticky);
}

(function () {
  let tabOrder = $('#making-order-pickup .making-order-content > div');
  let tabPayment = $('#making-order-payment .making-order-content > div');

  tabOrder.hide().filter(':first').show();

  // Клики по вкладкам.
  $('#making-order-pickup .making-order-tabs a').click(function () {
    tabOrder.hide();
    tabOrder.filter(this.hash).show();
    $('#making-order-pickup .making-order-tabs a').removeClass('active');
    $(this).addClass('active');
    return false;
  }).filter(':first').click();

  // Клики по вкладкам.
  $('#making-order-payment .making-order-tabs a').click(function () {
    tabPayment.hide();
    tabPayment.filter(this.hash).show();
    $('#making-order-payment .making-order-tabs a').removeClass('active');
    $(this).addClass('active');
    return false;
  }).filter(':first').click();
}());

let header = document.querySelector('.making-order-header');
let list = document.querySelector('.making-order-list');

if (header) {
  header.addEventListener('click', () => {
    list.classList.toggle('active')
    header.classList.toggle('opened')
  })
}

let orderForm = document.querySelector('.making-order-payment .making-order-form');

(function () {
  $('.making-order-payment #tab-2 input[type=radio]').change(function () {
    if ($(this).val() === 'Безналичный расчёт') {
      orderForm.classList.add('active');
    } else {
      orderForm.classList.remove('active')
    }
  })
}());

(function () {
  if (matchMedia) {
    const screen576 = window.matchMedia('(max-width:576px)');
    screen576.addListener(changes);
    changes(screen576);
  }

  function changes(screen) {
    if (screen.matches) {
      $('.making-order-comment.self-call').before($('#map-address'));
    } else {
      $('.col-xs-6.map').append($('#map-address'))
    }
  }
})();

let allInputs = document.querySelector('.making-order-myAddress');
let otherAddressForm = document.querySelector('.making-order-pickup .making-order-form');

if (allInputs && otherAddressForm) {
  allInputs.addEventListener('click', (e) => {
    if (e.target.classList[0] === 'other') {
      otherAddressForm.style.display = 'block';
    } else {
      otherAddressForm.style.display = 'none';
    }
  })
}


let rentCalcTab = document.querySelector('.rent-calculation-head')

if(rentCalcTab !== null && rentCalcTab !== undefined) {
  rentCalcTab.addEventListener('click', () => {
    const rentCalcBody = document.querySelector('.rent-calculation')

    rentCalcBody.classList.toggle('active')
    rentCalcTab.classList.toggle('active')
  })
}
