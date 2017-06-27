//Controlador que maneja la página de Inicio

angular.module('InicioCtrl',[]).controller('InicioController', function ($scope, $http, $uibModal){ // Evento
	
	// Lista de objetos que representan las diapositivas a mostrar en la página principal.
	// Propiedad	Obligatorio	Significado
	// image 		true		URL de la imagen a mostrar
	// text		false		Texto que acompaña a la imagen
	// url 		false		URL para hacer hipervínculo
	// $scope.slides = [
	// 	{
	// 		image: 'imgs/carrusel/metadoc.jpg',
	// 		text: 'Catalogación de la colección de documentales del Laboratorio Audiovisual de Investigación Social',
	// 		url: 'http://lais.mora.edu.mx/metadoc'
	// 	},
	// 	{
	// 		image: 'imgs/carrusel/huellas_de_luz.jpg',
	// 		text: 'Fototecas digitales que dan acceso a imágenes de América Latina, siglos XIX y XX',
	// 		url: 'http://lais.mora.edu.mx/huellasdeluz'
	// 	},
	// 	{
	// 		image: 'imgs/carrusel/nature-q-c-1280-720-10.jpg',
	// 		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec libero neque, molestie vitae lorem a, pellentesque blandit magna. Etiam vestibulum efficitur accumsan. Etiam vel enim nibh.',
	// 		url: 'http://lorempixel.com/'
	// 	},
	// 	{
	// 		image: 'imgs/eventos/1er Congreso.jpg'
	// 	}
	// ];

	$http.get('js/carouselSlides.json').then(function(res){
		$scope.slides = res.data.slides;
	});

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

	// Evento.news() //Se trae los 4 eventos para el slide
	// 	.then(function(res){ 
	// 		$scope.slides = res.data;
	// 	}, function(res){ 
	// 		alert('Error de Conexión con la Base de Datos');
	// 	});

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