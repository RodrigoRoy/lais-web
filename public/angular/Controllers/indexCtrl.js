/*
	Controlador para ser usado en la barra de navegación (navbar) y que verifica si hay cambios en la URL.
	Esto es necesario para que el efecto parallax de la página inicial funcione correctamente con "ng-href",
	y para que funcione "href" en páginas distintas a la de inicio (por ejemplo: /eventos).
*/

angular.module('IndexCtrl',[]).controller('IndexController', function ($scope, $location, $uibModal){
	$scope.$on('$locationChangeStart', function(event) { // Se ejecuta en cada cambio de URL
	    if($location.path() === '/') // Verificar si estamos en la página inicial
	    	$scope.isIndex = true; // Variable que se utiliza en la vista (index.html)
	    else
	    	$scope.isIndex = false;
	});

	if(localStorage.getItem("sesion")){
		$scope.sesion = true;
		//console.log("No vacio",$scope.sesion);
	}else{
		$scope.sesion = false;
		//console.log("vacio",$scope.sesion);
	}

	//Función que inicializa y abre el modal con su respectivo template, asociado a un controlador
	$scope.open = function() {
		var modalInstance = $uibModal.open({
			animation: true,
		  	templateUrl: 'loginModalContent.html',
		  	controller: 'AuthController'
		});
	};

	//Funcion que cierra sesion
	$scope.cerrarSesion = function (){
		localStorage.removeItem("sesion");
		//console.log("Cerrar Sesion",localStorage.getItem("sesion"));
		window.location.reload();
	}

});

/*(Sub)Controlador que le da la funcionalidad a lo que se ha declarado dentro del modal. 
Anhidado en el controlador IndexCtrl para usarse con $uibModal*/
angular.module('AuthCtrl',[]).controller('AuthController', function ($scope, $location, $uibModalInstance, Usuario){
	
	/*Funcion que inicia sesion y verifica si todo es correcto*/
	$scope.iniciarSesion = function (user, pass){
		Usuario.sign(
			{
				"username": user,
				"password": pass
			}).then(function (res){
				if(res.data.success){ //Exito de inicio de sesion
					$scope.token = res.data.token;
					//console.log("Token",$scope.token);
					
					localStorage.setItem("sesion", $scope.token); //LocalStorage de inicio de sesion
					//console.log("Sesion",localStorage.getItem("sesion"));
					// window.location.reload();
					$location.url('/admin'); // No alcanza el tiempo para redirigir
					// $scope.sesion = true; // No hay binding que se refleje en la vista HTML
					// $uibModalInstance.dismiss('cancel');
					window.location.reload(); // Solución temporal
				}else{ //No es correcto el inicio de sesion
					console.log("Usuario o Password incorrectos");
				}
			}, function (data, status){ //Mal conexion con el servidor
				console.log("Error con el servidor");
			});
	};

	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};
});