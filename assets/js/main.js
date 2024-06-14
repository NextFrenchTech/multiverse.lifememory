/*
	Multiverse by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper');

	// Breakpoints.
		breakpoints({
			xlarge:  [ '1281px',  '1680px' ],
			large:   [ '981px',   '1280px' ],
			medium:  [ '737px',   '980px'  ],
			small:   [ '481px',   '736px'  ],
			xsmall:  [ null,      '480px'  ]
		});

	// Hack: Enable IE workarounds.
		if (browser.name == 'ie')
			$body.addClass('ie');

	// Touch?
		if (browser.mobile)
			$body.addClass('touch');

	// Transitions supported?
		if (browser.canUse('transition')) {

			// Play initial animations on page load.
				$window.on('load', function() {
					window.setTimeout(function() {
						$body.removeClass('is-preload');
					}, 100);
				});

			// Prevent transitions/animations on resize.
				var resizeTimeout;

				$window.on('resize', function() {

					window.clearTimeout(resizeTimeout);

					$body.addClass('is-resizing');

					resizeTimeout = window.setTimeout(function() {
						$body.removeClass('is-resizing');
					}, 100);

				});

		}

	// Scroll back to top.
		$window.scrollTop(0);

	// Panels.
		var $panels = $('.panel');

		$panels.each(function() {

			var $this = $(this),
				$toggles = $('[href="#' + $this.attr('id') + '"]'),
				$closer = $('<div class="closer" />').appendTo($this);

			// Closer.
				$closer
					.on('click', function(event) {
						$this.trigger('---hide');
					});

			// Events.
				$this
					.on('click', function(event) {
						event.stopPropagation();
					})
					.on('---toggle', function() {

						if ($this.hasClass('active'))
							$this.triggerHandler('---hide');
						else
							$this.triggerHandler('---show');

					})
					.on('---show', function() {

						// Hide other content.
							if ($body.hasClass('content-active'))
								$panels.trigger('---hide');

						// Activate content, toggles.
							$this.addClass('active');
							$toggles.addClass('active');

						// Activate body.
							$body.addClass('content-active');

					})
					.on('---hide', function() {

						// Deactivate content, toggles.
							$this.removeClass('active');
							$toggles.removeClass('active');

						// Deactivate body.
							$body.removeClass('content-active');

					});

			// Toggles.
				$toggles
					.removeAttr('href')
					.css('cursor', 'pointer')
					.on('click', function(event) {

						event.preventDefault();
						event.stopPropagation();

						$this.trigger('---toggle');

					});

		});

		// Global events.
			$body
				.on('click', function(event) {

					if ($body.hasClass('content-active')) {

						event.preventDefault();
						event.stopPropagation();

						$panels.trigger('---hide');

					}

				});

			$window
				.on('keyup', function(event) {

					if (event.keyCode == 27
					&&	$body.hasClass('content-active')) {

						event.preventDefault();
						event.stopPropagation();

						$panels.trigger('---hide');

					}

				});

	// Header.
		var $header = $('#header');

		// Links.
			$header.find('a').each(function() {

				var $this = $(this),
					href = $this.attr('href');

				// Internal link? Skip.
					if (!href
					||	href.charAt(0) == '#')
						return;

				// Redirect on click.
					$this
						.removeAttr('href')
						.css('cursor', 'pointer')
						.on('click', function(event) {

							event.preventDefault();
							event.stopPropagation();

							window.location.href = href;

						});

			});

	// Footer.
		var $footer = $('#footer');

		// Copyright.
		// This basically just moves the copyright line to the end of the *last* sibling of its current parent
		// when the "medium" breakpoint activates, and moves it back when it deactivates.
			$footer.find('.copyright').each(function() {

				var $this = $(this),
					$parent = $this.parent(),
					$lastParent = $parent.parent().children().last();

				breakpoints.on('<=medium', function() {
					$this.appendTo($lastParent);
				});

				breakpoints.on('>medium', function() {
					$this.appendTo($parent);
				});

			});

	// Main.
		var $main = $('#main');

		// Thumbs.
			$main.children('.thumb').each(function() {

				var	$this = $(this),
					$image = $this.find('.image'), $image_img = $image.children('img'),
					x;

				// No image? Bail.
					if ($image.length == 0)
						return;

				// Image.
				// This sets the background of the "image" <span> to the image pointed to by its child
				// <img> (which is then hidden). Gives us way more flexibility.

					// Set background.
						$image.css('background-image', 'url(' + $image_img.attr('src') + ')');

					// Set background position.
						if (x = $image_img.data('position'))
							$image.css('background-position', x);

					// Hide original img.
						$image_img.hide();

			});

		// Poptrox.
			$main.poptrox({
				baseZIndex: 20000,
				caption: function($a) {

					var s = '';

					$a.nextAll().each(function() {
						s += this.outerHTML;
					});

					return s;

				},
				fadeSpeed: 300,
				onPopupClose: function() { $body.removeClass('modal-active'); },
				onPopupOpen: function() { $body.addClass('modal-active'); },
				overlayOpacity: 0,
				popupCloserText: '',
				popupHeight: 150,
				popupLoaderText: '',
				popupSpeed: 300,
				popupWidth: 150,
				selector: '.thumb > a.image',
				usePopupCaption: true,
				usePopupCloser: true,
				usePopupDefaultStyling: false,
				usePopupForceClose: true,
				usePopupLoader: true,
				usePopupNav: true,
				windowMargin: 50
			});

			// Hack: Set margins to 0 when 'xsmall' activates.
				breakpoints.on('<=xsmall', function() {
					$main[0]._poptrox.windowMargin = 0;
				});

				breakpoints.on('>xsmall', function() {
					$main[0]._poptrox.windowMargin = 50;
				});

})(jQuery);



/* ------------------------------ */
/*           CUSTOM  JS           */
/* ------------------------------ */



