/*Controlador de la sección de integrantes */

angular.module('IntegrantesCtrl', []).controller('IntegrantesController', function ($scope) {	
	// Información de integrantes
	$scope.personas = [
		{
			nombre: "Lourdes Roca",
			contacto: "lroca@mora.edu.mx",
			semblanza: "Lourdes Roca es profesora-investigadora del Instituto Mora. Coordina el Laboratorio Audiovisual de Investigación Social que fundó en 2002. Es doctora en antropología y documentalista, con una formación multidisciplinaria en comunicación, historia y antropología. Se ha especializado en la investigación social con imágenes y la construcción de propuestas metodológicas para la investigación audiovisual. Como docente ha impartido cursos de especialización en la materia en varios países de América Latina. Entre sus publicaciones cuenta con documentales, libros, artículos y sitios web.",
			lineasInvestigacion:"Historia social con imágenes, siglos XIX a XXI, antropología de lo visual, investigación audiovisual.",
			formacion: "Comunicación, Historia, Antropología",
			produccion: [
				// { tipo: "Documental", text: "Km. C-62. Un nómada del riel", url: "publicacion/587ea0f2ce559cbb160701cf", date: '2000' },
				{ tipo: "Libro", text: "Métodos en Acción. Estudios sobre documental e investigación social", url: "publicacion/603937d5d96f496022f87e8c", date: '2020' },
				{ tipo: "Revista", text: "Dixit. Hacia un panorama del ámbito audiovisual documental latinoamericano", url: "publicacion/6397875a900ef057492019f8", date: '2022' },
				{ tipo: "Libro", text: "Tejedores de Imágenes. Propuestas metodológicas de investigación y gestión del patrimonio fotográfico y audiovisual", url: "publicacion/61a17d63516d11448857b756", date: '2014' },
			],
			imagen: "Lourdes Roca.jpg",
		},
		{
			nombre: "Felipe Morales Leal",
			contacto: "fmorales@mora.edu.mx",
			semblanza: "Felipe Morales Leal es maestro en Comunicación e integrante del Laboratorio Audiovisual de Investigación Social del Instituto Mora desde su fundación en el año de 2002, donde ha colaborado en diversos proyectos de investigación y divulgación del conocimiento social. Ha hecho investigación, guionismo y realización de varios documentales del Instituto Mora. Por más de una década se ha dedicado al estudio de la exhibición cinematográfica en la Ciudad de México, abordando sus transformaciones y la forma en que éstas han afectado a los asistentes a las salas. Desde el año 2002 ha publicado artículos en libros y revistas cuyo tema son las transformaciones urbanas del espacio analizadas a partir de las imágenes.",
			lineasInvestigacion:"Exhibición cinematográfica, investigación con fuentes audiovisuales, historiografía del cine documental.",
			formacion: "Comunicación",
			produccion: [
				{ tipo: "Documental", text: "El Triángulo de Tacubaya. Historia de Cine Hipódromo Condesa", url: "publicacion/587f937cdf2e296b0fd8b028", date: '2005' },
				{ tipo: "Capítulo de libro", text: "El método Ken Burns, el documental histórico y la serie La Guerra de Vietnam, en Métodos en Acción", url: "publicacion/603937d5d96f496022f87e8c", date: '2020' },
				{ tipo: "Artículo", text: "Las salas de cine antes de los palacios. La exhibición cinematográfica en la ciudad de México hacia finales de los años veinte", url: "publicacion/59d7fd02c59e4f661b5fd04d", date: '2013' },
			],
			imagen: "Felipe Morales.jpg",
		},
		{
			nombre: "Lilia García",
			contacto: "lgarciat@mora.edu.mx",
			semblanza: "Lilia García Torres es integrante del LAIS desde 2021 y doctorante en Estudios Latinoamericanos en la Universidad Nacional Autónoma de México. Es corealizadora del documental Trinchera sonora. Voces y Miradas de Radio Venceremos (2017) y realizadora de Polinizadorxs. Resistencia en la Península de Yucatán (2022). En 2020 impulsó el Editatón “Mujeres documentalistas a la wiki”, y actualmente coordina la investigación “Mujeres Documentalistas en México (1970-1985)”.",
			lineasInvestigacion:"Producción de imágenes hechas por grupos gueriilleros salvadoreños y documental hecho por mujeres.",
			formacion: "Estudios latinoamericanos",
			produccion: [
				{ tipo: "Artículo", text: "Últimas pioneras del Súper 8: cine hecho por mujeres ikoots", url: "publicacion/6717ad97f6143d79cebdbc10", date: '2021' },
				{ tipo: "Capítulo de libro", text: "Mirar en clave ikoots. Lecturas etnográficas del Primer Taller de Cine Indígena", url: "publicacion/6717b43df6143d79cebdbc11", date: '2021' },
				{ tipo: "Documental", text: "Trinchera sonora. Voces y miradas de Radio Venceremos", url: "publicacion/5dcd7f6781e95d5d3e014ba4", date: '2017' },
			],
			imagen: "Lilia García.jpg",
		},
		{
			nombre: "Rodrigo Colín",
			contacto: "rcolin@mora.edu.mx",
			semblanza: "Rodrigo Colín es integrante del LAIS desde 2015 con formación en ciencias de la computación por parte de la Facultad de Ciencias de la Universidad Nacional Autónoma de México. Colabora en el desarrollo de sistemas, digitalización de material audiovisual, administración de la información y posproducción audiovisual. Es programador del sitio web metaDOC, especializado en catalogación y difusión de documentales para impulsar su análisis. Actualmente desarrolla alternativas de software libre para la catalogación de registros audiovisuales que promueven la práctica de descripción documental.",
			lineasInvestigacion:"Humanidades digitales, desarrollo de software libre para la investigación social con fuentes audiovisuales.",
			formacion: "Ciencias de la computación",
			produccion: [
				{ tipo: "Sitio web", text: "metaDOC. Documentales e investigación", url: "metadoc/", date: '2016' },
				{ tipo: "Sitio web", text: "Laboratorios audiovisuales de investigación en México", url: "laboratorios/", date: '2023' },
				{ tipo: "Capítulo de libro", text: "Propuesta metodológica y de análisis computacional para identificar el proceso fotográfico en fotografías históricas del siglo XIX y XX", url: "publicacion/604858210f7a6715b57220aa", date: '2020' },
			],
			imagen: "Rodrigo Colín.jpg",
			socialMedia: [
				{ icon: 'bi:github', url: 'https://github.com/RodrigoRoy/', text: 'GitHub' },
				// { icon: 'bi:twitter-x', url: 'https://x.com/R_RodrigoRoy', text: 'Twitter/X' },
			]
		},
	];
});
