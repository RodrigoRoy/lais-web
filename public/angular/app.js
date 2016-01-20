

angular.module('laisApp', [
	'ngRoute', // Front end router
	'ngMessages', // Manejor de validación  en formularios
	'ngCookies', // Manejo de cookies en el navegador
	'ngAnimate', // Animaciones CSS (keyframes prefabricados)
	'ngSanitize', // Mostrar HTML de manera segura

	'viewsRoutes', // Rutas y controladores
	
	'ngFileUpload', // upload files
	'ui.bootstrap', // Componentes Bootstrap
	//'textAngular' // 3rd party WYSWYG HTML text editor

	'EventoFormCtrl',
	'EventoSlideCtrl', //Manejo del carusel(slide)
	'EventosCtrl', //Carga toda la informacion de la Base de datos de los eventos
	'EventoService' //Servicio que administra las llamadas a la base de datos de eventos
]);

