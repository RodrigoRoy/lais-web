/*Controlador de la sección de estudiantes */

angular.module('EstudiantesCtrl', []).controller('EstudiantesController', function ($scope) {	
    $scope.convocatoria = {
        active: false,
        url: 'https://www.institutomora.edu.mx/Inicio.html',
    };

    $scope.becas = [
        {
            nombre: "María Fernanda Gómez Zamora",
            adscripcion: "Facultad de Ciencias Políticas y Sociales, UNAM (Licenciatura en Sociología)",
            proyecto: "Participación en la investigación Mujeres Documentalistas en México (1970-1985)",
        },
        {
            nombre: "José Miguel Nava Licona",
            adscripcion: "Facultad de Ciencias Políticas y Sociales, UNAM (Licenciatura en Antropología)",
            proyecto: "Digitalización y documentación de archivos audiovisuales",
        },
        {
            nombre: "Eder Samuel Berber Gutiérrez",
            adscripcion: "Facultad de Ciencias, UNAM (Licenciatura en Ciencias de la Computación)",
            proyecto: "Desarrollo de software para documentación de registros audiovisuales"
        },
    ];

    $scope.servicioSocial = [
        {
            nombre: "Daniela Reyes Reyes",
            adscripcion: "Instituto Mora (Licenciatura en Historia)",
            proyecto: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia ", 
        }
    ];

    $scope.tesistas = [
        {
            nombre: "Aura Celeita Díaz",
            adscripcion: "Instituto Mora (Maestría en Estudios Regionales)",
            tesis: "La Universidad Intercultural de los Pueblos, una apuesta por la cultura del buen vivir en el sur occidente colombiano",
            date: "2024",
            concluida: true,
            integrante: "Lourdes Roca",
            tipo: "Dirección de tesis", 
        },
        {
            nombre: "Itzel Martínez del Cañizo",
            adscripcion: "UNAM (Maestría en Historia del Arte)",
            tesis: "Un cine propio: autoetnografías fílmicas mexicanas de mujeres documentalistas (2000-2020)",
            date: "2023",
            concluida: true,
            integrante: "Lourdes Roca",
            tipo: "Comité tutorial", 
        },
        {
            nombre: "Paulina Pezzat",
            adscripcion: "CIESAS, Unidad Peninsular (Doctorado en Historia)",
            tesis: "Dibujar con luz siluetas femeninas. Fotografía y economía visual de mujeres indígenas de Guatemala durante los gobiernos liberales. 1870-1920",
            date: "2023",
            concluida: true,
            integrante: "Lourdes Roca",
            tipo: "Comité tutorial", 
        },
        {
            nombre: "Biaani Garfias Gallegos",
            adscripcion: "Instituto Mora (Maestría en Historia Moderna y Contemporanea)",
            tesis: "Luz, cámara cuerpo: La representación de los cuerpos femeninos en el cine mexicano de 1955 a 1969",
            date: "2024",
            concluida: true,
            integrante: "Lilia García Torres",
            tipo: "Dirección de tesis", 
        },
    ];

	// Información de estudiantes
	$scope.personas = [
		{
			nombre: "David Jurado",
			adscripcion: "Instituto Mora - Historia moderna y contemporanea",
			lineasInvestigacion: "Historia de cine documental en América Latina, estéticas de la memoria y de la autoficción en el cine y la literatura, economías de la atención en la era de las plataformas audiovisuales, discursos audiovisuales sobre el antropoceno/capitaloceno, historia del Cine sobre arte.",
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
