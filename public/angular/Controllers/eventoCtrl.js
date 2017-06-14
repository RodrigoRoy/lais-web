/*Controlador que manda a llamar la información de un evento con su id */

angular.module('EventoCtrl',[])

.filter("trustUrl", ['$sce', function($sce){
	// Para usarse con "ng-bind-html" en la vista
	return function(recordingUrl){
		return $sce.trustAsResourceUrl(recordingUrl);
	};
}])
.controller('EventoController', function ($scope, $routeParams, $location, $uibModal, Evento){

	// Carga síncrona (no recomendada) para mostrar correctamente el mapa en pantalla
	// var initialize = function(){
	// 	var map = new google.maps.Map(document.getElementById('map'), {
	// 		center: {lat: 19.356751, lng: -99.166728},
	// 		zoom: 15
	// 	});
	// };
	// google.maps.event.addDomListenerOnce(window, 'load', initialize);

	$scope.evento = {};

	//Obtiene el evento con su ID
	$scope.getEvent = function(){
		Evento.get($routeParams.id)
		.then(function(res){
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
		}, function(res){ //error
			console.error('Error al obtener la información del evento', res);
		});
	}

	// Elimina un evento de la base de datos
	$scope.delete = function(eventoID){
		Evento.delete(eventoID)
			.then(function(res){
				alert("Evento eliminado");
				$location.url('/eventos'); // Redirigin a página de eventos
			}, function(res){
				alert("Error al eliminar. Por favor intentalo más tarde.");
				console.error("Error al eliminar evento de la base de datos", res);
			});
	};

	// Muestra un modal de advertencia al borrar un archivo
    $scope.openModal = function(evento){
    	$uibModal.open({
    		ariaDescribedBy: 'modal-body',
    		size: 'sm',
    		templateUrl: 'modal-template.html',
    		scope: $scope, // pasar el actual $scope (evitar 'crear' otro controlador)
    		controller: function($uibModalInstance){
    			$scope.evento = evento;
    			$scope.closeModal = function(){
    				$uibModalInstance.dismiss('cancel');
    			};
    			$scope.deleteConfirmed = function(eventoID){
    				$uibModalInstance.close();
    				$scope.delete(eventoID);
    			};
    		}
    	});
    }

    // Inicialización
    $scope.getEvent();
})