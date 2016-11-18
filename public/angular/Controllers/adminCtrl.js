//Controlador para un usuario registrado (administrador)

angular.module('AdminCtrl',[]).controller('AdminController', function ($scope, $location, $window, Auth) {
	
	// Cierra sesión al eliminar el token del Local Storage del navegador
	$scope.cerrarSesion = function (){
		Auth.logout();
		$scope.loggedIn = false;
		$scope.user = {}; // reset toda la información del usuario
		$location.path('/');
	}

})