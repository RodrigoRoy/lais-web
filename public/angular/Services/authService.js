/*
Servicio para manejar todo lo referente a la autenticación de un usuario
*/

angular.module('authService', [])

// ===================================================
// auth factory para iniciar sesión y obtener información
// injecta $http para comunicarse con el API
// injecta $q para devolver objetos promise (asíncronos)
// injecta AuthToken para administrar tokens (local storage)
// ===================================================
.factory('Auth', function($http, $q, AuthToken) {
	// crear un objeto auth factory
	var authFactory = {};

	// iniciar sesión para un usuario
	authFactory.login = function(username, password){
		// devolver objeto promise y los datos
		return $http.post('/api/authenticate', {
			username: username,
			password: password
		})
		.success(function(data){
			AuthToken.setToken(data.token);
			return data;
		});
	};

	// cerrar sesión de un usuario al eliminar el token (local storage)
	authFactory.logout = function(){
		// eliminar el token
		AuthToken.setToken();
	};

	// verifica si hay un usuario con sesión iniciada
	// verifica si hay un token en local storage
	authFactory.isLoggedIn = function(){
		if(AuthToken.getToken())
			return true;
		else
			return false;
	};

	// obtener al usuario que está con sesión iniciada
	authFactory.getUser = function(){
		if(AuthToken.getToken())
			return $http.get('/api/usuarios/me');
		else
			return $q.reject({message: 'El usuario no tiene token'});
	};

	//devolver el objeto auth factory
	return authFactory;
})

// ===================================================
// factory  para manejar tokens (local storge)
// injectar $window para almacenar token cliente del lado del cliente
// ===================================================
.factory('AuthToken', function($window){

	var authTokenFactory = {};

	// obtener el token desde local storage
	authTokenFactory.getToken = function(){
		return $window.localStorage.getItem('token');
	};

	// función para establecer token o eliminarlo
	// si se recibe un token como parámetro, se establece el token
	// si no se recibe un token como parámetro, se elimina del local storage
	authTokenFactory.setToken = function(token){
		if(token)
			$window.localStorage.setItem('token', token);
		else
			$window.localStorage.removeItem('token');
	};

	return authTokenFactory;
})

// ===================================================
// configuración de aplicación para integrar token en peticiones
// ===================================================
.factory('AuthInterceptor', function($q, $location, AuthToken){

	var interceptorFactory = {};

	// esto sucederá en todas las peticiones HTTP
	interceptorFactory.request = function(config){
		// obtener el token
		var token = AuthToken.getToken();
		// si el token existe, agregarlo al encabezado como 'x-access-token'
		if(token)
			config.headers['x-access-token'] = token;
		return config;
	};

	// ocurre en respuestas con error
	interceptorFactory.responseError = function(response){
		// si el servidor devuelva una respuesta 403 forbidden
		if(response.status == 403)
			$location.path('/');
		// devuelve los errores del servidor como objeto promise
		return $q.reject(response);
	};

	return interceptorFactory;
});