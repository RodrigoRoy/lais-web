# Página web del Laboratorio Audiovisual de Investigación Social (LAIS)

El objetivo principal de esta aplicación web es crear un medio de difusión y acceso a los contenidos relacionados con el LAIS, así como tener un manejador de contenido para registrar eventos, publicaciones y archivos.

El proyecto se basa en tecnología Javascript con *MEAN stack*: MongoDB, Express, AngularJS y NodeJS.

## Requisitos

- [NodeJS](https://nodejs.org), NPM (Node Package Manager)
- [MongoDB](https://www.mongodb.org/)
- [Bower](https://bower.io/)

Opcionalmente:

- git
- nodemon
- forever

## Dependencias

Back-end: [package.json](https://github.com/RodrigoRoy/lais-web/blob/master/package.json)

Font-end: [bower.json](https://github.com/RodrigoRoy/lais-web/blob/master/bower.json)

## Instalación

1. Descargar el repositorio `git clone https://github.com/RodrigoRoy/lais-web.git`
2. Estando en la carpeta del proyecto, instalar dependencias back-end ``npm install``
3. Instalar dependencias front-end ``bower install``
4. Crear los directorios contenedores de archivos: ``public/files``, ``public/imgs/eventos`` y ``public/imgs/publicaciones``
5. Crear en el directorio raiz el archivo de configuración ``config.js``
6. (Opcionalmente) Importar base de datos no-relacional ``mongorestore -d lais-web --drop /location/to/dump``
7. Iniciar el servidor web con cualquiera de las siguientes alternativas ``node server.js``, ``nodemon server.js``, ``forever start --uid laisweb --killSignal=SIGNTERM -c nodemon server.js``

## Características principales

- Diseño modular de los componentes: modelos, api, controladores, vistas, servicios, css, etc.
- Uso de llamadas asíncronas (*promise*).
- Formato JSON para intercambio de información.
- Transmisión segura de información con JSON Web Token.
- Interfaz web para administrar información de eventos, publicaciones y archivos en servidor.
- Proyecto basado en tecnologías open source
- Diseño responsivo.

## Licencia
[MIT Licence](https://github.com/RodrigoRoy/lais-web/blob/master/LICENSE)