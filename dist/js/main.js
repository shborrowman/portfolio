(function ($) {

	var $window = $(window),
		$main = $('#main'),
		$aboutMe = $('#about-me-container'),
		$header = $('#header'),
		$landingSection = $('#landing-section'),
		$projects = $('#projects'),
		$projectsNav = $('#projects-nav'),
		$aboutContainer = $('#about-me-container'),
		isAnimating = false,
		isScrolling = false,
		newScroll,
		currentScroll,
		timeDelay,
		navLength = $projectsNav.find('a').length,
		animationDelay = function() {
			setTimeout(function() {
				isAnimating = false;
			}, 900);
		},
		scrollDelay = function(timing) {
			timeDelay = setTimeout(function() {
				isScrolling = false;
			}, timing);
		},
		checkScroll = function(event) {
			newScroll = event.originalEvent.deltaY;

			if ( !isAnimating && !isScrolling) {
				isAnimating = true;
				isScrolling = true;
				changeSlide();
			}
			animationDelay();
			if ( currentScroll !== newScroll ) {
				clearTimeout(timeDelay);
				scrollDelay(200);
				currentScroll = event.originalEvent.deltaY;
			}
		},
		changeSlide = function() {
			if ( $landingSection.hasClass('hide') ) {
				$landingSection.removeClass('hide');
				$('#header').find('a').first().removeClass('active');
				setTimeout(function() {
					$projects.removeClass('active');
					$projectsNav.removeClass('animating-in');
					$projectsNav.find('a').removeClass('animate-in');
				}, 900);
			} else {
				$landingSection.addClass('hide');
				setTimeout(function() {
					$projects.addClass('active');
					projectsNavAnimate();
				}, 600);
			}
		},
		projectsNavAnimate = function() {
			var isAnimateIn = $projectsNav.hasClass('animating-in'),
				animateIn = function(idx, timing) {
					if (idx < navLength) {
						setTimeout(function() {
							$projectsNav.find('a').eq(idx).addClass('animate-in');
							animateIn(idx + 1, timing * .8);
						}, timing);
					}
				};

			if (!isAnimateIn) {
				$('#header').find('a').first().addClass('active');
				$projects.addClass('active');
				$projectsNav.addClass('animating-in');
				animateIn(0, 300);
			}
		};

	// Header Nav
	$header.on('click', 'a', function(event) {
		event.preventDefault();

		var $this = $(this),
			link = $this.attr('href'),
			isActive = $this.hasClass('active');

		if (!isActive) {
			if (link == '#work') {
				$landingSection.addClass('hide');
				setTimeout(function() {
					$projects.addClass('active');
					projectsNavAnimate();
				}, 600);
			} else {
				$aboutContainer.addClass('active');
				setTimeout(function() {
					$main.removeClass('locked');
				}, 900);
			}
		}
	});

	// About Me Close
	$aboutMe.on('click', 'a', function(event) {
		event.preventDefault();

		$aboutContainer.removeClass('active');
		$main.addClass('locked');
	});

	$window.on('wheel', function(event) {
		checkScroll(event);
	});

})(this.jQuery);
