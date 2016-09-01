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

			//Join para guardar a los realizadores en una cadena
			$scope.realizador = $scope.evento.realizador.join(", ");


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
				// Otras alternativas de estilos: ShadesOfGrey, LightDream
				var mapSylePaleDown = [
				    {
				        "featureType": "administrative",
				        "elementType": "all",
				        "stylers": [
				            {
				                "visibility": "on"
				            },
				            {
				                "lightness": 33
				            }
				        ]
				    },
				    {
				        "featureType": "landscape",
				        "elementType": "all",
				        "stylers": [
				            {
				                "color": "#f2e5d4"
				            }
				        ]
				    },
				    {
				        "featureType": "poi.park",
				        "elementType": "geometry",
				        "stylers": [
				            {
				                "color": "#c5dac6"
				            }
				        ]
				    },
				    {
				        "featureType": "poi.park",
				        "elementType": "labels",
				        "stylers": [
				            {
				                "visibility": "on"
				            },
				            {
				                "lightness": 20
				            }
				        ]
				    },
				    {
				        "featureType": "road",
				        "elementType": "all",
				        "stylers": [
				            {
				                "lightness": 20
				            }
				        ]
				    },
				    {
				        "featureType": "road.highway",
				        "elementType": "geometry",
				        "stylers": [
				            {
				                "color": "#c5c6c6"
				            }
				        ]
				    },
				    {
				        "featureType": "road.arterial",
				        "elementType": "geometry",
				        "stylers": [
				            {
				                "color": "#e4d7c6"
				            }
				        ]
				    },
				    {
				        "featureType": "road.local",
				        "elementType": "geometry",
				        "stylers": [
				            {
				                "color": "#fbfaf7"
				            }
				        ]
				    },
				    {
				        "featureType": "water",
				        "elementType": "all",
				        "stylers": [
				            {
				                "visibility": "on"
				            },
				            {
				                "color": "#acbcc9"
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
					styles: mapSylePaleDown
				});
				var marker = new google.maps.Marker({
					position: $scope.geocodeResult.geometry.location,
					map: map,
					animation: google.maps.Animation.DROP
				});
				map.fitBounds($scope.geocodeResult.geometry.viewport); // Actualizar vista en mapa para marcar el lugar
			}, 500);
		});
})