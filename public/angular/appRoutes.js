/*Administración de las rutas para mostrar y controlar en el front-end */

angular.module('viewsRoutes', []).config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider){

	$routeProvider
		.when('/', {
			templateUrl: 'angular/Views/pages/inicio.html',
			controller: 'InicioController'
		})

		.when('/eventos', {
			templateUrl: 'angular/Views/pages/eventosGral.html',
			controller: 'EventosController',
			reloadOnSearch: false // Permite establecer url params sin recargar página
		})

		.when('/eventos/nuevo', {
			templateUrl: 'angular/Views/pages/eventoForm.html',
			controller: 'EventoFormController'
		})

		.when('/eventos/busqueda/:query',{
			templateUrl: 'angular/Views/pages/eventosBusqueda.html',
			controller: 'EventosBusquedaController'
		})

		.when('/eventos/:id/edit',{
			templateUrl: 'angular/Views/pages/eventoForm.html',
			controller: 'EventoFormController'
		})

		.when('/eventos/:id',{
			templateUrl: 'angular/Views/pages/evento.html',
			controller: 'EventoController'
		})

		.when('/publicacion', {
			templateUrl: 'angular/Views/pages/publicaciones.html',
			controller: 'PublicacionesController',
			reloadOnSearch: false // Permite establecer url params sin recargar página
		})

		.when('/publicacion/nuevo', {
			templateUrl: 'angular/Views/pages/publicacionForm.html',
			controller: 'PublicacionFormController'
		})

		.when('/publicacion/:id', {
			templateUrl: 'angular/Views/pages/publicacion.html',
			controller: 'PublicacionController'
		})

		.when('/publicacion/:id/edit', {
			templateUrl: 'angular/Views/pages/publicacionForm.html',
			controller: 'PublicacionFormController'
		})

		.when('/audiovisuales/nuevo', {
			templateUrl: 'angular/Views/pages/audiovisualesForm.html',
			controller: 'AudiovisualesFormController'
		})

		.when('/audiovisuales/:id/edit', {
			templateUrl: 'angular/Views/pages/audiovisualesForm.html',
			controller: 'AudiovisualesFormController'
		})

		.when('/admin',{
			templateUrl: 'angular/Views/pages/admin.html',
			controller: 'AdminController'
		})

		.when('/admin/eventos',{
			templateUrl: 'angular/Views/pages/eventosList.html',
			controller: 'EventosListController'
		})

		.when('/admin/publicaciones',{
			templateUrl: 'angular/Views/pages/publicacionesList.html',
			controller: 'PublicacionesListController'
		})

		.when('/admin/audiovisuales',{
			templateUrl: 'angular/Views/pages/audiovisualesList.html',
			controller: 'AudiovisualesListController'
		})

		.when('/admin/usuarios',{
			templateUrl: 'angular/Views/pages/usuarios.html',
			controller: 'UsuariosController'
		})

		.when('/admin/carrusel',{
			templateUrl: 'angular/Views/pages/carousel.html',
			controller: 'CarouselController'
		})

		.when('/archivos',{
			templateUrl: 'angular/Views/pages/archivos.html',
			controller: 'ArchivosController'
		})

		.when('/contacto',{
			templateUrl: 'angular/Views/pages/contacto.html',
			controller: 'ContactoController'
		})

		.when('/convocatorias',{
			templateUrl: 'angular/Views/pages/convocatorias.html',
			controller: 'ConvocatoriasController'
		})

		.when('/integrantes',{
			templateUrl: 'angular/Views/pages/integrantes.html',
			controller: 'IntegrantesController'
		})

		// RUTAS INVÁLIDAS (no descritas previamente)
		.otherwise({
			redirectTo: '/'
		});


	// establecer el uso de URLS modernas (sin #)
	$locationProvider.html5Mode(true);
}]);
