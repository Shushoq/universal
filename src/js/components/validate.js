import Inputmask from 'inputmask'
import JustValidate from "../../../node_modules/just-validate/dist/js/just-validate"
import Swal from 'sweetalert2'
import {
  modal
} from './modal';
let swal = require('sweetalert2')

let tel = document.querySelectorAll('input[type=tel')
let telMask = new Inputmask("+7 (999) 999-99-99");
telMask.mask(tel);

function validateForms(selector, rules, messages) {
  new window.JustValidate(selector, {
    rules: rules,
    messages: {
      tel: {
        strength: 'Введите корректный номер телефона',
        required: 'Введите номер телефона'
      },
      name: {
        required: 'Введите имя',
        minLength: 'Имя должно быть длиннее двух букв'
      },
      email: 'Введите корректный email',
      text: {
        required: 'Введите сообщение',
        minLength: 'Сообщение должно быть больше 100 символов'
      },
      checkbox: {
        required: 'Обязательное условие',
      }
    },
    submitHandler: function (form, values, ajax) {
      let formData = new FormData(form);

      fetch("mail.php", {
          method: "POST",
          body: formData
        })
        .then(function (data) {
          form.reset()
          if (selector === ".modal__form--feedback") {
            modal.close()
          }
          swal.fire({
            title: 'Спасибо!',
            icon: 'success',
            showCloseButton: true,
            showConfirmButton: false,
          })
        });
    }
  });
}

let feedBackForm = document.querySelector('.modal__form--feedback')
let subscribe = document.querySelector('.subscribe__form')
let newComments = document.querySelector('.comments__new-form')

if (feedBackForm) {
  validateForms('.modal__form--feedback', {
    email: {
      required: true,
      email: true
    },
    checkbox: {
      required: true
    }
  });
}

if (subscribe) {
  validateForms('.subscribe__form', {
    email: {
      required: true,
      email: true
    }
  });
}


if (newComments) {
  validateForms('.comments__new-form', {
    text: {
      required: true,
      minLength: 100,
    }
  });
}
