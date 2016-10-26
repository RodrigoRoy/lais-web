/*Servicio(Factory) que administra las llamadas a servidor para la sección de contacto.
Útil para el formulario de envio de comentarios y opiniones*/

angular.module('ContactoService', []).factory('Contacto', ['$http', function($http){
	return {
		// enviar datos del formulario al servidor
		mail: function(mailData){
			return $http.post('/api/contacto', mailData);
		}
	}
}]);