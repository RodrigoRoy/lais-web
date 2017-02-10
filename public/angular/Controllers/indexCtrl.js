/*
	Controlador para ser usado en la barra de navegación (navbar) y que verifica si hay cambios en la URL.
	Esto es necesario para que el efecto parallax de la página inicial funcione correctamente con "ng-href",
	y para que funcione "href" en páginas distintas a la de inicio (por ejemplo: /eventos).
*/

angular.module('IndexCtrl',[]).controller('IndexController', function ($scope, $location, $uibModal, $rootScope, Auth){
	$scope.user = {}; // Información del usuario (si inicia sesión)
	$scope.loggedIn = false; // Bandera que indica si un usuario se encuetra con sesión iniciada
	$scope.today = new Date();

	// determinar si una persona está con sesión iniciada
	//$scope.loggedIn = Auth.isLoggedIn();
	$scope.loggedIn = !angular.equals($scope.user, {});

	// verificar si un usuario está con sesión iniciada en cada petición o cambio de ruta/página
	$rootScope.$on('$routeChangeStart', function(){
		if($location.path() === '/') // Verificar si estamos en la página inicial
	    	$scope.isIndex = true; // Variable que se utiliza en la vista (index.html)
	    else
	    	$scope.isIndex = false;
	    
		// obtener la información del usuario
		Auth.getUser()
			.then(function(res){
				$scope.user = res.data;
				$scope.loggedIn = !angular.equals($scope.user, {});
				//console.log("LoggedIn? ", $scope.loggedIn);
				console.log("User: ", $scope.user);
			}, function(res){
				// console.error("User data can't found: ", res);
				$scope.user = {};
				$scope.loggedIn = !angular.equals($scope.user, {});
				console.error("LoggedIn? ", $scope.loggedIn);
				console.error("User: ", $scope.user);
			});
	});

	//Función que inicializa y abre el modal con su respectivo template, asociado a un controlador
	$scope.openModal = function() {
		var modalInstance = $uibModal.open({
			animation: true,
		  	templateUrl: 'loginModalContent.html',
		  	controller: 'AuthController'
		});
	};

	// Determina si el usuario tiene permisos para realizar determinada operación
	// Recibe como parámetro un string con la operación deseada:
	// "create", "read", "update", "delete"
	// Devuelve true en caso de que el usuario tenga permisos suficientes, false en otro caso.
	$scope.can = function(permission){
		if(!$scope.user.permisos)
			return false;
		var binaryPermission = $scope.user.permisos.toString(2); // Conversión decimal a binario
		while(binaryPermission.length < 4) // Forzar la notación a 4 dígitos
			binaryPermission = '0' + binaryPermission; // Ceros a la izquierda
		switch(permission.toLowerCase()){
			case 'create':
				return binaryPermission.charAt(0) === '1';
			case 'read':
				return binaryPermission.charAt(1) === '1';;
			case 'update':
				return binaryPermission.charAt(2) === '1';;
			case 'delete':
				return binaryPermission.charAt(3) === '1';;
			default:
				return false;
		}
	};
});

/*(Sub)Controlador que le da la funcionalidad a lo que se ha declarado dentro del modal. 
Anhidado en el controlador IndexCtrl para usarse con $uibModal*/
angular.module('AuthCtrl',[]).controller('AuthController', function ($scope, $location, $uibModalInstance, Auth){
	$scope.logging = false; // Bandera para indicar que se está realizando inicio de sesión
	$scope.showAlert = false; // Bandera para indicar que se debe mostrar un mensaje de error en forma de alerta
	
	// Oculta el mensaje de error en la vista
	$scope.closeAlert = function(){
		$scope.showAlert = false;
	};
	// Cierra el modal de inicio de sesión
	$scope.closeModal = function(){
		$uibModalInstance.dismiss('cancel');
	};
	
	/*Funcion que inicia sesion y verifica si todo es correcto*/
	$scope.iniciarSesion = function(){
		$scope.logging = true;
		Auth.login($scope.user.name, $scope.user.pass)
			.then(function(res){
				if(res.data.success){ // Éxito en inicio de sesión
					$scope.logging = false;
					$scope.showAlert = false;
					$scope.loginForm.$setPristine(); // Limpiar el formulario
					$scope.loginForm.$setUntouched(); // Limpiar el formulario
					$uibModalInstance.dismiss('cancel'); // Cerrar modal
					$location.path('/admin');
				}else{ // Error en inicio de sesión
					// Establecer el mensaje de error con la información del servidor
					if(res.data.code === 'username')
						$scope.errorMessage = res.data.message;
					else if(res.data.code === 'password')
						$scope.errorMessage = res.data.message;
					else
						$scope.errorMessage = 'Hubo un error de conexión. Por favor intenta más tarde';
					$scope.showAlert = true; // Mostrar alerta
					$scope.logging = false;
				}
			}, function(res){
				console.error('Error al iniciar sesión: ', res);
				$scope.logging = false;
			});
	};
});