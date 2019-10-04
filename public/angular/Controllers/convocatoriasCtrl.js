/*Controlador de la página de convocatorias, se encarga de redirigir a la página correspondiente */

angular.module('ConvocatoriasCtrl', []).controller('ConvocatoriasController', function ($scope, $timeout, $window) {

	// Obtiene la información de todos los eventos
	$scope.redirect = function(){
		$window.location.href = 'http://lais-interno.mora.edu.mx/convocatorias/index.php/277314?lang=es-MX';
	};

	// INICIALIZACION
  $timeout(function(){
    $scope.redirect();
  }, 5000);

});
