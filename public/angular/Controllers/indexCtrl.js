/*
	Controlador para ser usado en la barra de navegación (navbar) y que verifica si hay cambios en la URL.
	Esto es necesario para que el efecto parallax de la página inicial funcione correctamente con "ng-href",
	y para que funcione "href" en páginas distintas a la de inicio (por ejemplo: /eventos).
*/

angular.module('IndexCtrl',[]).controller('IndexController', function ($scope, $location){
	$scope.$on('$locationChangeStart', function(event) { // Se ejecuta en cada cambio de URL
	    if($location.path() === '/') // Verificar si estamos en la página inicial
	    	$scope.isIndex = true; // Variable que se utiliza en la vista (index.html)
	    else
	    	$scope.isIndex = false;
	});
});