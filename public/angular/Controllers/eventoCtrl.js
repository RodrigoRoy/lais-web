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

			setTimeout(function(){
				var map = new google.maps.Map(document.getElementById('map'), {
					center: {lat: 19.356751, lng: -99.166728},
					zoom: 15
				});
				// console.log("map", map);
			}, 500);

			// Reverse Geocoding para obtener dirección a partir de PlaceID ($scope.evento.lugar)
			var geocoder = new google.maps.Geocoder;
			geocoder.geocode({placeId: $scope.evento.lugar}, function(res, status){
				if(status == google.maps.GeocoderStatus.OK){
					$scope.$apply(function(){ // Actualiza binding en llamadas asíncronas
						$scope.direccion = res[0].formatted_address;
					});
				}
			});

			// TODO: Agregar marcador al mapa en base a respuesta de Geocoder
			// var marker = google.maps.Marker({
			// 	map: map
			// });
		});
})