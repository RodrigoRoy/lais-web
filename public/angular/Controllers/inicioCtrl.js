//Controlador que maneja la página de Inicio

angular.module('InicioCtrl',[]).controller('InicioController', function ($scope, $uibModal){ // Evento
	
	$scope.myInterval = 5000; //Intervalo de tiempo para pasar de un slide a otro 
	$scope.slides = [ // Nombres de imagenes en public/imgs/carrusel
		"city-q-g-900-500-8.jpg", 
		"nature-q-c-900-500-3.jpg", 
		"people-q-c-900-500-7.jpg", 
		"transport-q-c-900-500-9.jpg"
		// "a8.jpg",
		// "captura-de-pantalla-2013-04-27-a-las-22-30-31.png",
		// "HEAD_metadoc2916.jpg",
		// "image003.png"
	];

	// Evento.news() //Se trae los 4 eventos para el slide
	// 	.then(function(res){ 
	// 		$scope.slides = res.data;
	// 	}, function(res){ 
	// 		alert('Error de Conexión con la Base de Datos');
	// 	});

	// Muestra un modal de advertencia al borrar un archivo
    $scope.openModal = function(/*publicacion*/){
    	$uibModal.open({
    		ariaDescribedBy: 'modal-body',
    		size: 'lg',
    		templateUrl: 'about.html',
    		scope: $scope, // pasar el actual $scope (evitar 'crear' otro controlador)
    		controller: function($uibModalInstance){
    			$scope.closeModal = function(){
    				$uibModalInstance.dismiss('cancel');
    			};
    		}
    	});
    }

})