/*Controlador que inicializa un cookie para saber en que ruta vamos a estar de la aplicacion*/

angular.module('IndexCtrl',[]).controller('IndexRutasController', function ($scope, $cookies) {
	console.log("Inicio: " + $cookies.get('inicio'))
	$cookies.put('inicio','#inicio');
	$scope.urlInicio = $cookies.get('inicio');

	$cookies.put('historia','#historia');
	$scope.urlHistoria = $cookies.get('historia');

	$cookies.put('recursos','#recursosLinea');
	$scope.urlRecursos = $cookies.get('recursos');

	$scope.clickEventos = function(){
		$cookies.put('inicio','/#inicio')
		$scope.urlInicio = $cookies.get('inicio');
		$cookies.put('historia','/#historia')
		$scope.urlHistoria = $cookies.get('historia');
		$cookies.put('recursos','/#recursosLinea');
		$scope.urlRecursos = $cookies.get('recursos');	
		console.log("Click Eventos: " + $scope.urlInicio)
	}

})