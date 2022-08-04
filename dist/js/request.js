
  $(document).ready(function () {
    $(".request-body-wrap-form").validate({
      errorElement: "span",
      rules: {
        name: {
          required: true,
          lettersonly: true,
        },
  
        textbox: {
          required: true,
          maxlength: 500,
        },
  
        url: {
          url: true,
          required: true,
          // email: true,
        },
  
      },
  
      messages: {
        name: {
          required: "Пожалуйста, введите ваше Имя",
          name: " ",
        },
  
        textbox: {
          required: "Пожалуйста, оставьте свой комментарий",
          maxlength: "Комментарий не должен превышать 500 символов",
        },
  
        url: {
          required: "Введите данные",
        }
      },
      highlight: function(element, errorClass, validClass) {
        $(element).addClass(errorClass).removeClass(validClass);
        $(element).closest('.ui-field').find('.popup-icon')
          .addClass(errorClass).removeClass(validClass);
        
      },
      unhighlight: function(element, errorClass, validClass) {
        $(element).removeClass(errorClass).addClass(validClass);
        $(element).closest('.ui-field').find('.popup-icon')
          .removeClass(errorClass).addClass(validClass);
      }
    });
  })