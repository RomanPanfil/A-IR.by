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

$(function () {
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
});

let header = document.querySelector('.making-order-header');
let list = document.querySelector('.making-order-list');

if (header) {
  header.addEventListener('click', () => {
    list.classList.toggle('active')
    header.classList.toggle('opened')
  })
}

let orderForm = document.querySelector('.making-order-payment .making-order-form');

$(function () {
  $('.making-order-payment #tab-2 input[type=radio]').change(function () {
    if ($(this).val() === 'Безналичный расчёт') {
      orderForm.classList.add('active');
    } else {
      orderForm.classList.remove('active')
    }
  })
})

//cal-arr

// validate for marking-order.html
$(".making-order-validate").validate({
  errorElement: "span",
  rules: {
    name: {
      required: true,
      lettersonly: true,
    },

    email: {
      required: true,
      email: true,
      // emailErr: true,
    },

    telephone: {
      required: true,
      minlength: 19,
      // telephone: true,
    },

    locality: {
      required: true,
      lettersonly: true,
    },

    street: {
      required: true,
      lettersonly: true,
    },

    house: {
      required: true,
      number: true,
    },

    company: {
      required: true,
      lettersonly: true,
    },

    inn: {
      required: true,
      number: true,
    },

    address: {
      required: true,
      lettersonly: true,
    },

    bank: {
      required: true,
      lettersonly: true,
    },

    bik: {
      required: true,
      // number: true,
    },

    iban: {
      required: true,
      // number: true,
    },

    test: {
      required: true,
      number: true,
    },
  },

  highlight: function (element, errorClass, validClass) {
    $(element).addClass(errorClass).removeClass(validClass);
    $(element).closest('.ui-field').find('.popup-icon')
      .addClass(errorClass).removeClass(validClass);

  },
  unhighlight: function (element, errorClass, validClass) {
    $(element).removeClass(errorClass).addClass(validClass);
    $(element).closest('.ui-field').find('.popup-icon')
      .removeClass(errorClass).addClass(validClass);
  },

  errorPlacement: function (error, element) {
    if (element.attr("name") == "customCheckbox") {
      error.appendTo(".form-cell-field-send");
    } else {
      error.insertAfter(element);
    }
  },

  messages: {
    name: {
      required: "Введите своё ФИО",
      lettersonly: "Введите корректное ФИО",
    },

    email: {
      required: "Введите свой email",
      email: "Введите корректный email",
    },

    telephone: {
      required: "Введите данные",
      minlength: "Введите полный номер",
    },

    locality: {
      required: "Введите населенный пункт",
      lettersonly: "Введите данные",
    },

    street: {
      required: "Введите улицу",
      lettersonly: "Введите данные",
    },

    house: {
      required: "Введите номер дома",
      number: "Введите данные",
    },

    company: {
      required: "Введите название",
      lettersonly: "Введите данные",
    },

    inn: {
      required: "Введите свой ИНН",
      number: 'Введите корректный ИНН',
    },

    address: {
      required: "Введите адрес",
      lettersonly: "Введите данные",
    },

    bank: {
      required: "Введите название банка",
      lettersonly: "Введите данные",
    },

    bik: {
      required: "Введите данные БИК",
      // number: "Введите корректные данные",
    },

    iban: {
      required: "Введите расчётный счет IBAN",
      // number: "Введите корректные данные",
    },

    test: {
      required: "Введите данные",
      number: "Введите корректные данные",
    },
  },
});

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