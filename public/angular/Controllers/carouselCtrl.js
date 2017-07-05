/*
    Controlador para organizar imagenes del carrusel. 
*/

angular.module('CarouselCtrl', []).controller('CarouselController', function ($scope, $route, $window, Carrusel, Upload) {
    $scope.slides = {}; // Arreglo de objetos que representan diapositivas del carrusel
    $scope.newSlide = {}; // Objeto que representa una nueva diapositiva. Contiene las propiedades image, url, text

    // Lista de objetos que representan las diapositivas
    // [Propiedad]  [Obligatorio]   [Significado]
    // imagen       true            URL de la imagen a mostrar
    // text         false           Texto que acompaña a la imagen
    // url          false           URL para hacer hipervínculo

    // Obtener la información de las diapositivas
    $scope.getSlides = function(){
        Carrusel.get()
        .then(function(res){
            $scope.slides = res.data.slides;
        }, function(res){
            $scope.slides = {};
            console.error('Error al obtener información del carrusel: ', res);
        });
    };

    // Intercambia el orden de dos diapositivas en el arreglo $scope.slides.
    // Los indices indican las posiciones de las diapositivas a intercambiar
    $scope.swapSlides = function(index1, index2){
        if(index1 >= 0 && index2 >= 0 && index1 < $scope.slides.length && index2 < $scope.slides.length){
            var temp = $scope.slides[index1];
            $scope.slides[index1] = $scope.slides[index2];
            $scope.slides[index2] = temp;
        }
    };
    // Intercambia la dispositiva cuyo indice sea pasado como parámetro con la inmediata anterior
    $scope.upSlide = function(index){
        $scope.swapSlides(index, index - 1);
    };
    // Intercambia la dispositiva cuyo indice sea pasado como parámetro con la inmediata posterior
    $scope.downSlide = function(index){
        $scope.swapSlides(index, index + 1);
    };

    // Borra la dispositiva en la posición dada como paŕámetro
    $scope.deleteSlide = function(index){
        $scope.slides.splice(index, 1);
    };

    // Agrega la información de una nueva diapositiva ($scope.newSlide) al arreglo principal ($scope.slides)
    $scope.addSlide = function(){
        $scope.slides.push($scope.newSlide);
        // Limpiar el formulario y $scope.newSlide:
        $scope.newSlide = {};
        $scope.carouselForm.$setPristine();
        $scope.carouselForm.$setUntouched();
    };

    // Sube archivo (imagen) al servidor
    $scope.uploadImage = function(file){
        Upload.upload({
            url: 'api/images', // Ruta de Node (usando POST) para el manejo del almacenamiento de la imagen
            data: {file: file, path: 'carrusel/'} // Se pueden incluir datos adicionales (ej. {file: file, 'username': 'Roy'})
        }).then(function (resp) { // Función cuando el archivo es subido exitosamente
            $scope.newSlide.image = 'imgs/carrusel/' + resp.config.data.file.name; // concatenar nombre de la carpeta contenedora
        }, function (resp) { // Función para manejo de error
            console.error('Error status: ' + resp.status);
        }, function (evt) { // Función para notificar progreso
            // var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            // console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    };

    // Actualiza la información del carrusel, es decir:
    // - Agrega una nueva diapositiva (solo si se subió una imagen)
    // - Guarda la información mediante el servicio correspondiente
    // - Recarga la información en pantalla
    $scope.sendInfo = function(){
        // Agregar slide si al menos existe la información de la imagen:
        if($scope.newSlide.image)
            $scope.addSlide();
        // Después actualizar los datos de las diapositivas:
        Carrusel.update($scope.slides)
        .then(function(res){
            alert("Carrusel actualizado. Se recargará la página");
            // $scope.getSlides();
            $route.reload();
            // $window.location.reload();
        }, function(res){
            console.error('Error al actualizar información del carrusel: ', res);
        });
    };

    // INICIALIZACIÓN:
    $scope.getSlides();

});