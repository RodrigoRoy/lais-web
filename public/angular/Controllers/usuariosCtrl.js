//Controlador para un usuario registrado (administrador)

angular.module('UsuariosCtrl',[]).controller('UsuariosController', function ($scope, Usuario, $route) {
	
	// Valores por default para un nuevo usuario
	var defaultPermissions = {
		'permissions': {'create': true, 'read': true, 'update': false, 'delete': false},
		'permisos': 12,
		'admin': false
	};
	$scope.newUser = defaultPermissions;
	
	// Varias banderas/flags que ayudan en la vista
	$scope.loadingUsers = true;
	$scope.creatingUser = false;
	$scope.sendingInfo = false;
	$scope.showAlert = false;
	$scope.showSuccess = false;
	$scope.editable; // Representa el ID del usuario que se está editando en ese momento
	$scope.serverMessage = '';

	// Obtener todos los usuarios de la base de datos
	$scope.getUsers = function(){
		Usuario.all()
			.then(function(res){
				if(res.statusText === 'OK'){
					$scope.usuarios = res.data;
				}
			}, function(res){
				console.log('Error de conexión con la base de datos');
			});
	};

	// Convierte los valores boolean en el correspondiente valor decimal para representar el nivel de permisos
	// Para más info sobre los permisos revisar el modelo Usuario de la base de datos
	$scope.convertPermissions = function(){
		$scope.newUser.permisos = 0;
		var binaryPermissions = '';
		binaryPermissions += $scope.newUser.permissions.create ? '1' : '0';
		binaryPermissions += $scope.newUser.permissions.read ? '1' : '0';
		binaryPermissions += $scope.newUser.permissions.update ? '1' : '0';
		binaryPermissions += $scope.newUser.permissions.delete ? '1' : '0';
		var decimalPermissions = parseInt(binaryPermissions, 2);
		$scope.newUser.permisos = decimalPermissions;
	};

	// Copia de la función "convertPermissions"
	// Algún día seré juzgado por esta atroz mala práctica, pero mientras tanto ahorré tiempo :)
	$scope.convertTempPermissions = function(){
		$scope.tempUser.permisos = 0;
		var binaryPermissions = '';
		binaryPermissions += $scope.tempUser.permissions.create ? '1' : '0';
		binaryPermissions += $scope.tempUser.permissions.read ? '1' : '0';
		binaryPermissions += $scope.tempUser.permissions.update ? '1' : '0';
		binaryPermissions += $scope.tempUser.permissions.delete ? '1' : '0';
		var decimalPermissions = parseInt(binaryPermissions, 2);
		$scope.tempUser.permisos = decimalPermissions;
	};

	// Cierra/esconde el cuadro de dialogo de la vista
	$scope.closeAlert = function(){
		$scope.showAlert = false;
		$scope.showSuccess = false;
	};

	// Crea un usuario con los datos del formulario
	$scope.createUser = function(newUserInfo){
		$scope.sendingInfo = true;
		Usuario.create($scope.newUser)
		.then(function(res){
			// Success
			$scope.sendingInfo = false;
			if(res.data.success){
				$scope.newUser = defaultPermissions; // reset valores por default
				$scope.userForm.$setPristine(); // limpiar formulario
				$scope.userForm.$setUntouched();

				$scope.serverMessage = res.data.message; // asignar el mensaje a mostrar
				$scope.showSuccess = true;
				$scope.creatingUser = false;
			}
			else{
				$scope.serverMessage = res.data.message; // asignar el mensaje a mostrar
				$scope.showAlert = true;
			}
		}, function(res){
			// Fail
			$scope.sendingInfo = false;
			
			$scope.serverMessage = res.data.message; // asignar el mensaje a mostrar
			$scope.showAlert = true;
			console.log("Error de conexión con la base de datos");
		});
	};

	// Asigna $scope.editable al ID del usuario que se desea editar.
    // En la vista, $scope.editable indica que en ese momento se está llevando a cabo una edición
	$scope.enableEdit = function(user){
    	$scope.editable = user._id;
    	$scope.tempUser = user; // NOTA: Paso por referencia causa "error" en la vista al dar clic en otro botón "edit"
    };

	// Actualizar la información de un archivo (por ejemplo, descripción). 
    // Se ejecuta al dar clic en botón de palomita o perder enfoque en <input ng-model="tempFile.descripcion">
    $scope.updateUser = function(){
    	Usuario.update($scope.editable, $scope.tempUser)
    		.then(function(res){
    			$route.reload();
    			$scope.editable = undefined;
    			$scope.tempUser = {};
    		}, function(res){
    			console.log('Error de conexión con la base de datos');
    		});
    };

    // *** INICIALIZACIÓN ***
	$scope.getUsers();
})