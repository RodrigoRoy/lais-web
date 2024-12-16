/*
Manejo del servidor (Node.js)
*/

// MÓDULOS =================================================
var express        = require('express'); // llamar a express
var app            = express(); // definir la aplicación usando express
var mongoose       = require('mongoose'); // para trabajar con la base de datos
var bodyParser     = require('body-parser'); // obtener body-parser
var methodOverride = require('method-override');
var morgan         = require('morgan'); // usado para ver peticiones (requests)

// CONFIGURACIÓN ===========================================

// archivo de configuración
var config = require('./config');

// base de datos
var port = process.env.PORT || config.port || 8080; // establecer puerto
mongoose.Promise = global.Promise // Use native promise (avoid DeprecationWarning with mongoose default promise library)
mongoose.connect(config.db); // conectar a base de datos mongoDB

// permite obtener datos de los parámetros del cuerpo/body (POST)
// también permite poblar req.body correctamente (https://expressjs.com/en/api.html#req.body)
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json como json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // sobreescribe con el encabezado X-HTTP-Method-Override en petición. Simula DELETE/PUT
app.use(express.static(__dirname + '/public')); // establece ubicación de archivos estáticos. /public/img será /img para los usuarios

// RUTAS ===================================================

// configurar la aplicación para manejar peticiones CORS (Cross-origin resource sharing requests)
app.use(function(req, res, next){
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
	next();
});

// log de todas las peticiones (request) en consola
app.use(morgan('dev'));

// RUTAS PARA EL API
var autentificacion = require('./app/api/authentication'); // API para autentificación
app.use('/api/', autentificacion); // usar el API desde la ruta "/api/authenticate"
var usuarios = require('./app/api/usuarios'); // API para Usuarios de la base de datos
app.use('/api/usuarios', usuarios); // usar el API desde la ruta "/api/usuarios"
var lugares = require('./app/api/lugares'); // API para Lugares de la base de datos
app.use('/api/lugares', lugares); // usar el API desde la ruta "/api/lugares"
var eventos = require('./app/api/eventos'); // API para Eventos de la base de datos
app.use('/api/eventos', eventos); // usar el API desde la ruta "/api/eventos"
var archivos = require('./app/api/archivos'); // API para Archivos de la base de datos
app.use('/api/archivos', archivos); // usar el API desde la ruta "/api/archivos"
var contacto = require('./app/api/contacto'); // API para envio por medio de email
app.use('/api/contacto', contacto); // usar el API desde la ruta "/api/contacto"
var autores = require('./app/api/autores'); // API para Autores
app.use('/api/autores', autores); // usar el API desde la ruta "/api/autores"
var publicaciones = require('./app/api/publicaciones'); // API para Publicaciones
app.use('/api/publicaciones', publicaciones); // usar el API desde la ruta "/api/publicaciones"
var carrusel = require('./app/api/carrusel'); // API para Carrusel
app.use('/api/carrusel', carrusel); // usar el API desde la ruta "/api/carrusel"
var files = require('./app/api/files'); // API para Files
app.use('/api/files', files); // usar el API desde la ruta "/api/files"
var images = require('./app/api/images'); // API para Imagenes
app.use('/api/images', images); // usar el API desde la ruta "/api/images"
var videos = require('./app/api/videos'); // API para Videos (registros audiovisuales)
app.use('/api/videos', videos);
// REGISTRAR LAS DEMÁS RUTAS

// require('./app/routes')(app); // pasar a la aplicación las demás rutas a utilizar
app.get('*', function(req, res) {
	var options = {
		root: __dirname
	};
    res.sendFile('/public/angular/Views/index.html', options); // cargar el archivo index.html
});

// INICIAR APP =============================================
app.listen(port);
console.log('Magic happens on port ' + port);
exports = module.exports = app; // exponer app