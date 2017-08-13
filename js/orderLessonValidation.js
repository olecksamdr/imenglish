/***************** Order Lesson form validation ******************/

// after re-opening modal showing form again
$('#orderLesson').on('shown.bs.modal', function(e) {
    if ($('#message-alert').is(':visible')) {
     $('#message-alert').hide();
     $('#orderLessonFrom').show();
  }
});

function highlight(element) {
  element = $(element);

  element.parent().find('.glyphicon-ok').next().remove();
  element.parent().find('.glyphicon-ok').remove();


  element.parent().removeClass('has-success').addClass('has-error has-feedback');

  if (element.parent().find('.glyphicon-ok').length === 0) {
    var
      icon = $('<span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>'),
        srForIcon = $('<span class="sr-only">(error)</span>');

    icon.insertAfter(element);
    srForIcon.insertAfter(icon);

  }
}

function unhighlight(element) {
  element = $(element);

  element.parent().find('.glyphicon-remove').next().remove();
  element.parent().find('.glyphicon-remove').remove();


  element.parent().removeClass('has-error').addClass('has-success has-feedback');

  if (element.parent().find('.glyphicon-ok').length === 0) {
    var
      icon = $('<span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>'),
        srForIcon = $('<span class="sr-only">(success)</span>');

        icon.insertAfter(element);
        srForIcon.insertAfter(icon);
  }
}

 function showOrderLessonLoader() {
  $('#orderLessonFrom fieldset').attr('disabled', true);
  $('#orderLesson .sk-circle').fadeIn();
}

  function hideOrderLessonLoader() {
  $('#orderLessonFrom fieldset').removeAttr('disabled', false);
  $('#orderLesson .sk-circle').fadeOut();
}


  function submitHandler(form) {
  var data = $(form).serialize();

  showOrderLessonLoader();

  $.ajax({
    type: "POST",
    url: "/resources/api/sendemail.php",
    data: data,
    success: function (data) {
      hideOrderLessonLoader();
      $('#message-alert').removeClass().addClass('alert alert-success').text('Сообщение успешно отправлено').show();
      $('#orderLessonFrom').hide();
      //$('#orderLesson').modal('hide')
    },
    error: function (xhr, ajaxOptions, thrownError) {
      hideOrderLessonLoader();
      $('#message-alert').removeClass().addClass('alert-danger').text(xhr.responseText).show();
      $('#orderLessonFrom').hide();
      //$('#orderLesson').modal('hide')
      console.log(xhr.responseText);
      console.log(xhr)
    }
  });

  return false; // required to block normal submit since you used ajax
  }


  // add exactlength method

  jQuery.validator.addMethod("myPhone", function(value, element, param) {
    var
      // +380506984288
      phoneReg1 = /^(\+38)\d{10}$/,
      // 80506984288
      phoneReg2 = /^8\d{10}/,
      // 0506984288
      phoneReg3 = /^0\d{9}/;
  return this.optional(element) || phoneReg1.test(value) || phoneReg2.test(value) || phoneReg3.test(value);
}, $.validator.format("неверный формат номера телефона"));

$('#orderLessonFrom').validate({
    errorClass: 'control-label',
    rules: {
      name: {
      required: true
      },
      email: {
      required: true,
      email: true
    },
    phone: {
      myPhone: true
    }
    },
    messages: {
    name: {
        required: 'Пожалуйста, введите имя'
      },
      email: {
        required: 'Пожалуйста, введите email',
        email: 'Email не действителен'
      },
      phone: {
        myPhone: 'Неверный формат номера телефона'
    }
    },
    highlight: highlight,
    unhighlight: unhighlight,
    submitHandler: submitHandler
  });
