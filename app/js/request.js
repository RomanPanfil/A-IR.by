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
  });
