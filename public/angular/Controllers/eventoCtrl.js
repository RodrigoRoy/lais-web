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
				var mapStyleShadesOfGrey = [
				    {
				        "featureType": "all",
				        "elementType": "all",
				        "stylers": [
				            {
				                "lightness": "29"
				            },
				            {
				                "invert_lightness": true
				            },
				            {
				                "hue": "#008fff"
				            },
				            {
				                "saturation": "-73"
				            }
				        ]
				    },
				    {
				        "featureType": "all",
				        "elementType": "labels",
				        "stylers": [
				            {
				                "saturation": "-72"
				            }
				        ]
				    },
				    {
				        "featureType": "administrative",
				        "elementType": "all",
				        "stylers": [
				            {
				                "lightness": "32"
				            },
				            {
				                "weight": "0.42"
				            }
				        ]
				    },
				    {
				        "featureType": "administrative",
				        "elementType": "labels",
				        "stylers": [
				            {
				                "visibility": "on"
				            },
				            {
				                "lightness": "-53"
				            },
				            {
				                "saturation": "-66"
				            }
				        ]
				    },
				    {
				        "featureType": "landscape",
				        "elementType": "all",
				        "stylers": [
				            {
				                "lightness": "-86"
				            },
				            {
				                "gamma": "1.13"
				            }
				        ]
				    },
				    {
				        "featureType": "landscape",
				        "elementType": "geometry.fill",
				        "stylers": [
				            {
				                "hue": "#006dff"
				            },
				            {
				                "lightness": "4"
				            },
				            {
				                "gamma": "1.44"
				            },
				            {
				                "saturation": "-67"
				            }
				        ]
				    },
				    {
				        "featureType": "landscape",
				        "elementType": "geometry.stroke",
				        "stylers": [
				            {
				                "lightness": "5"
				            }
				        ]
				    },
				    {
				        "featureType": "landscape",
				        "elementType": "labels.text.fill",
				        "stylers": [
				            {
				                "visibility": "off"
				            }
				        ]
				    },
				    {
				        "featureType": "poi",
				        "elementType": "all",
				        "stylers": [
				            {
				                "visibility": "off"
				            }
				        ]
				    },
				    {
				        "featureType": "poi",
				        "elementType": "labels.text.fill",
				        "stylers": [
				            {
				                "weight": "0.84"
				            },
				            {
				                "gamma": "0.5"
				            }
				        ]
				    },
				    {
				        "featureType": "poi",
				        "elementType": "labels.text.stroke",
				        "stylers": [
				            {
				                "visibility": "off"
				            },
				            {
				                "weight": "0.79"
				            },
				            {
				                "gamma": "0.5"
				            }
				        ]
				    },
				    {
				        "featureType": "road",
				        "elementType": "all",
				        "stylers": [
				            {
				                "visibility": "simplified"
				            },
				            {
				                "lightness": "-78"
				            },
				            {
				                "saturation": "-91"
				            }
				        ]
				    },
				    {
				        "featureType": "road",
				        "elementType": "labels.text",
				        "stylers": [
				            {
				                "color": "#ffffff"
				            },
				            {
				                "lightness": "-69"
				            }
				        ]
				    },
				    {
				        "featureType": "road.highway",
				        "elementType": "geometry.fill",
				        "stylers": [
				            {
				                "lightness": "5"
				            }
				        ]
				    },
				    {
				        "featureType": "road.arterial",
				        "elementType": "geometry.fill",
				        "stylers": [
				            {
				                "lightness": "10"
				            },
				            {
				                "gamma": "1"
				            }
				        ]
				    },
				    {
				        "featureType": "road.local",
				        "elementType": "geometry.fill",
				        "stylers": [
				            {
				                "lightness": "10"
				            },
				            {
				                "saturation": "-100"
				            }
				        ]
				    },
				    {
				        "featureType": "transit",
				        "elementType": "all",
				        "stylers": [
				            {
				                "lightness": "-35"
				            }
				        ]
				    },
				    {
				        "featureType": "transit",
				        "elementType": "labels.text.stroke",
				        "stylers": [
				            {
				                "visibility": "off"
				            }
				        ]
				    },
				    {
				        "featureType": "water",
				        "elementType": "all",
				        "stylers": [
				            {
				                "saturation": "-97"
				            },
				            {
				                "lightness": "-14"
				            }
				        ]
				    }
				];
				var mapStyleLightDream = [
				    {
				        "featureType": "landscape",
				        "stylers": [
				            {
				                "hue": "#FFBB00"
				            },
				            {
				                "saturation": 43.400000000000006
				            },
				            {
				                "lightness": 37.599999999999994
				            },
				            {
				                "gamma": 1
				            }
				        ]
				    },
				    {
				        "featureType": "road.highway",
				        "stylers": [
				            {
				                "hue": "#FFC200"
				            },
				            {
				                "saturation": -61.8
				            },
				            {
				                "lightness": 45.599999999999994
				            },
				            {
				                "gamma": 1
				            }
				        ]
				    },
				    {
				        "featureType": "road.arterial",
				        "stylers": [
				            {
				                "hue": "#FF0300"
				            },
				            {
				                "saturation": -100
				            },
				            {
				                "lightness": 51.19999999999999
				            },
				            {
				                "gamma": 1
				            }
				        ]
				    },
				    {
				        "featureType": "road.local",
				        "stylers": [
				            {
				                "hue": "#FF0300"
				            },
				            {
				                "saturation": -100
				            },
				            {
				                "lightness": 52
				            },
				            {
				                "gamma": 1
				            }
				        ]
				    },
				    {
				        "featureType": "water",
				        "stylers": [
				            {
				                "hue": "#0078FF"
				            },
				            {
				                "saturation": -13.200000000000003
				            },
				            {
				                "lightness": 2.4000000000000057
				            },
				            {
				                "gamma": 1
				            }
				        ]
				    },
				    {
				        "featureType": "poi",
				        "stylers": [
				            {
				                "hue": "#00FF6A"
				            },
				            {
				                "saturation": -1.0989010989011234
				            },
				            {
				                "lightness": 11.200000000000017
				            },
				            {
				                "gamma": 1
				            }
				        ]
				    }
				];
				var map = new google.maps.Map(document.getElementById('map'), {
					center: {lat: 19.356751, lng: -99.166728},
					zoom: 15,
					scrollwheel: false, // Evitar hacer zoom con el scroll del mouse
					mapTypeControl: false, // Solo muestra el tipo de mapa "TERRAIN"
					streetViewControl: false, // Oculta la opción "STREET VIEW"
					//styles: mapStyleLightDream
				});
				var marker = new google.maps.Marker({
					position: $scope.geocodeResult.geometry.location,
					map: map,
					animation: google.maps.Animation.DROP
				});
				map.fitBounds($scope.geocodeResult.geometry.viewport);
			}, 500);
		});
})