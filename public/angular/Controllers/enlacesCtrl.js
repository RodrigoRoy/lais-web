/*Controlador de la sección de vinculación */

angular.module('EnlacesCtrl', []).controller('EnlacesController', function ($scope) {
    $scope.instituciones = [
        {
            nombre: "Filmoteca UNAM",
            imagen: "Filmoteca UNAM.png", 
            url: "https://www.filmoteca.unam.mx/",
            relacion: "Colaboración de investigación",
        },
        {
            nombre: "Centro de Investigaciones y Estudios Superiores en Antropología Social (CIESAS)",
            imagen: "CIESAS.png", 
            url: "https://ciesas.edu.mx/",
            relacion: "Colaboración académica en seminario",
        },
        {
            nombre: "Canal 6 de Julio",
            imagen: "Canal 6 de Julio.png", 
            url: "https://canal6dejulio.com/",
            relacion: "Colaboración académica en seminario",
        },
        {
            nombre: "Laboratorio Nacional de Materiales Orales",
            imagen: "LANMO.png", 
            url: "https://lanmo.unam.mx/",
            relacion: "",
        },
        {
            nombre: "Asociación Argentina de Estudios sobre Cine y Audiovisual",
            imagen: "Asaeca.png", 
            url: "https://asaeca.org/",
            relacion: "",
        },
        {
            nombre: "Universidad de La Ciénega del Estado de Michoacán de Ocampo (UCEMICH)",
            imagen: "UCEMICH.jpg", 
            url: "https://ucemich.edu.mx/",
            relacion: "Colaboración académica",
        },
        {
            nombre: "Centro de Fotografía de Montevideo",
            imagen: "Centro de Fotografía de Montevideo.png", 
            url: "https://cdf.montevideo.gub.uy/",
            relacion: "Colaboración académica",
        },
        {
            nombre: "Comité EUREKA!",
            imagen: "Comité EUREKA.jpg", 
            url: "",
            relacion: "Asesoría en metodologías de investigación",
        },
        {
            nombre: "Redoc Investigación",
            imagen: "Redoc.png", 
            url: "https://redocinvestigacion.net/",
            relacion: "Integrantes fundadores de la red",
        },
        {
            nombre: "Escuela Nacional de Artes Cinematográficas (ENAC) UNAM",
            imagen: "ENAC.png", 
            url: "http://www.enac.unam.mx/",
            relacion: "Apoyo a la investigación",
        },
        {
            nombre: "Centro de Capacitación Cinematográfica, A.C.",
            imagen: "Centro de Capacitación Cinematográfica.png", 
            url: "https://elccc.com.mx/ ",
            relacion: "Actividad de difusión académica",
        },
        {
            nombre: "Ambulante – Gira de documentales",
            imagen: "Ambulante.jpg", 
            url: "https://ambulante.org/",
            relacion: "Enlace y colaboración académica",
        },
        {
            nombre: "Universidad Michoacana de San Nicolás de Hidalgo (UMSNH)",
            imagen: "UMSNH.png", 
            url: "https://www.umich.mx/",
            relacion: "Divulgación académica",
        },
        {
            nombre: "Naranjas de Hiroshima",
            imagen: "Naranjas de Hiroshima.png", 
            url: "https://www.naranjasdehiroshima.com/",
            relacion: "Divulgación audiovisual",
        },
    ];
});
