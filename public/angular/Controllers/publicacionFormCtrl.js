/* Formulario para registrar una publicación */

angular.module('PublicacionFormCtrl',[]).controller('PublicacionFormController', function ($scope, Publicacion, Autor){

	$scope.publicacion = {};
	$scope.edit = false;
	$scope.calendar = {
		open: false,
	}
	$scope.dateOptions = {
		formatYear: 'yyyy',
	    minMode: 'year'
	};
	$scope.publicacion.usuario = $scope.user.id ? $scope.user.id : undefined;
	$scope.getAutor = function(query){
		return Autor.search(query).
			then(function(res){
				return res.data;
			});
	}
	$scope.onSelectAutor = function(item, model, label, event){
		if(!$scope.publicacion.autor)
			$scope.publicacion.autor = [];
		if(!$scope.publicacion.autorNombres)
			$scope.publicacion.autorNombres = [];
		$scope.publicacion.autor.push(item._id);
		$scope.publicacion.autorNombres.push(model); // item.apellido + ', ' + item.nombre
		$scope.asyncAutorInput = "";
	};
	$scope.openCalendar = function(event){
		$scope.calendar.open = true;
	};
	$scope.updateKeywords = function(){
		if($scope.keywords){
            $scope.publicacion.keywords = [];
            for(var i in $scope.keywords)
                $scope.publicacion.keywords[i] = $scope.keywords[i].text; // NOTA: la propiedad "text" contiene el nombre del tag/keyword
        }
	};
	$scope.loadTags = function(query){
		return Publicacion.tagSearch(query).
			then(function(res){
				return res.data;
			});
	};
	$scope.enviar = function(){
        Publicacion.create($scope.publicacion) // Subir la información de la publicación a la base de datos
        .then(function(res){
            alert("Se ha guardado la información de la publicación.");
            //$location.url('/publicaciones/' + res.data.id); // Redirigir a la página del evento creado
        }, function(res){
            console.log("Error de conexión con la base de datos para la creación del evento.", res);
        });
    };
})