/*
Define y exporta el modelo de la colección Lugares
*/

// Dependencias
var mongoose = require('mongoose'); // controlador de la base de datos
var Schema = mongoose.Schema; // "Modelo" de la colección

// Definición del esquema "Lugares":
var LugarSchema = new Schema({
	_id: Number,
	nombre: {type: String, trim: true, required: true, unique: true},
	direccion: {
		calle: String,
		numero: String,
		numeroInterior: String,
		colonia: String,
		ciudad: String,
		estado: String,
		cp: String,
		pais: String
	},
	telefono: [String],
	contacto: String
});

// exportar el modelo "Lugares"
// module.exports permite pasar el modelo a otros archivos cuando es llamado
module.exports = mongoose.model('Lugares', LugarSchema);