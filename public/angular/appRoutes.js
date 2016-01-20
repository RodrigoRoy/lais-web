/*Administración de las rutas para mostrar y controlar en el front-end */

angular.module('viewsRoutes', []).config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider){
	
	$routeProvider
		// HOME
		.when('/', {
			templateUrl: 'angular/views/pages/inicio.html'
		})

		.when('/eventos', {
			templateUrl: 'angular/views/pages/eventosGral.html'
		})

		.when('/eventos/nuevo', {
			templateUrl: 'angular/views/pages/formularioEvento.html',
			controller: 'EventoFormController'
		})

		// RUTAS INVÁLIDAS (no descritas previamente)
		.otherwise({
			redirectTo: '/'
		});
	

	// establecer el uso de URLS modernas (sin #)
	$locationProvider.html5Mode(true);
}]);


