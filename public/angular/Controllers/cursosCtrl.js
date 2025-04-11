/*Controlador de la sección de cursos de especialización */

angular.module('CursosCtrl', []).controller('CursosController', function ($scope) {	
	// Fotografías de cursos
	$scope.taller = [
		{img: 'Taller01.jpg', text: 'Eu aliquet arcu purus'},
		{img: 'Taller02.jpg', text: 'Vestibulum feugiat, leo id tempus imperdiet'},
		{img: 'Taller05.jpg', text: 'Augue lectus consectetur'},
		{img: 'Taller04.jpg', text: 'Non faucibus enim purus'},
		{img: 'Taller03.jpg', text: 'Etiam congue dolor sit amet'},
		{img: 'Taller06.jpg', text: 'Fusce quis auctor neque venenatis felis'},
	];

	$scope.cursos = [
		{ nombre: 'Virna Molina', procedencia: 'Instituto de Arte Cinematográfico de Avellaneda, Argentina', fecha: '2024' },
		{ nombre: 'Mariana X. Rivera y Josué Vergara', procedencia: 'Universidad Autónoma Metropolitana (Unidad Iztapalapa)', fecha: '2023' },
		{ nombre: 'María Aimaretti', procedencia: 'Universidad de Buenos Aires', fecha: '2020' },
		{ nombre: 'Gregorio Rocha', procedencia: 'Centro Universitario de Estudios Cinematográficos, UNAM', fecha: '2019' },
		{ nombre: 'Héctor Veitía', procedencia: 'Escuela Internacional de Cine y Televisión de San Antonio de los Baños, Cuba', fecha: '2018' },
		{ nombre: 'Carlos Mendoza Aupetit', procedencia: 'Canal 6 de Julio. Escuela Nacional de Artes Cinematográficas, UNAM', fecha: '2017' },
		{ nombre: 'Julieta Keldjian', procedencia: 'Universidad Católica de Uruguay', fecha: '2016' },
		{ nombre: 'Miguel Mirra', procedencia: 'Movimiento de Documentalistas Argentina', fecha: '2015' },
		{ nombre: 'Ana Mauad', procedencia: 'Laboratório de História Oral e Imagem, Brasil', fecha: '2014' },
		{ nombre: 'Belkis Vega', procedencia: 'Escuela Internacional de Cine y Televisión de San Antonio de los Baños, Cuba. Escuela Superior de Cine y Audiovisuales de Catalunya', fecha: '2013' },
		{ nombre: 'Catarina Alves Costa', procedencia: 'Universidad de Lisboa', fecha: '2012' },
		{ nombre: 'Malcolm Collier', procedencia: 'Universidad de San Francisco, Estados Unidos', fecha: '2002' },
		{ nombre: 'Susana Sel', procedencia: 'Universidad de Buenos Aires, Argentina', fecha: '2001' },
		{ nombre: 'Beate Engelbrecht', procedencia: 'Institut für den Wissenschaftlichen Film Göttingen, Alemania', fecha: '2000' },
		{ nombre: 'Virgilio Tosi', procedencia: 'Scuola di Cinema de Roma', fecha: '1999' },
	]
});