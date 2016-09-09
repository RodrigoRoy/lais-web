/*Servicio(Factory) que administra las llamadas a servidor para obtener,editar,enviar y 
eliminar datos de los usuario a la base de datos*/


angular.module('UsuarioService', []).factory('Usuario', ['$http', function($http){
	return {
		
		//
		me: function (){
			return $http.get('/api/usuarios/me');
		},

		//Inicia sesion con los datos del usuario(usename, password) 
		sign: function (usuarioData){
			return $http.post('/api/authenticate', usuarioData);
		}
	}
}]);