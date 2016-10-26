// Controlador para la información de contacto

angular.module('ContactoCtrl',[]).controller('ContactoController', function ($scope, Contacto) {
	
	$scope.placeId = "ChIJVzqPwcH_0YURUNUKXBRNe6E";
	$scope.mailData = {};

	var geocoder = new google.maps.Geocoder;
	geocoder.geocode({placeId: $scope.placeId}, function(res, status){
		if(status == google.maps.GeocoderStatus.OK){
			$scope.$apply(function(){ // Actualiza binding en llamadas asíncronas
				$scope.geocodeResult = res[0];
			});
		}
	});

	$scope.enviar = function(){
		Contacto.mail($scope.mailData)
			.then(function(res){
				console.log('Success');
			}, function(res){
				console.log('Error');
			});
	};
});