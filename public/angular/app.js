

angular.module('laisApp', [
	'ngRoute', // Front end router
	'ngMessages', // Manejador de validación en formularios
	'ngCookies', // Manejo de cookies en el navegador
	'ngAnimate', // Animaciones CSS (keyframes prefabricados)
	'ngSanitize', // Mostrar HTML de manera segura

	'viewsRoutes', // Rutas y controladores
	
	'ngFileUpload', // upload files
	'ui.bootstrap', // Componentes Bootstrap
	'textAngular', // 3rd party WYSWYG HTML text editor
	'ngTagsInput', // Tagging module for inputs forms
	'720kb.socialshare', // Social share buttons

	'EventoFormCtrl', // Formulario para eventos
	'IndexCtrl', // Checa cambios en la URL
	'EventoSlideCtrl', //Manejo del carusel(slide)
	'EventosCtrl', //Carga toda la informacion de la Base de datos de los eventos
	'EventoCtrl', //Carga la informacion de un evento en particular
	'AuthCtrl', //Carga la informacion para autentificar a un usuario
	'EventosBusquedaCtrl', //Carga la informacion de la busqueda
	'AdminCtrl', // Información general para la administración del sitio
	'EventosListCtrl', // Administración de los eventos (en forma de lista)
	'ArchivosCtrl', //Carga toda la informacion de la Base de datos de los archivos
	'ContactoCtrl', // Página de contacto
	
	'LugarService', // Servicio para administrar llamadas a la base de datos de "lugares"
	'EventoService', //Servicio que administra las llamadas a la base de datos de "eventos"
	'ArchivoService', //Servicio que administra las llamadas a la base de datos de "archivos"
	'UsuarioService', //Servicio que administra las llamadas a la base de datos de usuarios
	'EventosBusquedaService', //Servicio que obtiene los oventos con la coincidencia de busqueda
	'ContactoService' // Servicio para envio de información en página de contacto
]);

