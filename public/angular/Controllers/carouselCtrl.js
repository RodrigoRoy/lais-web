/*
    Controlador para organizar imagenes del carrusel. 
*/

angular.module('CarouselCtrl', []).controller('CarouselController', function ($scope, $http, Carrusel) {
    $scope.slides = {};
    $scope.newSlide = {};

    // $http.get('js/carouselSlides.json').then(function(res){
    Carrusel.get()
    .then(function(res){
        $scope.slides = res.data.slides;
    }, function(res){
        $scope.slides = {};
        console.error('Error al obtener información del carrusel: ', res);
    });

    $scope.swapSlides = function(index1, index2){
        if(index1 >= 0 && index2 >= 0 && index1 < $scope.slides.length && index2 < $scope.slides.length){
            var temp = $scope.slides[index1];
            $scope.slides[index1] = $scope.slides[index2];
            $scope.slides[index2] = temp;
        }
    };
    $scope.upSlide = function(index){
        $scope.swapSlides(index, index - 1);
    };
    $scope.downSlide = function(index){
        $scope.swapSlides(index, index + 1);
    };

    $scope.deleteSlide = function(index){
        $scope.slides.splice(index, 1);
    };

    $scope.addSlide = function(){
        $scope.slides.push($scope.newSlide);
        // Limpiar el formulario y $scope.newSlide:
        $scope.newSlide = {};
        $scope.carouselForm.$setPristine();
        $scope.carouselForm.$setUntouched();
    };

    $scope.sendInfo = function(){
        Carrusel.update($scope.slides)
        .then(function(res){
            console.log("Updating...");
            // TODO: Actualizar página
        }, function(res){
            console.error('Error al actualizar información del carrusel: ', res);
        });
    };
});