/* /Mobi|Android/i.test */

	// Fonction pour détecter si l'utilisateur est sur un appareil mobile

	function isMobile() {
		return /Mobi|Android/i.test(navigator.userAgent);
	}



/* audioPlaylist */

	// autoPlayAudio

		document.addEventListener("DOMContentLoaded", function() {
			var popup = document.getElementById("popup");
			var acceptButton = document.getElementById("acceptButton");
			var rejectButton = document.getElementById("rejectButton");
			var audio = document.getElementById("audio");

			// Vérifier si l'utilisateur a déjà répondu
			var userResponse = getCookie("userResponse");

			if (userResponse === "accepted") {
				// Si l'utilisateur a déjà répondu "accepté", masquer la pop-up et afficher l'audio
				popup.style.display = "none";
			//audio.style.display = "block"; // Afficher l'audio
				audio.play(); // Démarrer la lecture audio
			} else if (userResponse === "rejected") {
				// Si l'utilisateur a déjà répondu "rejeté", masquer la pop-up
				popup.style.display = "none";
			} else {
				// Afficher la fenêtre pop-up après 1 seconde si l'utilisateur n'a pas encore répondu
				setTimeout(function() {
					popup.style.display = "block";
				}, 1000);
			}

			// Gérer la réponse de l'utilisateur
			acceptButton.addEventListener("click", function() {
				popup.style.display = "none";
			//audio.style.display = "block"; // Afficher l'audio
				audio.play(); // Démarrer la lecture audio
				setCookie("userResponse", "accepted"); // Enregistrer la réponse dans un cookie de session
			});

			rejectButton.addEventListener("click", function() {
				popup.style.display = "none";
				setCookie("userResponse", "rejected"); // Enregistrer la réponse dans un cookie de session
			});

			// Fonction pour définir un cookie de session
			function setCookie(name, value) {
				document.cookie = name + "=" + value + ";path=/;SameSite=Lax;Secure";
			}

			// Fonction pour récupérer la valeur d'un cookie
			function getCookie(name) {
				const cookieName = name + "=";
				const cookies = document.cookie.split(';');
				const cookie = cookies.find(c => c.trim().startsWith(cookieName));
				return cookie ? cookie.trim().substring(cookieName.length) : "";
			}
		});

		// Fonction pour passer à la piste audio suivante
		function playNext() {
			const audio = document.getElementById('audio');
			const sources = audio.getElementsByTagName('source');

			// Recherche de la source actuelle
			let currentSourceIndex = -1;
			for (let i = 0; i < sources.length; i++) {
				if (sources[i].src === audio.src) {
					currentSourceIndex = i;
					break;
				}
			}

			// Calcul de l'index de la source suivante
			const nextSourceIndex = (currentSourceIndex + 1) % sources.length;

			// Mise à jour de la source audio et lecture
			audio.src = sources[nextSourceIndex].src;
			audio.load(); // Recharge le lecteur audio pour prendre en compte la nouvelle source
			audio.play(); // Lance la lecture de la nouvelle source
		}

		// Lancer la première piste audio
		document.addEventListener("DOMContentLoaded", function() {
			playNext();
		});



