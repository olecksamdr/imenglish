
$(function() {

  // on extra small devices change container display to flex
  // for older browser support we use flexibility.js
  if ($(window).width() <= 767) {
    $('header .container').data('style', 'display: flex;');

    flexibility(document.documentElement);
  }

  /***************** logout ******************/

  $('#btn-logout').click(function() {
    $('<form action="logout.php" method="POST"></form>').appendTo('body').submit();
  });

    /***************** Collapse navbar when srloing to some sections *******************/
	$('#navbarCollapse a').on('click', function() {
	    $('#navbarCollapse').collapse('hide');
	});

	/***************** Header BG Scroll ******************/

	function changeNavIfNeeded () {
		var scroll = $(window).scrollTop();

		if (scroll >= 20) {
			$('nav.navbar').addClass('scrolled');
			$('#orderLessonBtn').removeClass('btn-lg');
		} else {
			$('nav.navbar').removeClass('scrolled');
			$('#orderLessonBtn').addClass('btn-lg');
		}
	}

	changeNavIfNeeded();
	$(window).scroll(changeNavIfNeeded);

	/***************** workspace-title aligment *******************/
	var
	  workspaceTitle = $('#workspace-title'),
	  navbar = $('nav.navbar'),
	  computer = $('.computer');

	function positionWorkspaceTitle() {
		if (workspaceTitle.is(':visible')) {
		 	// find distance between navbar and comuter
			var distance = computer.offset().top - (navbar.offset().top + navbar.height());
			var position =  parseInt( distance / 2 + workspaceTitle.height() / 2);

			workspaceTitle.css('top', position + 'px');
		}
	}

	positionWorkspaceTitle();

	$(window).on('resize', positionWorkspaceTitle);

	/***************** Waypoints ******************/

	$('#courses').waypoint(function() {
		$('.wp2').addClass('animated fadeInUp');
	}, {
		offset: '35%'
	});


	/***************** Smooth Scrolling ******************/

	$("a[href*='#']:not([href='#'])").click(function() {
		if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {

			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top - 40 // 40 - height of fixed navbar
				}, 1500);
				return false;
			}
		}
	});

	/***************** bootstrap tooltip initialize ******************/

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
