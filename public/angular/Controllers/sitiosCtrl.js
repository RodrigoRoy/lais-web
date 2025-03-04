/*Controlador de la sección de sitios web */

angular.module('SitiosCtrl', []).controller('SitiosController', function ($scope) {	
	$scope.sitios = [
		{
			title: 'Huellas de Luz',
			text: 'Da acceso a imágenes de América Latina, siglos XIX y XX. Incluye documentación que permite ir más allá de las imágenes y conocer acerca de sus contextos de producción. Vincula con archivos de imágenes de diversos países latinoamericanos y quienes las estudian.',
			url: 'https://lais.mora.edu.mx/huellasdeluz',
			img: 'Huellas_de_Luz.png',
		},
		{
			title: 'MetaDOC',
			text: 'Sitio web que pone a disposición la catalogación de la colección de documentales del Laboratorio Audiovisual de Investigación Social del Instituto Mora, con la intención de impulsar el análisis e investigación sobre este tipo de documentos.',
			url: 'https://lais.mora.edu.mx/metadoc',
			img: 'metaDOC.png',
		},
		{
			title: 'Mapeo de Laboratorios Audiovisuales en México',
			text: 'Listado de espacios colectivos cuyo eje de trabajo es la investigación sobre lo audiovisual y con herramientas audiovisuales que estuvieron presentes en el Encuentro de Laboratorios Audiovisuales de Investigación en México (2022).',
			url: 'https://lais.mora.edu.mx/laboratorios',
			img: 'Mapeo_laboratorios.png',
		},
		{
			title: 'Diálogos documentales de Isla Tortuga al Abya Yala',
			text: 'Sitio web que alberga la información del ciclo de charlas y proyecciones "Diálogos documentales de Isla Tortuga al Abya Yala", alrededor de tres ejes principales: lengua, matriarquía y territorio.',
			url: 'https://lais.mora.edu.mx/proyecciones',
			img: 'Abya_Yala.png',
		},
		{
			title: '¿Cómo la ves? Exposición interactiva',
			text: 'Interactivo diseñado para los padres, tutores y maestros que estamos interesados en reflexionar sobre el consumo indiscriminado y excesivo de la televisión comercial por parte de nuestros hijos y alumnos.',
			url: 'https://www.institutomora.edu.mx/Investigacion/Interactivo_como_la_ves/index.htm',
			img: 'Como_la_ves.png',
		},
	];
});
