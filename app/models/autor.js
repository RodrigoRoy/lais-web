/*
Define y exporta el modelo de la colección Autores
*/

// Dependencias
var mongoose = require('mongoose'); // controlador de la base de datos
var Schema = mongoose.Schema; // "Modelo" de la colección

// Definición del esquema "Autor":
var AutorSchema = new Schema({
	nombre: {type: String, required: true},
	apellido: {type: String},
	email: {type: String, lowercase: true, match: [/.+@.+/, 'No es una dirección de correo electrónico']},
	procedencia: {type: String}
});


// exportar el modelo "Autores"
// module.exports permite pasar el modelo a otros archivos cuando es llamado
module.exports = mongoose.model('Autor', AutorSchema);