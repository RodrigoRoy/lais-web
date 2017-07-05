//Controlador que maneja la página de Inicio

angular.module('InicioCtrl',[]).controller('InicioController', function ($scope, $http, $uibModal, Carrusel){ // Evento
	
	// Obtener datos del carrusel
	Carrusel.get()
    .then(function(res){
        $scope.slides = res.data.slides;
    }, function(res){
        console.error('Error al obtener información del carrusel: ', res);
    });

	// Obtener datos de la linea del tiempo
	$http.get('js/timelineLAIS.json').then(function(res){
		var timelineConfig = {
			default_bg_color: '#eee',
			scale_factor: 2,
			optimal_tick_width: 100,
			start_at_slide: 0,
			duration: 950,
			language: 'es'
		};
		var timeline = new TL.Timeline('timeline-embed', res.data, timelineConfig);
    });

	// Muestra un modal con información adicional
    $scope.openModal = function(){
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