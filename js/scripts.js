
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

});
