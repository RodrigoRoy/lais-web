//Controlador que enlista todos los archivos

angular.module('ArchivosCtrl',[]).controller('ArchivosController', function ($scope, $location, $route, $window, Archivo, Upload) {
	
	$scope.propertyName = 'fechaCreacion'; // Propiedad usada por default para ordenar los archivos
	$scope.reverse = true; // Orden reversible por default
	$scope.archivos = []; // Lista de archivos en la base de datos
	$scope.uploadedFiles = []; // Lista de archivos que en ese momento se suben al servidor
	$scope.editable; // ID del evento que en ese momento es editable. También es el indicador de que se lleva a cabo una edición
	$scope.tempFile = {}; // Objeto temporal para actualizar información (como la descripción)

	// Obtener todos los archivos para mostrar en la vista
	Archivo.all()
		.then(function(res){
			if(res.statusText === 'OK'){
				$scope.archivos = res.data;
				for(var i in $scope.archivos){
					// Incluir propiedades extras: tipo y icon
					$scope.archivos[i].tipo = setFileType($scope.archivos[i].filename);
					$scope.archivos[i].icon = setIcon($scope.archivos[i].tipo);
				}
			}
		}, function(res){
			console.log('Error de conexión con la base de datos');
		});

	// Auxiliar que devuelve un texto que determinar el tipo de archivo en base a su extensión
	// Los valores que devuelve son: 'file' (default), 'text', 'image', 'audio', 'video', 'word', 'excel', 'powerpoint', 'pdf' y 'unknown'
	var setFileType = function(filename){
		var myREarray = /\.[^\.]*$/.exec(filename); // Uso de expresión regular para obtener la extensión
		if(myREarray === null)
			return 'file'
		else if (myREarray[0] === '.txt')
			return 'text'
		else if (myREarray[0] === '.jpg' || myREarray[0] === '.jpeg' || myREarray[0] === '.gif' || myREarray[0] === '.png' || myREarray[0] === '.tiff' || myREarray[0] === '.bmp' || myREarray[0] === '.svg' || myREarray[0] === '.webp')
			return 'image'
		else if (myREarray[0] === '.ogg' || myREarray[0] === '.mp3' || myREarray[0] === '.wav' || myREarray[0] === '.m4a' || myREarray[0] === '.wma' || myREarray[0] === '.aac' || myREarray[0] === '.flac')
			return 'audio'
		else if (myREarray[0] === '.mp4' || myREarray[0] === '.avi' || myREarray[0] === '.mkv' ||  myREarray[0] === '.wmv' || myREarray[0] === '.flv' || myREarray[0] === '.3gp' || myREarray[0] === '.ogv' || myREarray[0] === '.webm')
			return 'video'
		else if (myREarray[0] === '.doc' || myREarray[0] === '.docx' || myREarray[0] === '.odt' || myREarray[0] === '.fodt')
			return 'word'
		else if (myREarray[0] === '.xls' || myREarray[0] === '.xlsx' || myREarray[0] === '.ods' || myREarray[0] === '.fods')
			return 'excel'
		else if (myREarray[0] === '.ppt' || myREarray[0] === '.pptx' || myREarray[0] === '.odp' || myREarray[0] === '.fodp')
			return 'powerpoint'
		else if (myREarray[0] === '.pdf')
			return 'pdf'
		else
			return 'unknown'
	};

	// Auxiliar para devolver un texto que representa un icono en formato de HTML (iconos de Font Awesome)
	// Recibe como parámetro una cadena de texto que representa el tipo de archivo (y que es resultado de la función setFileType)
	var setIcon = function(filetype){
		var htmlIcon = '<i class="fa fa-file-o fa-1-5x" aria-hidden="true"></i>'; // simple file icon by default
		switch (filetype){
			case 'text':
				htmlIcon = '<i class="fa fa-file-text-o fa-1-5x" aria-hidden="true"></i>';
				break;
			case 'image':
				htmlIcon = '<i class="fa fa-file-image-o fa-1-5x" aria-hidden="true"></i>';
				break;
			case 'audio':
				htmlIcon = '<i class="fa fa-file-audio-o fa-1-5x" aria-hidden="true"></i>';
				break;
			case 'video':
				htmlIcon = '<i class="fa fa-file-video-o fa-1-5x" aria-hidden="true"></i>';
				break;
			case 'word':
				htmlIcon = '<i class="fa fa-file-word-o fa-1-5x" aria-hidden="true"></i>';
				break;
			case 'excel':
				htmlIcon = '<i class="fa fa-file-excel-o fa-1-5x" aria-hidden="true"></i>';
				break;
			case 'powerpoint':
				htmlIcon = '<i class="fa fa-file-powerpoint-o fa-1-5x" aria-hidden="true"></i>';
				break;
			case 'pdf':
				htmlIcon = '<i class="fa fa-file-pdf-o fa-1-5x" aria-hidden="true"></i>';
				break;
		}
		return htmlIcon;
	};

	// Asigna la propiedad usada para el orden de la tabla de eventos
	// Se ejecuta en cada clic a los encabezados de la tabla de archivos de la vista
	$scope.sortBy = function(propertyName){
		$scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
		$scope.propertyName = propertyName;
	};

	// Abre el archivo en una nueva ventana (similar a <a href="filename">)
	$scope.openFile = function(filename){
		$window.open('files/' + filename);
	};

	// Sube archivos al servidor
    $scope.uploadFiles = function(file){
        Upload.upload({
            url: 'api/uploadMultiFiles', // Ruta de Node (usando POST) para el manejo del almacenamiento de los archivos
            data: {file: file} // Se pueden incluir datos adicionales (ej. {file: file, 'username': 'Roy'})
        }).then(function (resp) { // Función cuando el archivo es subido exitosamente
            $scope.uploadedFiles = [];
            for(var i in resp.config.data.file) // Crear un objeto dentro de $scope.uploadedFiles por cada archivo
                $scope.uploadedFiles[i] = {filename: resp.config.data.file[i].name, descripcion: ""};
        }, function (resp) { // Función para manejo de error
            console.log('Error status: ' + resp.status);
        }, function (evt) { // Función para notificar progreso
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ');
        });
    };

    // Elimina un archivo de la lista $scope.uploadFiles[]
    $scope.deleteFile = function(filename){
    	var index;
    	for (var i in $scope.uploadedFiles) // Buscar el indice
    		if($scope.uploadedFiles[i].filename === filename){
    			index = i;
    			break; // Termina el ciclo for en caso de encontrar el nombre deseado
    		}
        if(index !== undefined){ // Remover de manera segura en el arreglo
            $scope.uploadedFiles.splice(index, 1);
            // Elminar del sistema de archivos
            Archivo.unlink('/files/', filename).
				then(function(res){
					console.log("Archivo " + filename + " borrado del sistema");
				}, function(res){
					console.log("Error al borrar archivo en el sistema");
				});
        }
        if($scope.uploadedFiles.length < 1) // Si no hay más documentos por borrar, eliminar el arreglo vacio
            $scope.uploadedFiles = undefined;
    };

    // Se ejecuta en clic al botón de "subir archivos". Manda la información de los archivos a la base de datos
    $scope.enviar = function(){
    	Archivo.create($scope.uploadedFiles) // Subir la información de los archivos a la base de datos
        .then(function(res){
            alert("Se ha guardado la información de los archivos.");
            $scope.uploadedFiles = []; // En caso de que falle reload se vacia el arreglo
            $route.reload(); // Reload a la página para mostrar los nuevos archivos recien subidos
        }, function(res){
            console.log("Error de conexión con la base de datos para la creación del evento.", res);
        });
    };

    // Elimina un archivo de la base de datos.
    $scope.delete = function(archivoID){
    	var filename;
    	// var path = 'public/files/';
    	Archivo.get(archivoID).
    		then(function(res){
    			filename = res.data.filename;
    			Archivo.delete(archivoID)
		    		.then(function(res){
		    			if(res.statusText === 'OK') // re.data.status === 'OK' utiliza el código de status definido por el usuario
		    				// Archivo.unlink({path: path, filename: filename}).
		    				Archivo.unlink('/files/', filename).
		    					then(function(res){
		    						alert("Se ha eliminado exitosamente el archivo");
		    						$route.reload();
		    					}, function(res){
		    						if (res.status === 400) {
		    							console.log('Error al borrar archivo del sistema');
		    						}
		    						if(res.status === 404){ // res.statusText === 'Not Found'
		    							alert("Se ha eliminado el archivo de la lista");
		    							$route.reload();
		    						}
		    					});
		    		}, function(res){
		    			console.log('Error de conexión con la base de datos');
		    		});
    		}, function(res){
    			console.log('Error de conexión con la base de datos');
    		});
    };

    // Asigna $scope.editable al ID del archivo que se desea edita.
    // En la vista, $scope.editable indica que en ese momento se está llevando a cabo una edición
    $scope.enableEdit = function(archivoID){
    	$scope.editable = archivoID;
    	console.log($scope.editable);
    };

    // Actualizar la información de un archivo (por ejemplo, descripción). 
    // Se ejecuta al dar clic en botón de palomita o perder enfoque en <input ng-model="tempFile.descripcion">
    $scope.update = function(){
    	Archivo.update($scope.editable, $scope.tempFile)
    		.then(function(res){
    			$route.reload();
    			$scope.editable = undefined;
    			$scope.tempFile = {};
    		}, function(res){
    			console.log('Error de conexión con la base de datos');
    		});
    };
});