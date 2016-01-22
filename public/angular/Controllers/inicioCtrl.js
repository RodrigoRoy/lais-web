//Controlador que maneja la página de Inicio

angular.module('EventoSlideCtrl',[]).controller('EventoSlideController', function ($http, $scope, Evento) {
	
	$scope.myInterval = 5000; //Intervalo de tiempo para pasar de un slide a otro 

	Evento.news() //Se trae los 4 eventos para el slide
		.then(function(res){ 
			$scope.slides = res.data;
			//console.log($scope.slides);
		}, function(res){ 
			alert('Error de Conexión con la Base de Datos');
		});

})