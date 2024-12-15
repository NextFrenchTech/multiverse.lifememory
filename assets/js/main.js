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
			// Variables
			const popup = document.getElementById("popup");  // Popup principale
			const acceptButton = document.getElementById("acceptButton");  // Bouton pour accepter l'audio
			const rejectButton = document.getElementById("rejectButton");  // Bouton pour rejeter l'audio
			const popupPursue = document.getElementById("popupPursue");  // Popup de reprise
			const resumeButton = document.getElementById("resumeButton");  // Bouton pour reprendre la lecture
			const cancelButton = document.getElementById("cancelButton");  // Bouton pour annuler la reprise
			const audio = document.getElementById("audio");  // Élément audio
			let isAudioPlaying = false;  // Vérifier si l'audio est en lecture
		
			// Fonctions
			
			// Afficher une popup après un délai de 1 seconde
			const showPopup = (popupElement) => {
				setTimeout(() => {
					popupElement.style.display = "block";  // Afficher la popup
					popupElement.style.zIndex = 9999;  // Placer la popup au premier plan
				}, 1000);  // Délai de 1 seconde
			};
		
			// Démarrer la lecture audio
			const playAudio = () => {
				isAudioPlaying = true;  // Marquer l'audio comme en cours de lecture
				audio.play().catch(error => console.error("Erreur de lecture audio: ", error));  // Gestion des erreurs
			};
		
			// Gérer la réponse de l'utilisateur (acceptée ou rejetée)
			const handleUserResponse = (response) => {
				sessionStorage.setItem("userResponse", response);  // Sauvegarder la réponse dans sessionStorage
				popup.style.display = "none";  // Masquer la popup
				if (response === "accepted") {
					playAudio();  // Démarrer la lecture audio si accepté
				}
			};
		
			// Reprendre la lecture audio après une pause
			const handleResume = () => {
				popupPursue.style.display = "none";  // Masquer la popup de reprise
				playAudio();  // Reprendre la lecture audio
			};
		
			// Annuler la reprise et réinitialiser la playlist audio
			const handleCancel = () => {
				popupPursue.style.display = "none";  // Masquer la popup de reprise
				sessionStorage.setItem("userResponse", "rejected");  // Sauvegarder "rejected" dans sessionStorage
				resetPlaylist();  // Réinitialiser la playlist audio
			};
		
			// Réinitialiser la playlist audio
			const resetPlaylist = () => {
				const sources = audio.getElementsByTagName('source');  // Récupérer les sources audio
				if (sources.length > 0) {
					audio.src = sources[0].src;  // Revenir à la première source audio
					audio.load();  // Recharger l'audio
				}
			};
		
			// Passer à la piste audio suivante dans la playlist
			const playNext = () => {
				const sources = Array.from(audio.getElementsByTagName('source'));  // Convertir les sources en tableau
				const currentSourceIndex = sources.findIndex(src => src.src === audio.src);  // Trouver l'index de la source actuelle
				const nextSourceIndex = (currentSourceIndex + 1) % sources.length;  // Calculer l'index de la prochaine source
		
				audio.src = sources[nextSourceIndex].src;  // Mettre à jour la source audio
				audio.load();  // Recharger l'audio
				playAudio();  // Démarrer la lecture de la nouvelle piste
			};
		
			// Gestionnaires d'événements pour les boutons
			acceptButton.addEventListener("click", () => handleUserResponse("accepted"));  // L'utilisateur accepte
			rejectButton.addEventListener("click", () => {
				handleUserResponse("rejected");  // L'utilisateur rejette
				resetPlaylist();  // Réinitialiser la playlist si rejeté
			});
			resumeButton.addEventListener("click", handleResume);  // L'utilisateur reprend la lecture
			cancelButton.addEventListener("click", handleCancel);  // L'utilisateur annule la reprise
		
			// Mettre l'audio en pause lorsque la fenêtre perd le focus
			window.addEventListener("blur", () => {
				isAudioPlaying = !audio.paused;  // Vérifier si l'audio était en lecture
				audio.pause();  // Mettre l'audio en pause
			});
		
			// Afficher les popups lors du regain de focus de la fenêtre
			window.addEventListener("focus", () => {
				const userResponseOnFocus = sessionStorage.getItem("userResponse");  // Récupérer la réponse enregistrée
				if (!userResponseOnFocus && popup.style.display !== "block") {
					showPopup(popup);  // Afficher la popup initiale si aucune réponse précédente
				} else if (userResponseOnFocus === "accepted") {
					showPopup(popupPursue);  // Afficher la popup de reprise si accepté
				} else if (userResponseOnFocus === "rejected") {
					showPopup(popup);  // Afficher la popup initiale si rejeté
				}
			});
		
			// Passer à la piste suivante lorsque la lecture actuelle est terminée
			audio.addEventListener("ended", playNext);  // Lancer la fonction playNext lorsque l'audio est terminé
		
			// Initialisation au chargement de la page
			sessionStorage.removeItem("userResponse");  // Réinitialiser la réponse de l'utilisateur
			showPopup(popup);  // Afficher la popup initiale
		
			// Gérer la visibilité de la page (quand l'utilisateur revient après avoir quitté)
			document.addEventListener("visibilitychange", () => {
				if (!document.hidden) {  // La page devient visible
					// Vérifier si l'audio est en pause ou si la lecture a été interrompue
					if (audio.paused) {
						// Récupérer la réponse de l'utilisateur depuis sessionStorage
						const userResponseOnFocus = sessionStorage.getItem("userResponse");
						
						// Afficher la popup de reprise si l'utilisateur a accepté l'audio
						if (userResponseOnFocus === "accepted") {
							showPopup(popupPursue);  // Afficher la popup de reprise
						} 
						// Afficher la popup initiale si l'utilisateur a rejeté
						else if (userResponseOnFocus === "rejected") {
							showPopup(popup);  // Afficher la popup initiale
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