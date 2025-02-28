/*Controlador de la sección de integrantes */

angular.module('PostdoctoralCtrl', []).controller('PostdoctoralController', function ($scope) {	
	// Información de postdoctoral
	$scope.personas = [
		{
			nombre: "David Jurado",
			adscripcion: "Instituto Mora - Historia moderna y contemporanea",
			lineasInvestigacion: "Historia de cine documental en América Latina, estéticas de la memoria y de la autoficción en el cine y la literatura, economías de la atención en la era de las plataformas audiovisuales, discursos audiovisuales sobre el antropoceno/capitaloceno, historia del Cine sobre arte.",
			proyecto: "Procesos en el cine documental: desafíos ambientales y sociales en Francia y México",
			descripcion: "En el marco de un estudio comparativo entre la producción de cine contemporáneo en México y Francia, esta investigación estudia los recursos fílmicos y discursivos, y las problemáticas etnográficas y sociológicas del cine documental ambiental y social contemporáneo.",
			semblanza: "Doctor en Estudios Románicos por la Universidad de la Sorbona y Maestro en Estudios Cinematográficos y Nuevos medios por la Universidad de Paris. Ha realizado investigaciones para el Fondo de Desarrollo Cinematográfico-Proimágenes Colombia (2020) y PROCINE CDMX (2023). Es autor de varios libros y artículos sobre cine latinoamericano. Ha formado parte de equipos logísticos y curatoriales para festivales y muestras de cine documental en París, Bogotá y México.",
			contacto: "djurado@mora.edu.mx",
			socialMedia: [
				{ icon: 'academia', url: 'https://mora.academia.edu/DavidJurado', text: 'Academia.edu' },
				{ icon: 'instagram', url: 'https://www.instagram.com/david.jurado.quatreinsta/', text: 'Instagram' },
			],
			imagen: "David Jurado.jpg",
		},
		{
			nombre: "Manuel Almazán",
			adscripcion: "Instituto Mora - Historia moderna y contemporanea",
			lineasInvestigacion: "Historia gráfica, antropología audiovisual, migraciones internacionales.",
			proyecto: "Los mareros, el desierto y la migra. Representaciones de la frontera en el cine documental, 1986-2019",
			descripcion: "Esta investigación estudia las representaciones de las fronteras norte y sur de México a través de diferentes documentales. El objetivo principal es evidenciar el vínculo entre las políticas migratorias implementadas en territorio mexicano durante las últimas décadas y la producción y exhibición de documentales que tienen como tema principal las fronteras. Para esto se contempla la elaboración de un corpus documental a partir de la cartelera de diferentes festivales, la búsqueda en publicaciones especializadas y la experiencia del investigador como consumidor audiovisual. Asimismo, se contempla la elaboración de categorías analíticas que permitan abordar diferentes tipos de frontera de acuerdo a su ubicación, dinámica administrativa y efectos sobre los migrantes.",
			semblanza: "Especialista en migración internacional (COLEF), doctor en historia (UG) y maestro en antropología social (COLSAN). Miembro fundador de la Red Abya Yala. Forma parte del Sistema Nacional de Investigadoras e Investigadores.",
			contacto: "jmhernandez@mora.edu.mx",
			socialMedia: [
				{ icon: 'academia', url: 'https://independent.academia.edu/ManuelAlmazán', text: 'Academia.edu' },
				{ icon: 'orcid', url: 'https://orcid.org/0000-0002-2557-3011', text: 'ORCID' },
				{ icon: 'x', url: 'https://x.com/ManuelAlmazan17', text: 'Twitter/X' },
			],
			imagen: "Manuel Almazán.jpg",
		},
	];
});
