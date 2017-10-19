/*Controlador de la página de eventos, se encarga de obtener todos los eventos existentes de la base de datos */

angular.module('EventosCtrl', []).controller('EventosController', function ($scope, $location, $routeParams, $uibModal, Evento) {
	
	$scope.currentPage = 1; //Indica el número de página actual
	$scope.maxSize = 10; //Maximo numero de páginas a mostrar para escojer
	$scope.itemsPerPage = 12; //Maximo numero de eventos a mostrar por página, lo cuál son 9
	$scope.active = 0; // Indice del tab activo (por default es el primero: cero)
	if($routeParams.show)
		$scope.active = parseInt($routeParams.show);

	// Obtiene la información de todos los eventos
	$scope.getEvents = function(){
		Evento.byDate()
		.then(function(res){ 
			$scope.eventos = res.data; //Todos los eventos
		}, function(res){ 
			alert('Error de Conexión con la Base de Datos');
		});
	};


	// Determina si una fecha es menor que el día de hoy (en tiempo de ejecución)
	$scope.isAvaliable = function(fechaStr){
		if(fechaStr === undefined)
			return false
		var today = new Date(),
			fecha = new Date(fechaStr);
		return today.getTime() < fecha.getTime();
	};

	$scope.setUrl = function(index){
		$location.search('show', index);
	};

	// Muestra un modal con la información del evento
    $scope.openModal = function(eventoID){
    	Evento.get(eventoID)
		.then(function(res){ // Success
			$scope.evento = res.data;
			//Join para guardar a los coordinadores en una cadena (solo si no es vacio)
			$scope.coordinador = $scope.evento.coordinador && $scope.evento.coordinador.length > 0 ? $scope.evento.coordinador.join(", ") : '';
			//Join para guardar a los participantes en una cadena (solo si no es vacio)
			$scope.participantes = $scope.evento.participantes && $scope.evento.participantes.length > 0 ? $scope.evento.participantes.join(", ") : '';
			$scope.url = $location.absUrl(); // URL completa de la página actual del evento (útil para social share)
			// Separar archivos por tipo
			$scope.evento.adjuntos = {imagenes: [], videos: [], documentos: [], otros: []};
			for(var i in $scope.evento.documentos){
				if($scope.evento.documentos[i].filetype === 'image') // imagen
					$scope.evento.adjuntos.imagenes.push($scope.evento.documentos[i]);
				else if($scope.evento.documentos[i].filetype === 'video') // video
					$scope.evento.adjuntos.videos.push($scope.evento.documentos[i]);
				else if($scope.evento.documentos[i].filetype === 'pdf' || $scope.evento.documentos[i].filetype === 'word' || $scope.evento.documentos[i].filetype === 'presentation' || $scope.evento.documentos[i].filetype === 'spreadsheet') // documentos
					$scope.evento.adjuntos.documentos.push($scope.evento.documentos[i]);
				else
					$scope.evento.adjuntos.otros.push($scope.evento.documentos[i]);
			}
			if($scope.evento.lugar){
				// Reverse Geocoding para obtener dirección a partir de PlaceID ($scope.evento.lugar)
				var geocoder = new google.maps.Geocoder;
				geocoder.geocode({placeId: $scope.evento.lugar}, function(res, status){
					if(status == google.maps.GeocoderStatus.OK){
						$scope.$apply(function(){ // Actualiza binding en llamadas asíncronas
							//$scope.direccion = res[0].formatted_address;
							$scope.geocodeResult = res[0];
						});
					}
				});
				setTimeout(function(){
					// Otras alternativas de estilos: PaleDown, ShadesOfGrey, LightDream
					var mapSyle = [ // Subtle Grayscale
					    {
					        "featureType": "landscape",
					        "stylers": [
					            {
					                "saturation": -100
					            },
					            {
					                "lightness": 65
					            },
					            {
					                "visibility": "on"
					            }
					        ]
					    },
					    {
					        "featureType": "poi",
					        "stylers": [
					            {
					                "saturation": -100
					            },
					            {
					                "lightness": 51
					            },
					            {
					                "visibility": "simplified"
					            }
					        ]
					    },
					    {
					        "featureType": "road.highway",
					        "stylers": [
					            {
					                "saturation": -100
					            },
					            {
					                "visibility": "simplified"
					            }
					        ]
					    },
					    {
					        "featureType": "road.arterial",
					        "stylers": [
					            {
					                "saturation": -100
					            },
					            {
					                "lightness": 30
					            },
					            {
					                "visibility": "on"
					            }
					        ]
					    },
					    {
					        "featureType": "road.local",
					        "stylers": [
					            {
					                "saturation": -100
					            },
					            {
					                "lightness": 40
					            },
					            {
					                "visibility": "on"
					            }
					        ]
					    },
					    {
					        "featureType": "transit",
					        "stylers": [
					            {
					                "saturation": -100
					            },
					            {
					                "visibility": "simplified"
					            }
					        ]
					    },
					    {
					        "featureType": "administrative.province",
					        "stylers": [
					            {
					                "visibility": "off"
					            }
					        ]
					    },
					    {
					        "featureType": "water",
					        "elementType": "labels",
					        "stylers": [
					            {
					                "visibility": "on"
					            },
					            {
					                "lightness": -25
					            },
					            {
					                "saturation": -100
					            }
					        ]
					    },
					    {
					        "featureType": "water",
					        "elementType": "geometry",
					        "stylers": [
					            {
					                "hue": "#ffff00"
					            },
					            {
					                "lightness": -25
					            },
					            {
					                "saturation": -97
					            }
					        ]
					    }
					];
					var map = new google.maps.Map(document.getElementById('map'), {
						center: {lat: 19.356751, lng: -99.166728}, // Mora Madrid (se actualiza al marker)
						zoom: 15,
						scrollwheel: false, // Evitar hacer zoom con el scroll del mouse
						mapTypeControl: false, // Solo muestra el tipo de mapa "TERRAIN"
						streetViewControl: false, // Oculta la opción "STREET VIEW"
						styles: mapSyle
					});
					var marker = new google.maps.Marker({
						position: $scope.geocodeResult.geometry.location,
						map: map,
						animation: google.maps.Animation.DROP,
						clickable: false
					});
					map.setCenter($scope.geocodeResult.geometry.location); // Actualizar vista en mapa para marcar el lugar
				}, 500);
			}
	    	$uibModal.open({
	    		// ariaDescribedBy: 'modal-body',
	    		size: 'lg',
	    		templateUrl: 'eventoModal.html',
	    		scope: $scope, // pasar el actual $scope (evitar 'crear' otro controlador)
	            windowClass: 'modal-event', // clase CSS que se agrega al Modal para identificarlo
	    		controller: function($uibModalInstance){
	    			$scope.closeModal = function(){
	    				$uibModalInstance.dismiss('cancel');
	    			};
	    		}
	    	});
		}, function(res){ // Fail
			console.error('Error de conexión con la base de datos: ', res);
		});
    }

	// INICIALIZACION: obtener eventos
	$scope.getEvents();
	
});
