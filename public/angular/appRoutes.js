/*Administración de las rutas para mostrar y controlar en el front-end */

angular.module('viewsRoutes', []).config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider){
	
	$routeProvider
		// HOME
		.when('/', {
			templateUrl: 'angular/views/pages/inicio.html',
			controller: 'InicioController'
		})

		.when('/eventos', {
			templateUrl: 'angular/views/pages/eventosGral.html',
			controller: 'EventosController'
		})

		.when('/eventos/nuevo', {
			templateUrl: 'angular/views/pages/formularioEvento.html',
			controller: 'EventoFormController'
		})

		.when('/eventos/busqueda/:query',{
			templateUrl: 'angular/views/pages/eventosBusqueda.html',
			controller: 'EventosBusquedaController'
		})

		.when('/eventos/:id/edit',{
			templateUrl: 'angular/views/pages/formularioEvento.html',
			controller: 'EventoFormController'
		})

		.when('/eventos/:id',{
			templateUrl: 'angular/views/pages/evento.html',
			controller: 'EventoController'
		})

		.when('/publicaciones', {
			templateUrl: 'angular/views/pages/publicaciones.html',
			controller: 'PublicacionesController'
		})

		.when('/publicaciones/nuevo', {
			templateUrl: 'angular/views/pages/publicacionForm.html',
			controller: 'PublicacionFormController'
		})

		.when('/publicaciones/:id', {
			templateUrl: 'angular/views/pages/publicacion.html',
			controller: 'PublicacionController'
		})

		.when('/publicaciones/:id/edit', {
			templateUrl: 'angular/views/pages/publicacionForm.html',
			controller: 'PublicacionFormController'
		})

		.when('/admin',{
			templateUrl: 'angular/views/pages/admin.html',
			controller: 'AdminController'
		})

		.when('/admin/eventos',{
			templateUrl: 'angular/views/pages/eventosList.html',
			controller: 'EventosListController'
		})

		.when('/admin/publicaciones',{
			templateUrl: 'angular/views/pages/publicacionesList.html',
			controller: 'PublicacionesListController'
		})

		.when('/admin/usuarios',{
			templateUrl: 'angular/views/pages/usuarios.html',
			controller: 'UsuariosController'
		})

		.when('/archivos',{
			templateUrl: 'angular/views/pages/archivos.html',
			controller: 'ArchivosController'
		})

		.when('/contacto',{
			templateUrl: 'angular/views/pages/contacto.html',
			controller: 'ContactoController'
		})

		// RUTAS INVÁLIDAS (no descritas previamente)
		.otherwise({
			redirectTo: '/'
		});
	

	// establecer el uso de URLS modernas (sin #)
	$locationProvider.html5Mode(true);
}]);