/* autoScroll */

	// autoScroll /Mobi|Android/i
		// L400 Fonction pour détecter si l'utilisateur est sur un appareil mobile

		let isPaused = false; // Variable pour suivre l'état de la pause du défilement

		// Fonction pour démarrer le gestionnaire d'événement de défilement
		function startAutoScroll() {
			let scrollStep = 1; // Nombre de pixels à faire défiler par intervalle
			let delay = 15; // Intervalle en millisecondes entre chaque défilement

			if (isMobile()) {
				// Défilement vertical pour les appareils mobiles
				function scrollDown() {
					if (!isPaused) {
						window.scrollBy(0, scrollStep);
						if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
							setTimeout(scrollUp, delay);
						} else {
							setTimeout(scrollDown, delay);
						}
					}
				}

				function scrollUp() {
					if (!isPaused) {
						window.scrollBy(0, -scrollStep);
						if (window.scrollY <= 0) {
							setTimeout(scrollDown, delay);
						} else {
							setTimeout(scrollUp, delay);
						}
					}
				}

				scrollDown();

				let touchStartY = 0;

				// Gestion des événements tactiles
				window.addEventListener('touchstart', function(event) {
					touchStartY = event.touches[0].clientY;
				});

				// Gestion de la mise en pause du défilement
				window.addEventListener('touchmove', function(event) {
					let touchMoveY = event.touches[0].clientY;
					let deltaY = touchMoveY - touchStartY;

					if (Math.abs(deltaY) > 10) { // Sensibilité du mouvement de doigt
						isPaused = true;// Empêche le défilement naturel
					}
				});
			}
		}

		// Fonction pour démarrer le défilement au click
		document.getElementById('acceptButton').addEventListener('click', startAutoScroll);
		document.getElementById('rejectButton').addEventListener('click', startAutoScroll);

		// Fonction pour démarrer le défilement automatique
		//window.onload = function() {
		//	setTimeout(startAutoScroll, 0); // Délai de 0 secondes avant de démarrer le défilement automatique
		//};



/* autoSwitch */

	// autoSwitch /Mobi|Android/i
		// L400 Fonction pour détecter si l'utilisateur est sur un appareil mobile

		// Fonction pour passer à la photo suivante
		function nextPhoto() {
			if (isMobile() && $('body').hasClass('modal-active')) {
				// Simuler un clic sur le bouton "suivant" de Poptrox
				var nextButton = $('.nav-next');
				if (nextButton.length) {
					nextButton.click();
				}
			}
		}

		// Définir l'intervalle pour changer de photo toutes les 5 secondes (5000 ms)
		setInterval(nextPhoto, 5000);



/* autoView */

	// autoView /videoPlayer05

		// Fonction pour passer à la video suivante
		document.addEventListener('DOMContentLoaded', function() {
			var videoPlayer05 = document.getElementById('videoPlayer05');

			// Liste des vidéos
			var videos = [
				{ src: 'videos/vid05.mp4' },
				//{ src: 'videos/.mp4', poster: 'images/.jpg' },
			];

			var currentVideoIndex = 0;

			// Fonction pour charger une vidéo
			function loadVideo(index) {
				if (index < videos.length) {
					videoPlayer05.src = videos[index].src;
					//videoPlayer05.poster = videos[index].poster;
					videoPlayer05.load();
					videoPlayer05.play();
				}
			}

			// Écouteur d'événement pour la fin de la vidéo
			//videoPlayer05.addEventListener('ended', function() {
			//	currentVideoIndex++;
			//	if (currentVideoIndex < videos.length) {
			//		loadVideo(currentVideoIndex);
			//	} else {
			//		// Réinitialiser à la première vidéo si toutes les vidéos sont jouées
			//		currentVideoIndex = 0;
			//		loadVideo(currentVideoIndex);
			//	}
			//});

			// Charger la première vidéo
			loadVideo(currentVideoIndex);
		});



/* autoView */

	// autoView /videoPlayer04

		// Fonction pour passer à la video suivante
		document.addEventListener('DOMContentLoaded', function() {
			var videoPlayer04 = document.getElementById('videoPlayer04');

			// Liste des vidéos
			var videos = [
				{ src: 'videos/vid04.mp4' },
				{ src: 'videos/vid05.mp4' },
				//{ src: 'videos/.mp4', poster: 'images/.jpg' },
			];

			var currentVideoIndex = 0;

			// Fonction pour charger une vidéo
			function loadVideo(index) {
				if (index < videos.length) {
					videoPlayer04.src = videos[index].src;
					//videoPlayer04.poster = videos[index].poster;
					videoPlayer04.load();
					videoPlayer04.play();
				}
			}

			// Écouteur d'événement pour la fin de la vidéo
			videoPlayer04.addEventListener('ended', function() {
				currentVideoIndex++;
				if (currentVideoIndex < videos.length) {
					loadVideo(currentVideoIndex);
				} else {
					// Réinitialiser à la première vidéo si toutes les vidéos sont jouées
					currentVideoIndex = 0;
					loadVideo(currentVideoIndex);
				}
			});

			// Charger la première vidéo
			loadVideo(currentVideoIndex);
		});