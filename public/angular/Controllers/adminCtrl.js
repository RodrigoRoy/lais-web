//Controlador para un usuario registrado (administrador)

angular.module('AdminCtrl',[]).controller('AdminController', function ($scope, $location, $window, Auth) {
	
	// No permitir ingresar a la página de este controlador sin sesión iniciada
	if(!$scope.loggedIn)
		$location.path('/');

	// Cierra sesión al eliminar el token del Local Storage del navegador
	$scope.cerrarSesion = function (){
		Auth.logout();
		$scope.loggedIn = false;
		$scope.user = {}; // reset toda la información del usuario
		$location.path('/');
	}

})