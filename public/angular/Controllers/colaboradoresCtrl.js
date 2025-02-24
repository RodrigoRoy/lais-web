/*Controlador de la sección de colaboradores (estudiantes) */

angular.module('ColaboradoresCtrl', []).controller('ColaboradoresController', function ($scope) {	
    $scope.convocatoria = {
        active: false,
        url: 'https://www.institutomora.edu.mx/Inicio.html',
    };

    $scope.becas = [
        {
            nombre: "Daniela Reyes Reyes",
            adscripcion: "Instituto Mora (Licenciatura en Historia)",
            proyecto: "La transformación del paisaje atizapense 1958-1993",
            actividad: 'Producción de podcast "Mujeres documentalistas en México, 1970-1985"',
        },
        {
            nombre: "Edgar Aguilar Espinoza",
            adscripcion: "Facultad de Ciencias Políticas y Sociales, UNAM (Licenciatura en Comunicación)",
            proyecto: "Corto documental sobre Vendaval Cooperativa Panadera",
            actividad: "Documentación de materiales audiovisuales para investigación social",
        },
        {
            nombre: "Astrid Eilyn Juárez Leal",
            adscripcion: "Facultad de Ciencias Políticas y Sociales, UNAM (Relaciones Internacionales)",
            proyecto: "Warmi wali kamasañi: El rol de las mujeres campesinas aymaras para garantizar soberanía alimentaria en familias del Altiplano Norte de Bolivia",
            actividad: "Investigación en archivo",
        },
    ];

    $scope.servicioSocial = [
        {
            nombre: "Martín Mort García",
            adscripcion: "Facultad de Filosofía y Letras, UNAM (Licenciatura en Historia)",
            proyecto: "Política mexicana en las décadas de 1980 y 1990",
            actividad: "Organización de documentos y cine documental para investigación",
        },
        {
            nombre: "Eder Samuel Berber Gutiérrez",
            adscripcion: "Facultad de Ciencias, UNAM (Licenciatura en Ciencias de la Computación)",
            proyecto: "Seguridad informática y el Internet de las Cosas",
            actividad: "Desarrollo de sistemas para organización de registros audiovisuales",
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

    // ***** 2023 - 2024 *****
    // $scope.becas = [
    //     {
    //         nombre: "María Fernanda Gómez Zamora",
    //         adscripcion: "Facultad de Ciencias Políticas y Sociales, UNAM (Licenciatura en Sociología)",
    //         proyecto: "Participación en la investigación Mujeres Documentalistas en México (1970-1985)",
    //     },
    //     {
    //         nombre: "José Miguel Nava Licona",
    //         adscripcion: "Facultad de Ciencias Políticas y Sociales, UNAM (Licenciatura en Antropología)",
    //         proyecto: "Digitalización y documentación de archivos audiovisuales",
    //     },
    //     {
    //         nombre: "Eder Samuel Berber Gutiérrez",
    //         adscripcion: "Facultad de Ciencias, UNAM (Licenciatura en Ciencias de la Computación)",
    //         proyecto: "Desarrollo de software para documentación de registros audiovisuales"
    //     },
    // ];

    // $scope.servicioSocial = [
    //     {
    //         nombre: "Daniela Reyes Reyes",
    //         adscripcion: "Instituto Mora (Licenciatura en Historia)",
    //         proyecto: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia ", 
    //     }
    // ];

    // $scope.tesistas = [
    //     {
    //         nombre: "Aura Celeita Díaz",
    //         adscripcion: "Instituto Mora (Maestría en Estudios Regionales)",
    //         tesis: "La Universidad Intercultural de los Pueblos, una apuesta por la cultura del buen vivir en el sur occidente colombiano",
    //         date: "2024",
    //         concluida: true,
    //         integrante: "Lourdes Roca",
    //         tipo: "Dirección de tesis", 
    //     },
    //     {
    //         nombre: "Itzel Martínez del Cañizo",
    //         adscripcion: "UNAM (Maestría en Historia del Arte)",
    //         tesis: "Un cine propio: autoetnografías fílmicas mexicanas de mujeres documentalistas (2000-2020)",
    //         date: "2023",
    //         concluida: true,
    //         integrante: "Lourdes Roca",
    //         tipo: "Comité tutorial", 
    //     },
    //     {
    //         nombre: "Paulina Pezzat",
    //         adscripcion: "CIESAS, Unidad Peninsular (Doctorado en Historia)",
    //         tesis: "Dibujar con luz siluetas femeninas. Fotografía y economía visual de mujeres indígenas de Guatemala durante los gobiernos liberales. 1870-1920",
    //         date: "2023",
    //         concluida: true,
    //         integrante: "Lourdes Roca",
    //         tipo: "Comité tutorial", 
    //     },
    //     {
    //         nombre: "Biaani Garfias Gallegos",
    //         adscripcion: "Instituto Mora (Maestría en Historia Moderna y Contemporanea)",
    //         tesis: "Luz, cámara cuerpo: La representación de los cuerpos femeninos en el cine mexicano de 1955 a 1969",
    //         date: "2024",
    //         concluida: true,
    //         integrante: "Lilia García Torres",
    //         tipo: "Dirección de tesis", 
    //     },
    // ];
});
