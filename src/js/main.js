(function ($) {

	var $window = $(window),
		$aboutMe = $('#about-me'),
		$header = $('#header');

	// Header Nav
	$header.on('click', 'a', function(event) {
		event.preventDefault();

		var $this = $(this),
			link = $this.attr('href'),
			isActive = $this.hasClass('active');

		if (!isActive) {
			// $this.addClass('active').siblings().removeClass('active');

			if (link == '#work') {
				$('html, body').animate({'scrollTop': $('#projects').offset().top});
			} else {
				$aboutMe.fadeIn(function() {
					$aboutMe.find('a').addClass('active');
				});
			}
		}
	});

	// About Me Mask
	var aboutMeMask = function() {
			var scroll = $window.scrollTop(),
				headerTop = $header.position().top,
				headerBottom = headerTop + $header.outerHeight(),
				projectsTop = $projects.offset().top,
				offset = projectsTop - scroll - headerBottom;

			if (offset <= 0) {
				var positiveOffset = Math.abs(offset),
					percentage = Math.floor((positiveOffset / $header.outerHeight()) * 100),
					moveAmount;

				if (positiveOffset < $header.outerHeight()) {
					moveAmount = percentage - 100;
				} else {
					moveAmount = 0;
				}

				$('.js-move-top').css('top', -moveAmount + '%');
				$('.js-move-bottom').css('bottom', -moveAmount + '%');
			} else {
				$('.js-move-top').css('top', '100%');
				$('.js-move-bottom').css('bottom', '100%');
			}
		};

	// About Me Close
	$aboutMe.on('click', 'a', function(event) {
		event.preventDefault();

		$aboutMe.find('a').removeClass('active');
		$aboutMe.fadeOut();
	});

	// Landing Animate
	var $landingSection = $('#landing-section'),
		landingAnimation = function() {
			var scroll = $window.scrollTop(),
				moveAmount = scroll / 2;

			$landingSection.css('background-position-y', moveAmount);

			if (scroll > $window.height() * .25) {
				$landingSection.find('h2').addClass('animate-out');
			} else {
				$landingSection.find('h2').removeClass('animate-out');
			}
		},

	// Projects
		$projects = $('#projects'),
		$projectsNav = $('#projects-nav'),
		navLength = $projectsNav.find('a').length,
		projectsNavAnimate = function() {
			var scroll = $window.scrollTop(),
				isAnimateIn = $projectsNav.hasClass('animating-in'),
				isAnimateOut = $projectsNav.hasClass('animating-out'),
				animateIn = function(idx, timing) {
					if (idx < navLength) {
						setTimeout(function() {
							$projectsNav.find('a').eq(idx).addClass('animate-in');
							animateIn(idx + 1, timing * .8);
						}, timing);
					}
				},
				animateOut = function(idx, timing) {
					if (idx >= 0) {
						setTimeout(function() {
							$projectsNav.find('a').eq(idx).removeClass('animate-in');
							animateOut(idx - 1, timing * .5);
						}, timing);
					} else {
						$projects.removeClass('active');
					}
				};

			if (scroll > $window.height() * .5) {
				if (!isAnimateIn) {
					$projects.addClass('active');
					$projectsNav.removeClass('animating-out').addClass('animating-in');
					animateIn(0, 300);
				}
			} else {
				if (!isAnimateOut) {
					$projectsNav.removeClass('animating-in').addClass('animating-out');
					animateOut(navLength - 1, 300);
				}
			}
		};

	$window.on('load scroll', function() {
		landingAnimation();
		projectsNavAnimate();
		aboutMeMask();
	});

})(this.jQuery);
