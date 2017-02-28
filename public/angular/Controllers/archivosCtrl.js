//Controlador que enlista todos los archivos

angular.module('ArchivosCtrl',[]).controller('ArchivosController', function ($scope, $location, $routeParams, $uibModal, Archivo, Upload){
	
	$scope.propertyName = 'createdAt'; // Propiedad usada por default para ordenar los archivos
	$scope.reverse = true; // Orden reversible por default
	$scope.addingDirectory = false;
	//$scope.directoryFile = {}; // Archivo que representa un directorio
	$scope.archivos = []; // Lista de archivos en la base de datos
	$scope.uploadedFiles = []; // Lista de archivos que en ese momento se suben al servidor
	$scope.editable; // ID del evento que en ese momento es editable. También es el indicador de que se lleva a cabo una edición
	$scope.tempFile = {}; // Objeto temporal para actualizar información (como la descripción)
	$scope.currentLocation = $routeParams.path || ''; // Directorio actual
	$scope.breadcrumbsArray = $scope.currentLocation.split('/');//.unshift('Inicio');

	// Establece el arreglo $scope.breadcrumbsArray con los nombres (no vacios) de todas las subcarpetas
	var setBreadcrumbs = function(){
		$scope.breadcrumbsArray = $scope.currentLocation.split('/');
		var cleanArray = [];
		for(var i in $scope.breadcrumbsArray)
			if($scope.breadcrumbsArray[i])
				cleanArray.push($scope.breadcrumbsArray[i]);
		$scope.breadcrumbsArray = cleanArray;
	};

	// Permite obtener/inicializar el arreglo de objetos 'Archivo' para mostrar en la vista
	$scope.getFiles = function(){
		setBreadcrumbs(); // establece la ruta actual para mostrar en la vista
		Archivo.getByLocation($scope.currentLocation)
		.then(function(res){
			if(res.statusText === 'OK'){
				$scope.archivos = res.data;
				for(var i in $scope.archivos){
					// Incluir propiedades extras: tipo y icon
					$scope.archivos[i].tipo = setFileType($scope.archivos[i]);
					$scope.archivos[i].icon = setIcon($scope.archivos[i].tipo);
				}
			}
		}, function(res){
			console.log('Error de conexión con la base de datos');
		});
	};

	// Auxiliar que devuelve un texto que determinar el tipo de archivo en base a su extensión
	// Los valores que devuelve son: 'file' (default), 'text', 'image', 'audio', 'video', 'word', 'excel', 'powerpoint', 'pdf' y 'unknown'
	var setFileType = function(file){
		if(file.directory)
			return 'directory';
		var myREarray = /\.[^\.]*$/.exec(file.filename); // Uso de expresión regular para obtener la extensión
		if(myREarray === null)
			return 'file'
		var extension = myREarray[0];
		if (extension === '.txt')
			return 'text'
		else if (extension === '.jpg' || extension === '.jpeg' || extension === '.gif' || extension === '.png' || extension === '.tiff' || extension === '.bmp' || extension === '.svg' || extension === '.webp')
			return 'image'
		else if (extension === '.ogg' || extension === '.mp3' || extension === '.wav' || extension === '.m4a' || extension === '.wma' || extension === '.aac' || extension === '.flac')
			return 'audio'
		else if (extension === '.mp4' || extension === '.avi' || extension === '.mkv' ||  extension === '.wmv' || extension === '.flv' || extension === '.3gp' || extension === '.ogv' || extension === '.webm')
			return 'video'
		else if (extension === '.doc' || extension === '.docx' || extension === '.odt' || extension === '.fodt')
			return 'word'
		else if (extension === '.xls' || extension === '.xlsx' || extension === '.ods' || extension === '.fods')
			return 'excel'
		else if (extension === '.ppt' || extension === '.pptx' || extension === '.odp' || extension === '.fodp')
			return 'powerpoint'
		else if (extension === '.pdf')
			return 'pdf'
		else
			return 'unknown'
	};

	// Auxiliar para devolver un texto que representa un icono en formato de HTML (iconos de Font Awesome)
	// Recibe como parámetro una cadena de texto que representa el tipo de archivo (y que es resultado de la función setFileType)
	var setIcon = function(filetype){
		var htmlIcon = '<i class="fa fa-file-o fa-1-5x" aria-hidden="true"></i>'; // simple file icon by default
		switch (filetype){
			case 'directory':
				htmlIcon = '<i class="fa fa-folder-o fa-1-5x" aria-hidden="true"></i>';
				break;
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

	$scope.directoryFirstComparator = function(item1, item2){
		// if(item1.directory){
		// 	if(item2.directory)
		// 		return 0;
		// 	else
		// 		return 1;
		// }else{
		// 	if(item2.directory)
		// 		return -1;
		// 	else
		// 		return 0;
		// }
		var first = item1.directory ? 1 : 0,
			second = item2.directory ? 1 : 0;
		return first - second;
	};

	// Sube archivos al servidor
    $scope.uploadFiles = function(file){
        Upload.upload({
            //url: 'api/uploadMultiFiles', // Ruta de Node (usando POST) para el manejo del almacenamiento de los archivos
            url: 'api/files', // Ruta de Node (usando POST) para el manejo del almacenamiento de los archivos
            data: {file: file, path: $scope.currentLocation} // Se pueden incluir datos adicionales (ej. {file: file, 'username': 'Roy'})
        }).then(function (resp) { // Función cuando el archivo es subido exitosamente
            $scope.uploadedFiles = [];
            for(var i in resp.config.data.file) // Crear un objeto dentro de $scope.uploadedFiles por cada archivo
                $scope.uploadedFiles[i] = {
                	filename: resp.config.data.file[i].name, 
                	descripcion: "", 
                	location: $scope.currentLocation, 
                	usuario: $scope.user.id,
                	directory: false
                };
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
            Archivo.unlink($scope.currentLocation + filename).
				then(function(res){
					// console.log("Archivo " + filename + " borrado del sistema");
				}, function(res){
					// console.log("Error al borrar archivo en el sistema");
				});
        }
        if($scope.uploadedFiles.length < 1) // Si no hay más documentos por borrar, eliminar el arreglo vacio
            $scope.uploadedFiles = [];
    };

    // Se ejecuta en clic al botón de "subir archivos". Manda la información de los archivos a la base de datos
    $scope.enviar = function(){
    	Archivo.create($scope.uploadedFiles) // Subir la información de los archivos a la base de datos
        .then(function(res){
            //alert("Se ha guardado la información de los archivos.");
            $scope.uploadedFiles = []; // En caso de que falle reload se vacia el arreglo
            $scope.getFiles(); // Reload de los archivos
        }, function(res){
            if(!res.data.sucess && res.data.error){
        		console.log(res.data.message, res.data.error);
	            $scope.getFiles(); // Reload de los archivos
        	}
        	else
            	console.log("Error de conexión con la base de datos para la creación del archivo.", res);
            $scope.uploadedFiles = []; // En caso de que falle en envio se limpia el formulario
        });
    };

    $scope.showAddDirectory = function(){
    	$scope.addingDirectory = true;
    };

    // Crear un 'archivo' tipo directorio en la base de datos para crear carpetas
    $scope.addDirectory = function(){
    	$scope.directoryFile.directory = true;
    	$scope.directoryFile.location = $scope.currentLocation;
    	$scope.directoryFile.usuario = $scope.user.id;
    	Archivo.create($scope.directoryFile) // Subir la información de los archivos a la base de datos
        .then(function(res){
            // alert("Carpeta creada");
            $scope.directoryFile = {}; // En caso de que falle reload se vacia el arreglo
            $scope.getFiles();
            $scope.addingDirectory = false;
        }, function(res){
            console.log("Error de conexión con la base de datos para la creación del directorio.", res);
        });
    };

    // Elimina un archivo de la base de datos.
    $scope.delete = function(archivoID){
    	var filename;
    	var location;
    	// var path = 'public/files/';
    	Archivo.get(archivoID)
		.then(function(res){
			filename = res.data.filename;
			location = res.data.location;
			Archivo.delete(archivoID)
    		.then(function(res){
    			if(res.statusText === 'OK') // re.data.status === 'OK' utiliza el código de status definido por el usuario
    				Archivo.unlink(location + filename)
					.then(function(res){
						//alert("Se ha eliminado exitosamente el archivo");
						$scope.getFiles(); // Reload de los archivos
					}, function(res){
						if (res.status === 400) {
							console.log('Error al borrar archivo del sistema', res);
						}
						if(res.status === 404){ // res.statusText === 'Not Found'
							//alert("Se ha eliminado el archivo de la lista");
							$scope.getFiles(); // Reload de los archivos
						}
					});
    		}, function(res){
    			console.log('Error de conexión con la base de datos', res);
    		});
		}, function(res){
			console.log('Error de conexión con la base de datos', res);
		});
    };

    // Asigna $scope.editable al ID del archivo que se desea edita.
    // En la vista, $scope.editable indica que en ese momento se está llevando a cabo una edición
    $scope.enableEdit = function(archivoID){
    	$scope.editable = archivoID;
    	//console.log($scope.editable);
    };

    // Actualizar la información de un archivo (por ejemplo, descripción). 
    // Se ejecuta al dar clic en botón de palomita o perder enfoque en <input ng-model="tempFile.descripcion">
    $scope.update = function(){
    	Archivo.update($scope.editable, $scope.tempFile)
    		.then(function(res){
    			$scope.getFiles(); // Reload de los archivos
    			$scope.editable = undefined;
    			$scope.tempFile = {};
    		}, function(res){
    			console.log('Error de conexión con la base de datos');
    		});
    };

    $scope.openModal = function(archivo){
    	$uibModal.open({
    		ariaDescribedBy: 'modal-body',
    		size: 'sm',
    		templateUrl: 'modal-template.html',
    		scope: $scope, // pasar el actual $scope (evitar 'crear' otro controlador)
    		controller: function($uibModalInstance){
    			$scope.archivo = archivo;
    			$scope.closeModal = function(){
    				$uibModalInstance.dismiss('cancel');
    			};
    			$scope.deleteConfirmed = function(archivoID){
    				$scope.delete(archivoID);
    				$uibModalInstance.close();
    			};
    		}
    	});
    }

    // Inicialización: Cargar la lista de archivos.
    $scope.getFiles();
});