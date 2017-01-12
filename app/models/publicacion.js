/*
Define y exporta el modelo de la colección Publicacion
*/

// Dependencias
var mongoose = require('mongoose'); // controlador de la base de datos
var Schema = mongoose.Schema; // "Modelo" de la colección

// Definición del esquema "Autor":
var PublicacionSchema = new Schema({
	titulo: {type: String, required: true},
	autor: [{type: mongoose.Schema.Types.ObjectId, ref: 'Autores'}],
	tipo: {type: String, enum: ['Artículo', 'Libro', 'Documental', 'Tesis', 'Ponencia', 'Manual', 'Página web', 'Incollection', 'No especificado']},
	fecha: {type: Date},
	coleccion: {type: String},
	publisher: {type: String},
	journal: {type: String}, // para "Articulo"
	volumen: {type: String}, // para "Articulo"
	paginas: {type: String}, // para "Articulo"
	numero: {type: String},  // para "Articulo"
	booktitle: {type: String},
	descripcion: {type: String},
	isbn: {type: String},
	abstract: {type: String},
	url: {type: String, match: [/https?.*/, 'URL debe comenzar con "http(s)://"']}, // necesario en "Página web"
	keywords: [{type: String}], 
	notas: {type: String},
	usuario: {type: mongoose.Schema.Types.ObjectId, ref: 'Usuarios'},
	adjuntos: [{type: mongoose.Schema.Types.ObjectId, ref: 'Archivos'}],
	timestamp: {type: Date},
	modificacion: {type: Date}
});

// exportar el modelo "Autores"
// module.exports permite pasar el modelo a otros archivos cuando es llamado
module.exports = mongoose.model('Publicacion', PublicacionSchema);