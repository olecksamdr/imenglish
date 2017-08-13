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

});
