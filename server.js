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

var port = process.env.PORT || config.port || 8080; // establecer puerto

// base de datos
mongoose.connect(config.db); // conectar a base de datos mongoDB

// permite obtener datos de los parámetros del cuerpo/body (POST)
// también permite poblar req.body correctamente (http://expressjs.com/en/api.html#req.body)
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

// ***** TESTING UPLOADS *****
// TODO: colocar en un archivo aparte
var fs = require('fs'); // File system utility
var multipart = require('connect-multiparty'); // connect middleware (upload handler)
var multipartMiddleware = multipart({uploadDir: './public/imgs/eventos' }); // definir ruta para archivos
app.post('/api/upload', multipartMiddleware, function(req, res){ // refinir ruta para HTTP POST
	//console.log("  req.body", req.body); // Datos adicionales enviados
	console.log("Información del archivo");
	console.log(req.files);
	fs.rename(req.files.file.path, 'public/imgs/eventos/' + req.files.file.name, function (err){ // renombrar archivo (usar el nombre original)
		if(err)
			throw err;
		res.json({"status": "OK"}); // responder al cliente 
	});
});
var multipartMiddleware = multipart({uploadDir: './public/docs/eventos'}); // definir ruta para archivos
app.post('/api/uploadFiles', multipartMiddleware, function(req, res){ // refinir ruta para HTTP POST
	//console.log("  req.body", req.body); // Datos adicionales enviados
	console.log("Información de archivos");
	console.log(req.files);
	for(var i in req.files.file){ // iterar en todos los archivos
		fs.rename(req.files.file[i].path, 'public/docs/eventos/' + req.files.file[i].name, function(err){ // renombrar archivo (usar el nombre original)
			if(err)
				throw err;
		})
	}
	res.json({"status": "OK"}); // responder al cliente 
	// fs.rename(req.files.file.path, 'public/imgs/eventos/' + req.files.file.name, function (err){ // renombrar archivo (usa el nombre original)
	// 	if(err)
	// 		throw err;
	// 	res.json({"status": "OK"}); // responder al cliente 
	// });
});
// ***** END TESTING UPLOADS *****

// RUTAS PARA EL API

var autentificacion = require('./app/api/authentication'); // API para autentificación
app.use('/api/', autentificacion); // usar el API desde la ruta "/api/authenticate"

var usuarios = require('./app/api/usuarios'); // API para Usuarios de la base de datos
app.use('/api/usuarios', usuarios); // usar el API desde la ruta "/api/usuarios"

var lugares = require('./app/api/lugares'); // API para Lugares de la base de datos
app.use('/api/lugares', lugares); // usar el API desde la ruta "/api/lugares"

var eventos = require('./app/api/eventos'); // API para Eventos de la base de datos
app.use('/api/eventos', eventos); // usar el API desde la ruta "/api/eventos"

// REGISTRAR LAS DEMÁS RUTAS

// require('./app/routes')(app); // pasar a la aplicación las demás rutas a utilizar
app.get('*', function(req, res) {
    res.sendfile('./public/angular/views/index.html'); // cargar el archivo public/index.html
});

// INICIAR APP =============================================
app.listen(port);
console.log('Magic happens on port ' + port);
exports = module.exports = app; // exponer app