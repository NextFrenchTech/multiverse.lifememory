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

		// L'événement DOMContentLoaded est déclenché lorsque le document HTML a été complètement chargé et analysé
		document.addEventListener("DOMContentLoaded", () => {
			const popup = document.getElementById("popup");
			const acceptButton = document.getElementById("acceptButton");
			const rejectButton = document.getElementById("rejectButton");
			const popupPursue = document.getElementById("popupPursue");
			const resumeButton = document.getElementById("resumeButton");
			const cancelButton = document.getElementById("cancelButton");
			const audio = document.getElementById("audio");
			let isAudioPlaying = false;
			let isPopupVisible = false;  // Ajout d'un flag pour contrôler l'affichage de la popup
		
			const showPopup = (popupElement) => {
				if (!isPopupVisible) {  // Vérifier si une popup est déjà affichée
					setTimeout(() => {
						popupElement.style.display = "block";
						popupElement.style.zIndex = 9999;
						isPopupVisible = true;  // Marquer la popup comme visible
					}, 1000);
				}
			};
		
			const playAudio = () => {
				isAudioPlaying = true;
				audio.play().catch(error => console.error("Audio play error: ", error));
			};
		
			const handleUserResponse = (response) => {
				sessionStorage.setItem("userResponse", response);
				popup.style.display = "none";
				isPopupVisible = false;  // Réinitialiser le flag de la popup
				if (response === "accepted") {
					playAudio();
				}
			};
		
			const handleResume = () => {
				popupPursue.style.display = "none";
				isPopupVisible = false;  // Réinitialiser le flag de la popup
				playAudio();
			};
		
			const handleCancel = () => {
				popupPursue.style.display = "none";
				sessionStorage.setItem("userResponse", "rejected");
				resetPlaylist();
				isPopupVisible = false;  // Réinitialiser le flag de la popup
			};
		
			const resetPlaylist = () => {
				const sources = audio.getElementsByTagName('source');
				if (sources.length > 0) {
					audio.src = sources[0].src;
					audio.load();
				}
			};
		
			const playNext = () => {
				const sources = Array.from(audio.getElementsByTagName('source'));
				const currentSourceIndex = sources.findIndex(src => src.src === audio.src);
				const nextSourceIndex = (currentSourceIndex + 1) % sources.length;
		
				audio.src = sources[nextSourceIndex].src;
				audio.load();
				playAudio();
			};
		
			acceptButton.addEventListener("click", () => handleUserResponse("accepted"));
			rejectButton.addEventListener("click", () => {
				handleUserResponse("rejected");
				resetPlaylist();
			});
			resumeButton.addEventListener("click", handleResume);
			cancelButton.addEventListener("click", handleCancel);
		
			window.addEventListener("blur", () => {
				isAudioPlaying = !audio.paused;
				audio.pause();
			});
		
			window.addEventListener("focus", () => {
				const userResponseOnFocus = sessionStorage.getItem("userResponse");
				if (!userResponseOnFocus && popup.style.display !== "block") {
					showPopup(popup);
				} else if (userResponseOnFocus === "accepted") {
					showPopup(popupPursue);
				} else if (userResponseOnFocus === "rejected") {
					showPopup(popup);
				}
			});
		
			audio.addEventListener("ended", playNext);
		
			sessionStorage.removeItem("userResponse");
			showPopup(popup);
		
			document.addEventListener("visibilitychange", () => {
				if (!document.hidden) {
					const userResponseOnFocus = sessionStorage.getItem("userResponse");
		
					// Ne pas afficher deux popups en même temps
					if (!isPopupVisible) {  // Vérifier si une popup est déjà affichée
						if (audio.paused) {
							if (userResponseOnFocus === "accepted") {
								showPopup(popupPursue);
							} else if (userResponseOnFocus === "rejected") {
								showPopup(popup);
							}
						}
					}
				}
			});
		});
				


/* autoScroll */

	// autoScroll /Mobi|Android/i

       	// L291. Fonction pour détecter si l'utilisateur est sur un appareil mobile

        // Constantes pour les valeurs configurables
        const SCROLL_STEP = 1; // Nombre de pixels à faire défiler par intervalle
        const DELAY = 15; // Intervalle en millisecondes entre chaque défilement
        const TOUCH_SENSITIVITY = 10; // Sensibilité du mouvement de doigt

        let isPaused = false; // Variable pour suivre l'état de la pause du défilement

        // Fonction pour démarrer le gestionnaire d'événement de défilement
        function startAutoScroll() {
            if (isMobile()) {
                // Défilement vertical pour les appareils mobiles
                function scrollDown() {
                    if (!isPaused) {
                        window.scrollBy(0, SCROLL_STEP); // Fait défiler la fenêtre vers le bas
                        // Vérifie si la fenêtre a atteint le bas de la page
                        if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
                            setTimeout(scrollUp, DELAY); // Si le bas de la page est atteint, défile vers le haut
                        } else {
                            setTimeout(scrollDown, DELAY); // Sinon, continue de défiler vers le bas
                        }
                    }
                }

                function scrollUp() {
                    if (!isPaused) {
                        window.scrollBy(0, -SCROLL_STEP); // Fait défiler la fenêtre vers le haut
                        // Vérifie si la fenêtre a atteint le haut de la page
                        if (window.scrollY <= 0) {
                            setTimeout(scrollDown, DELAY); // Si le haut de la page est atteint, défile vers le bas
                        } else {
                            setTimeout(scrollUp, DELAY); // Sinon, continue de défiler vers le haut
                        }
                    }
                }

                scrollDown(); // Démarre le défilement vers le bas

                let touchStartY = 0;

                // Gestion des événements tactiles
                window.addEventListener('touchstart', function(event) {
                    touchStartY = event.touches[0].clientY; // Enregistre la position de départ du toucher
                });

                // Gestion de la mise en pause du défilement
                window.addEventListener('touchmove', function(event) {
                    let touchMoveY = event.touches[0].clientY; // Récupère la position actuelle du toucher
                    let deltaY = touchMoveY - touchStartY; // Calcule le déplacement en y

                    if (Math.abs(deltaY) > TOUCH_SENSITIVITY) { // Vérifie si le déplacement dépasse la sensibilité
                        isPaused = true; // Met en pause le défilement
                    }
                });
            }
        }

        // Fonction pour démarrer le défilement au clic
        function startAutoScrollOnClick() {
            startAutoScroll(); // Démarre le défilement automatique
            isPaused = false; // Réinitialiser l'état de la pause
        }

        // Ajout de l'événement de démarrage du défilement automatique aux boutons
        document.getElementById('acceptButton').addEventListener('click', startAutoScrollOnClick);
        document.getElementById('rejectButton').addEventListener('click', startAutoScrollOnClick);

		// Fonction pour démarrer le défilement automatique
		//window.onload = function() {
		//	setTimeout(startAutoScroll, 0); // Délai de 0 secondes avant de démarrer le défilement automatique
		//};



/* autoSwitch */

	// autoSwitch /Mobi|Android/i
	
		// L291. Fonction pour détecter si l'utilisateur est sur un appareil mobile

		// Fonction pour passer à la photo suivante
		function nextPhoto() {
			if (isMobile() && document.body.classList.contains('modal-active')) {
				// Simuler un clic sur le bouton "suivant" de Poptrox
				var nextButton = document.querySelector('.nav-next');
				if (nextButton) {
					nextButton.click();
				}
			}
			
			// Appel récursif pour exécuter la fonction après 5 secondes
			setTimeout(nextPhoto, 5000);
		}

		// Appel initial de la fonction nextPhoto
		nextPhoto();



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