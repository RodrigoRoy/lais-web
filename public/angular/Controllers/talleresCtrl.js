/*Controlador de la sección de talleres */

angular.module('TalleresCtrl', []).controller('TalleresController', function ($scope) {	
	$scope.taller = [
		{img: 'Taller01.jpg', text: 'Manejo de micrófonos'},
		{img: 'Taller02.jpg', text: 'Explorando lentes fotográficos'},
		{img: 'Taller05.jpg', text: 'Reproducción de documentos'},
		{img: 'Taller04.jpg', text: 'Investigación audiovisual'},
		{img: 'Taller03.jpg', text: 'Manejo de cámara fotográfica'},
		{img: 'Taller06.jpg', text: 'Trabajo en campo con grabadora'},
	];
});
