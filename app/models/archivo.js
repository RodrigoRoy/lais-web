/*
Define y exporta el modelo de la colección Archivos
*/

// Dependencias
var mongoose = require('mongoose'); // controlador de la base de datos
var Schema = mongoose.Schema; // "Modelo" de la colección

// Definición del esquema "Archivos", incluyendo nombre del campo y el tipo de dato (key: value_type)
var ArchivoSchema = new Schema({
	filename : {type: String, trim: true, required: true, index: {unique: true}},
    descripcion: {type: String},
    location: {type: String, default: ''},
    directory: {type: Boolean, default: false},
    usuario: {type: Schema.Types.ObjectId, ref: 'Usuarios'}
}, { // Opciones:
	collection: 'archivos',
	timestamps: true //timestamps: {createdAt: 'creacion', updatedAt: 'actualizacion'}
});

// exportar el modelo "Archivos"
// module.exports permite pasar el modelo a otros archivos cuando es llamado
module.exports = mongoose.model('Archivo', ArchivoSchema);