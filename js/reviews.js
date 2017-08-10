$(function() {

  /***************** need small btn for this page ******************/
  $('#orderLessonBtn').removeClass('btn-lg');

  /***************** logout ******************/

  $('#btn-logout').click(function() {
    $('<form action="logout.php" method="POST"></form>').appendTo('body').submit();
  });


  /***************** remove placeholder in review-textarea ******************/

  $('#review-textarea').click(function() {

    var placeholder = $(this).find('.placeholder');
    var isPlaceholder = placeholder.length > 0 ? true : false;

    if (isPlaceholder)
      placeholder.remove();
  });


  /***************** bootstrap tooltip initialize (phone number in modal form) ******************/

  $('[data-toggle="tooltip"]').tooltip();

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

  function objectifyForm(form) {//serialize data function
    var
      returnArray = {},
      formArray = $(form).serializeArray();

    for (var i = 0; i < formArray.length; i++){
    returnArray[formArray[i]['name']] = formArray[i]['value'];
    }
    return returnArray;
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

    jQuery.validator.addMethod("exactlength", function(value, element, param) {
    return this.optional(element) || value.length == param;
  }, $.validator.format("Please enter exactly {0} characters."));

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
        number: true,
        exactlength: 10
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
        number: 'Номер должен состоять только из цифр',
        exactlength: 'Длина номера должна составлять 10 цифр'
      }
      },
      highlight: highlight,
      unhighlight: unhighlight,
      submitHandler: submitHandler
    });
});

/***************** send review ******************/
function sendReview(userId, message, success) {
  var
    loader = $('#send-review .sk-circle'),
    sendReview = $('#send-review');

  sendReview.addClass('fly');
  sendReview.find('a').text('');
  loader.show();

  $.ajax({
    type: "POST",
    url: "/resources/api/send-review.php",
    data: {'user_id': userId, 'review_message': message},
    success: function (data) {
      loader.hide();
      sendReview.removeClass('fly');
      sendReview.find('a').text('ok');

      setTimeout(function() {
        sendReview.find('a').text('оставить отзыв');
      }, 500);

      success();
      $('#review-textarea').text('');
      // $('#reviews-msg-container .message:first-child').addClass('hilight-message');

    },
    error: function (xhr, ajaxOptions, thrownError) {
      console.log(xhr.responseText);
      console.log(xhr)
    }
  });
}

function addMessageToDOM () {
  var
    reviewTextarea = $('#review-textarea'),
    firstName = reviewTextarea.data('firstname'),
    lastName = reviewTextarea.data('lastname'),
    pictureURL = reviewTextarea.data('picture'),
    reviewText = $('#review-textarea').text(),
    userId = reviewTextarea.data('userid'),

    lastMessage = $('#reviews-msg-container .message:first-child');

  if (lastMessage.hasClass('zero-message')) {
    var messageHTML = '<div class="message message-left">';
    messageHTML +=       '<div class="avatar"><img src="'+ pictureURL +'" alt="user picture"></div>';
    messageHTML +=        '<div class="message-content">';
    messageHTML +=           '<p class="thumbnail">';
    messageHTML +=              '<span class="author">' + firstName + ' ' + lastName + '</span>';
    messageHTML +=                 reviewText;
    messageHTML +=            '</p>';
    messageHTML +=         '</div>';
    messageHTML +=     '</div>';
    lastMessage.remove();

    $(messageHTML).prependTo('#reviews-msg-container');
    return;
  }
  else if (lastMessage.hasClass('message-left')) {
    var messageHTML = '<div class="message message-right">';
    messageHTML +=        '<div class="message-content">';
    messageHTML +=           '<p class="thumbnail">';
    messageHTML +=              '<span class="author">' + firstName + ' ' + lastName + '</span>';
    messageHTML +=                 reviewText;
    messageHTML +=            '</p>';
    messageHTML +=         '</div>';
      messageHTML +=       '<div class="avatar"><img src="'+ pictureURL +'" alt="user picture"></div>';
    messageHTML +=     '</div>';

    $(messageHTML).prependTo('#reviews-msg-container');
    return;
  }
  else {
    var messageHTML = '<div class="message message-left">';
    messageHTML +=       '<div class="avatar"><img src="'+ pictureURL +'" alt="user picture"></div>';
    messageHTML +=        '<div class="message-content">';
    messageHTML +=           '<p class="thumbnail">';
    messageHTML +=              '<span class="author">' + firstName + ' ' + lastName + '</span>';
    messageHTML +=                 reviewText;
    messageHTML +=            '</p>';
    messageHTML +=         '</div>';
    messageHTML +=     '</div>';

    $(messageHTML).prependTo('#reviews-msg-container');
    return;
  }
}


$('#send-review').click(function() {
  var
    reviewTextarea = $('#review-textarea'),
    reviewText = $('#review-textarea').text().trim(),
    userId = reviewTextarea.data('userid');

   // validateReviewMessage shows error on the page and return true or false
    if (validateReviewMessage(reviewText)) {
      sendReview(userId, reviewText, addMessageToDOM);
    }
});

function showReviewError(errorMsg) {
  $('#review-error').show().text(errorMsg);
}

function hideReviewError() {
  $('#review-error').hide().text('');
}

function validateReviewMessage(msg) {
  if (msg === '' || msg === 'ваш отзыв ...') {
    showReviewError('отзыв не может быть пустым');
    return false
  }
  else {
    hideReviewError();
    return true;
  }
}
