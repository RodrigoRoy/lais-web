angular.module('EventoSlideCtrl',[]).controller('EventoSlideController', function ($scope) {
	$scope.myInterval = 5000;
  	$scope.noWrapSlides = false;
	var slides = $scope.slides = [];
	var currIndex = 0;


	slides.push({
		urlImage: 'imgs/slideuno.jpg',
		titulo: "titulo uno",
		texto: 'Primera Imagen',
		id: currIndex++
	});

	slides.push({
		urlImage: 'imgs/slidedos.jpg',
		texto: 'Primera Imagen',
		id: currIndex++
	});

	slides.push({
		urlImage: 'imgs/slidetres.jpg',
		texto: 'Primera Imagen',
		id: currIndex++
	});

	console.log($scope.slides);
	/*
	$scope.addSlide = function() {
		var newWidth = 600 + slides.length + 1;
	    slides.push({
	      image: '//lorempixel.com/' + newWidth + '/300',
	      text: ['Nice image','Awesome photograph','That is so cool','I love that'][slides.length % 4],
	      id: currIndex++
	    });
	};

	$scope.randomize = function() {
	    var indexes = generateIndexesArray();
	    assignNewIndexesToSlides(indexes);
	};

	for (var i = 0; i < 4; i++) {
	    $scope.addSlide();
	}

	// Randomize logic below

	function assignNewIndexesToSlides(indexes) {
	    for (var i = 0, l = slides.length; i < l; i++) {
	      slides[i].id = indexes.pop();
		}
	}
	*/

})