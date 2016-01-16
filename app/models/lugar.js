/*
Define y exporta el modelo de la colección Usuarios
*/

// Dependencias
var mongoose = require('mongoose'); // controlador de la base de datos
var Schema = mongoose.Schema; // "Modelo" de la colección

// Definición del esquema "Usuario":
// nombre de usuario, permisos y contraseña.
var LugarSchema = new Schema({
	nombre: {type: String, trim: true, required: true, unique: true},
	direccion: {
		calle: String,
		numero: String,
		numeroInterior: String,
		colonia: String,
		ciudad: String,
		// municipio? : String,
		estado: String,
		cp: String,
		pais: String
	},
	telefono: [String],
	contacto: String
});

// exportar el modelo "Eventos"
// module.exports permite pasar el modelo a otros archivos cuando es llamado
module.exports = mongoose.model('Lugares', LugarSchema);