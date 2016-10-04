/*Controlador que manda a llamar la información de un evento con su id */

angular.module('EventoCtrl',[]).controller('EventoController', function ($scope, $routeParams, Evento){

	// Carga síncrona (no recomendada) para mostrar correctamente el mapa en pantalla
	// var initialize = function(){
	// 	var map = new google.maps.Map(document.getElementById('map'), {
	// 		center: {lat: 19.356751, lng: -99.166728},
	// 		zoom: 15
	// 	});
	// };
	// google.maps.event.addDomListenerOnce(window, 'load', initialize);

	//Obtiene el evento con su ID
	Evento.get($routeParams.id)
		.then(function(res){
			$scope.evento = res.data;

			//Join para guardar a los coordinadores en una cadena
			$scope.coordinador = $scope.evento.coordinador.join(", ");
			//Join para guardar a los participantes en una cadena
			$scope.participantes = $scope.evento.participantes.join(", ");

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
		});
})