/*Se define la aplicación de angular cargando sus principales modulos necesrios para la aplicación como
dependencias, servicios(factory) y controladores*/


angular.module('laisApp', [
	'ngRoute', // Front end router
	'ngMessages', // Manejor de validación  en formularios
	'ngCookies', // Manejo de cookies en el navegador
	'ngAnimate', // Animaciones CSS (keyframes prefabricados)
	'ngSanitize', // Mostrar HTML de manera segura

	'viewsRoutes', // Rutas y controladores
	
	'ui.bootstrap', // Componentes Bootstrap
	//'textAngular' // 3rd party WYSWYG HTML text editor

	'EventoFormCtrl'
]);

