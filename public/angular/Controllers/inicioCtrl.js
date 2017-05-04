//Controlador que maneja la página de Inicio

angular.module('InicioCtrl',[]).controller('InicioController', function ($scope) { // Evento
	
	$scope.myInterval = 5000; //Intervalo de tiempo para pasar de un slide a otro 
	$scope.slides = [ // Nombres de imagenes en public/imgs/carrusel
		"city-q-g-900-500-8.jpg", 
		"nature-q-c-900-500-3.jpg", 
		"people-q-c-900-500-7.jpg", 
		"transport-q-c-900-500-9.jpg"
	];

	// Evento.news() //Se trae los 4 eventos para el slide
	// 	.then(function(res){ 
	// 		$scope.slides = res.data;
	// 	}, function(res){ 
	// 		alert('Error de Conexión con la Base de Datos');
	// 	});

})