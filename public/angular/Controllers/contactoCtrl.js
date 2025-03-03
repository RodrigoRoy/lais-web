// Controlador para la información de contacto

angular.module('ContactoCtrl',[]).controller('ContactoController', function ($scope/*, Contacto*/) {
	
	// $scope.mailData = {}; // Objeto que contiene la información del mensaje a enviar (nombre, email, mensaje)
	// $scope.sending = false; // Bandera 
	// $scope.alerts = {
	// 	success: {msg: 'Mensaje enviado. Gracias por tu comentario.', show: false},
	// 	fail: {msg: 'Hubo un error al enviar el mensaje. Por favor intenta más tarde', show: false}
	// };

	// var placeId = "ChIJVzqPwcH_0YURUNUKXBRNe6E"; // ID del Instituto Mora Madrid
	// var geocoder = new google.maps.Geocoder;
	// geocoder.geocode({placeId: $scope.placeId}, function(res, status){
	// 	if(status == google.maps.GeocoderStatus.OK){
	// 		$scope.$apply(function(){ // Actualiza binding en llamadas asíncronas
	// 			$scope.geocodeResult = res[0];
	// 		});
	// 	}
	// });

	// Al dar clic en el botón de envio, se envia el contenido del formulario para ser enviado desde node js
	// $scope.enviar = function(){
	// 	$scope.sending = !$scope.sending; // false -> true
	// 	for(var i in $scope.alerts) // Marcar todas las alertas (2) para no ser mostradas
	// 		$scope.alerts[i].show = false;
	// 	Contacto.mail($scope.mailData) // Llamada asíncrona para enviar mensaje
	// 		.then(function(res){ // En caso de ser éxitoso el envio
	// 			$scope.sending = !$scope.sending; // true -> false
	// 			// Limpiar el formulario y marcarlo como "nuevo"/"limpio"
	// 			$scope.mailData = {};
	// 			$scope.contactoForm.$setPristine();
	// 			$scope.contactoForm.$setUntouched();
	// 			// Mostrar alerta de éxito de envio
	// 			$scope.alerts.success.show = true;
	// 		}, function(res){ // En caso de error durante el envio
	// 			$scope.sending = !$scope.sending; // true -> false
	// 			// Mostrar alerta de error durante el envio
	// 			$scope.alerts.fail.show = true;
	// 		});
	// };

	// Se ejecuta cada vez que se da clic en "tache" de las alertas para esconder el mensaje correspondiente
	// Recibe como parámetro el nombre de la alerta (propiedad del objeto '$scope.alerts')
	// $scope.closeAlert = function(alert){
	// 	$scope.alerts[alert].show = false;
	// };
});