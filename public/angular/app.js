

angular.module('laisApp', [
	'ngRoute', // Front end router
	'ngMessages', // Manejador de validación en formularios
	'ngCookies', // Manejo de cookies en el navegador
	'ngAnimate', // Animaciones CSS (keyframes prefabricados)
	'ngSanitize', // Mostrar HTML de manera segura

	'viewsRoutes', // Rutas y controladores
	
	'ngFileUpload', // upload files
	'ui.bootstrap', // Componentes Bootstrap
	'ui.validate', // General purpose validator
	'textAngular', // 3rd party WYSWYG HTML text editor
	'ngTagsInput', // Tagging module for inputs forms
	'720kb.socialshare', // Social share buttons

	'IndexCtrl', // Checa cambios en la URL
	'EventoFormCtrl', // Formulario para eventos
	'InicioCtrl', //Manejo del carusel(slide)
	'EventosCtrl', //Carga toda la informacion de la Base de datos de los eventos
	'EventoCtrl', //Carga la informacion de un evento en particular
	'EventosBusquedaCtrl', //Carga la informacion de la busqueda
	'PublicacionesCtrl', // Información sobre las publicaciones
	'PublicacionCtrl', // Información sobre las publicaciones
	'PublicacionFormCtrl', // Formulario para publicaciones
	'AudiovisualesFormCtrl', // Formulario para registros fotográficos
	'AuthCtrl', //Carga la informacion para autentificar a un usuario
	'AdminCtrl', // Información general para la administración del sitio
	'UsuariosCtrl', // Administración de los usuarios
	'EventosListCtrl', // Administración de los eventos (en forma de lista)
	'PublicacionesListCtrl', // Administración de los eventos (en forma de lista)
	'CarouselCtrl', // Administración de las imagenes del carrusel
	'ArchivosCtrl', //Carga toda la informacion de la Base de datos de los archivos
	'ContactoCtrl', // Página de contacto
	
	'authService', // Servicio para la autentificación de usuarios
	'LugarService', // Servicio para administrar llamadas a la base de datos de "lugares"
	'EventoService', //Servicio que administra las llamadas a la base de datos de "eventos"
	'AutorService', // Servicio que administra las llamadas a la base de datos de "autores"
	'PublicacionService', //Servicio que administra las llamada a la base de datos de "publicaciones"
	'AudiovisualService', //Servicio que administra las llamada a la base de datos de "video" (audiovisuales)
	'CarruselService', // Servicio que administra las llamadas al archivo "carouselSlides.json"
	'ArchivoService', //Servicio que administra las llamadas a la base de datos de "archivos"
	'UsuarioService', //Servicio que administra las llamadas a la base de datos de usuarios
	'EventosBusquedaService', //Servicio que obtiene los oventos con la coincidencia de busqueda
	'ContactoService' // Servicio para envio de información en página de contacto
])

// configuración de aplicación para integrar token en peticiones
.config(function($httpProvider){
	$httpProvider.interceptors.push('AuthInterceptor');
})

// Establecer placeholder vacio en ngInputTags
.config(function(tagsInputConfigProvider){
	tagsInputConfigProvider.setDefaults('tagsInput', {
		placeholder: ''
	});
});