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
			semblanza: "Licenciado en Letras por la Universidad de Guadalajara (MX), Maestro en Estudios Cinematográficos y Nuevos medios por la Universidad de Paris y Doctor en Estudios Románicos por la Universidad de la Sorbona. Fue becario del Fonca para estudios en el extranjero, becario Conahcyt y de la Region Île de France para estudios de doctorado. Ha realizado investigaciones para el Fondo de Desarrollo Cinematográfico-Proimágenes Colombia (2020) y PROCINE CDMX (2023). Es autor de los libros: Résilience des images et des récits. Catastrophe et Terrorisme d’État en Amérique Latine (PUR 2020), Alteropoéticas del “yo” en el cine documental (Aula de Humanidades, 2021) y Del gesto a la mirada. Cine sobre arte (Cinemateca de Bogotá, 2023), así como de varios artículos sobre cine latinoamericano. Ha sido docente de historia, estudios del lenguaje y medios audiovisuales en la Sorbona, la Universidad Distrital de Bogotá, la Universidad Autónoma de la Ciudad de México y el Instituto Mora. Ha formado parte de equipos logísticos y curatoriales para festivales y muestras de cine documental en París, Bogotá y México. Participa en la investigación del LAIS sobre Mujeres cineastas (1975-1985). Ha cursado diplomados sobre producción, guión y realización de cine y televisión en Cuba, Colombia y México. Es egresado del diplomado “ABC del Showrunner” de CENTRO.",
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
			descripcion: "Esta investigación estudia las representaciones de las fronteras norte y sur de México a través de diferentes documentales. El objetivo principal es evidenciar el vínculo entre las políticas migratorias implementadas en territorio mexicano durante las últimas décadas, por una parte, y la producción y exhibición de documentales que tienen como tema principal las fronteras, por otra. Para llevar a cabo dicho objetivo el aparato metodológico contempla la elaboración de un corpus documental a partir de la cartelera de diferentes festivales, la búsqueda en publicaciones especializadas y la experiencia del investigador como consumidor audiovisual. Asimismo, se contempla la elaboración de categorías analíticas que permitan abordar diferentes tipos de frontera de acuerdo a su ubicación, dinámica administrativa y efectos sobre los migrantes. En general, se invita a pensar las imágenes de frontera como parte de una discusión pública y contemporánea.",
			semblanza: "Especialista en migración internacional (COLEF), doctor en historia (UG) y maestro en antropología social (COLSAN). Se ha desempeñado como docente en la Facultad de Ciencias Sociales y Humanidades (UASLP) así como asistente en los liceos Claude Bernard y Jean-Baptiste Say (Francia). Miembro fundador de la Red Abya Y ala (https://www.redabya-yala.org). Forma parte del Sistema Nacional de Investigadoras e Investigadores (candidato). Actualmente realiza una estancia postdoctoral en el Instituto Mora (CDMX).",
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
