$(function() {
  /***************** load content ******************/
  var
    CHECKED_ALL_IDS = [],
    CHECKED_CONFIRMED_IDS = [],
    CHECKED_NOT_CONFIRMED_IDS = [];

 // functions for updating tabs content count
  function updateNotConfirmedCount(count) {
    $('a[href="#not-confirmed"] .badge').text(count);
  }

  function updateConfirmedCount(count) {
    $('a[href="#confirmed"] .badge').text(count);
  }

  function updateAllCount(count) {
    $('a[href="#all"] .badge').text(count);
  }

  // functions for generating content
  function createReviewHTML(obj) {
    var html = '<div class="message message-left">';
      html +=    '<div class="checkbox-wrapper">';
      html +=         '<input type="checkbox" id="rw' + obj.id + '" value="' + obj.id + '">';
      html +=         '<label for="rw' + obj.id + '"></label>';
      html +=     '</div> <!-- /checkbox-wrapper -->';
      html +=     '<div class="avatar">';
      html +=          '<img src="' + obj.picture + '" alt="user avatar">';
      html +=      '</div>';
      html +=      '<div class="message-content">';
      html +=        '<p class="thumbnail">';
      html +=           '<span class="author">' + obj.first_name + ' ' + obj.last_name +'</span>';
      html +=             obj.text;
      html +=        '</p>';
      html +=      '</div>';
      html +=    '</div>';

      return $(html);
  }

  function createLoader() {
    var html = '<div class="sk-circle">';
        html +=  '<div class="sk-circle1 sk-child"></div>';
        html +=  '<div class="sk-circle2 sk-child"></div>';
        html +=  '<div class="sk-circle3 sk-child"></div>';
        html +=  '<div class="sk-circle4 sk-child"></div>';
        html +=  '<div class="sk-circle5 sk-child"></div>';
        html +=  '<div class="sk-circle6 sk-child"></div>';
        html +=  '<div class="sk-circle7 sk-child"></div>';
        html +=  '<div class="sk-circle8 sk-child"></div>';
        html +=  '<div class="sk-circle9 sk-child"></div>';
        html +=  '<div class="sk-circle10 sk-child"></div>';
        html +=  '<div class="sk-circle11 sk-child"></div>';
        html +=  '<div class="sk-circle12 sk-child"></div>';
        html +='</div>';

  return $(html);
  }

  function selectMessage(messageRootElement) {
    messageRootElement.addClass('selected');

    var checkbox = messageRootElement.find('input[type="checkbox"]');
    checkbox.attr('checked', 'checked');

    var container = messageRootElement.closest('.tab-pane').attr('id');

    var arrayRef;
    switch (container) {
      case 'not-confirmed': arrayRef = CHECKED_NOT_CONFIRMED_IDS; break;
      case 'confirmed': arrayRef = CHECKED_CONFIRMED_IDS; break;
      case 'all': arrayRef = CHECKED_ALL_IDS; break;
    }

    arrayRef.push(checkbox.val());

    selectedCountChanged(arrayRef);
  }

  function unselectMessage(messageRootElement) {
    messageRootElement.removeClass('selected');
    var checkbox = messageRootElement.find('input[type="checkbox"]');
    checkbox.removeAttr('checked');

    var container = messageRootElement.closest('.tab-pane').attr('id');

    var arrayRef;
    switch (container) {
      case 'not-confirmed': arrayRef = CHECKED_NOT_CONFIRMED_IDS; break;
      case 'confirmed': arrayRef = CHECKED_CONFIRMED_IDS; break;
      case 'all': arrayRef = CHECKED_ALL_IDS; break;
    }

    // remove selected message id from array
    index = arrayRef.indexOf(checkbox.val());

    if (index != -1)
      arrayRef.splice(index, 1);

    selectedCountChanged(arrayRef);
  }

  function selectedCountChanged(arrayRef) {
    var
      delBtn = $('#delete-btn'),
      confirmBtn = $('#confirm-btn');

    var currentTabId = $('nav.nav-tabs li.active a').attr('id');

    if (arrayRef.length != 0) {

      if (delBtn.attr('disabled'))
        delBtn.removeAttr('disabled');

      if (currentTabId == 'confirmed')
        if (!confirmBtn.attr('disabled'))
          confirmBtn.attr('disabled', true);

    } else {
      if (!delBtn.attr('disabled'))
        delBtn.attr('disabled', true);

      if (!confirmBtn.attr('disabled'))
        confirmBtn.attr('disabled', true);
    }
  }

  function tabChanged() {

  }


  function showLoader(containerSelector) {
    var loaderContainer = $(containerSelector);

    if (loaderContainer.find('.sk-circle').length !== 0) {
      loaderContainer.find('.sk-circle').show();
    }
    else {
      var loader = createLoader();
      loaderContainer.prepend(loader);
      loader.show();
    }
  }

  function hideLoader(containerSelector) {
    var loaderContainer = $(containerSelector);

    if (loaderContainer.find('.sk-circle').length !== 0) {
      loaderContainer.find('.sk-circle').hide();
    }
  }

function handleMessgeClick() {
  console.log('handle message click')
  var message = $(this);

  if (message.hasClass('selected'))
    unselectMessage(message);
  else
    selectMessage(message);
}

function dataLoaded(dataContainerSelector) {
  return function (data) {
      hideLoader(dataContainerSelector);

      updateAllCount(data.counts.all);
      updateConfirmedCount(data.counts.confirmed);
      updateNotConfirmedCount(data.counts.not_confirmed);

      var container = $(dataContainerSelector);

      if(data.data.length != 0) {
        data.data.forEach(function(item) {
          var message = createReviewHTML(item);

          message.on('click', handleMessgeClick);
          // message.find('input[type="checkbox"]').on('click', function (e) {e.preventDefault;});
          message.find('label').on('click', function (e) {
            console.log('label clicked');
            e.preventDefault();
            // debugger;
            handleMessgeClick.call($(this).closest('.message').get(0));
            // $(this).closest('.message').trigger('click');
            console.log($(this).closest('.message').get(0));
          });

          container.append(message);
        });
      } else {
        container.html('<div class="empty">Пусто</div>');
      }
  }
}


  // 1) add counts to the tabs
  // 2) load not_confirmed reviews
  function loadData(reviewType, loadMore, containerSelector) {
    showLoader(containerSelector);

    $.ajax({
      type: 'GET',
      url: '/resources/api/manage-reviews-data.php',
      data: {
        'reviews_type': reviewType,
        'load_more': loadMore
      },
      success: dataLoaded(containerSelector),
      error: function (xhr) {
        console.log(xhr.responseText);
        console.log(xhr);
      }
    });
  }

  loadData('not-confirmed', false, '#not-confirmed');

  function loadInitialData(e) {
    var reviewType = this.hash.substring(1);
    loadData(reviewType, false, this.hash);

    // remove handler we dont need load data again if we clicking some tabs twise or more
    $(this).off('shown.bs.tab', loadInitialData);
  }

  $('a[data-toggle="tab"]').on('shown.bs.tab', loadInitialData);

  /***************** need small btn for this page ******************/
  $('#orderLessonBtn').removeClass('btn-lg');

  /***************** logout ******************/

  $('#btn-logout').click(function() {
    $('<form action="logout.php" method="POST"></form>').appendTo('body').submit();
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
    url: "/resources/send-review.php",
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
