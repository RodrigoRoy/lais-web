/*Controlador de la sección de cursos de especialización */

angular.module('CursosCtrl', []).controller('CursosController', function ($scope) {	
	$scope.taller = [
		{img: 'Taller01.jpg', text: 'Eu aliquet arcu purus'},
		{img: 'Taller02.jpg', text: 'Vestibulum feugiat, leo id tempus imperdiet'},
		{img: 'Taller05.jpg', text: 'Augue lectus consectetur'},
		{img: 'Taller04.jpg', text: 'Non faucibus enim purus'},
		{img: 'Taller03.jpg', text: 'Etiam congue dolor sit amet'},
		{img: 'Taller06.jpg', text: 'Fusce quis auctor neque venenatis felis'},
	];
});