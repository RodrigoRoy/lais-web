/*Administración de las rutas para mostrar y controlar en el front-end */

angular.module('viewsRoutes', []).config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider){
	
	$routeProvider
		// HOME
		.when('/', {
			templateUrl: 'angular/views/pages/inicio.html'
		})

		// .when('/registro',{
		// 	templateUrl: 'angular/views/usuarioRegistro.html'
		// })

		.when('/eventos', {
			templateUrl: 'angular/views/pages/eventosGral.html',
			controller: 'EventosController'
		})

		.when('/eventos/nuevo', {
			templateUrl: 'angular/views/pages/formularioEvento.html',
			controller: 'EventoFormController'
		})

		.when('/usuarios',{
			templateUrl: 'angular/views/pages/usuarios.html'
		})

		.when('/publicaciones',{
			templateUrl: 'angular/views/pages/publicaciones.html'
		})

		.when('/eventos/busqueda/:query',{
			templateUrl: 'angular/views/pages/eventosBusqueda.html',
			controller: 'EventosBusquedaController'
		})

		.when('/eventos/:id',{
			templateUrl: 'angular/views/pages/evento.html',
			controller: 'EventoController'
		})

		// RUTAS INVÁLIDAS (no descritas previamente)
		.otherwise({
			redirectTo: '/'
		});
	

	// establecer el uso de URLS modernas (sin #)
	$locationProvider.html5Mode(true);
}]);


