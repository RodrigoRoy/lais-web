/*Controlador de la página de convocatorias, se encarga de redirigir a la página correspondiente */

angular.module('ConvocatoriasCtrl', []).controller('ConvocatoriasController', function ($scope, $timeout, $window) {

	// Obtiene la información de todos los eventos
	$scope.redirect = function(){
		$window.location.href = 'https://forms.gle/69LcgX9XYFWqUJwL7';
	};

	// INICIALIZACION
  $timeout(function(){
    $scope.redirect();
  }, 5000);

});
