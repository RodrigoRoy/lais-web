//Controlador para un usuario registrado (administrador)

angular.module('AdminCtrl',[]).controller('AdminController', function ($scope, $location, $window, Evento) {
	
	// $scope.foo = 'Foo';
	$scope.logout = function (){
		localStorage.removeItem("sesion");
		//console.log("Cerrar Sesion",localStorage.getItem("sesion"));
		//window.alert("Sesión cerrada");
		// $location.url('/'); // TODO: No actualiza la página y en index sigue apareciendo "Adminstración del sitio"
		$window.location.href = '/';
	}

})