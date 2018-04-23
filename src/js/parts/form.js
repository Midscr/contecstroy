$(document).ready(function () {
  var tstname = /^[А-Яа-я]{3,}$/;
  var tstPhone = /^[^_]+$/;
  var inputName = $('.name');
  var inputPhone = $('.number');
  var inputCheck = $('.form__checkbox-custom')
  var check = $('input[type="checkbox"]')
  var alertBack = $('.js-callback')

  inputName.on('blur', validateName)
  inputName.on('focus', function clearname() {
    inputName.removeClass('bug');
  });

  inputPhone.inputmask();
  inputPhone.on('blur', validatePhone)
  inputPhone.on('focus', function clearname() {
    inputPhone.removeClass('bug');
  });


  function validateName() {
    var result = tstname.test(inputName.val());
    if (!result) {
      inputName.addClass('bug');
    }
    return result;
  }

  function validatePhone() {
    var result = tstPhone.test(inputPhone.val());
    if (!result) {
      inputPhone.addClass('bug');
    }
    return result;
  }
  check.on('click', function(){
    if (check.is(':checked')){
      $('.form__btn').removeAttr('disabled');
  } else {
      $('.form__btn').attr('disabled', 'disabled'); 
  }
});

  function mask() {
    $('.vex-content .number').inputmask({ "mask": "+7(999) 999-9999" });
  };

  alertBack.on('click', function () {
    vex.dialog.open({
      showCloseButton: true,
      escapeButtonCloses: true,
      message: 'Пожалуйста, оформите заявку',
      input: [
        '<div class="vex-input-1">',
        '<input class="name" name="name" type="text" placeholder="Имя" required />',
        '<input class="number" name="phone" type="text" placeholder="Телефон" required />',
        '<button class="vex-dialog-button"type="submit"/>ОФОРМИТЬ ЗАЯВКУ',
        '</div>',
        '<div class="vex-input-2">',
        '<textarea class="text" rows="5" placeholder="Опишите задачу (по желанию)"></textarea>',
        '</div>',
        '<button class="vex-dialog-button2 "type="submit"/>ОФОРМИТЬ ЗАЯВКУ'
      ].join(''),
      buttons: [],
      callback: function (data) {
        if (!data) {
          return
        } else {
          $.post('/callback?',
            {
              'name': data.name,
              'number': data.phone,
            })
        };
      }
    });
    mask();
  })
});  
