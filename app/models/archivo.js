/*
Define y exporta el modelo de la colección Archivos
*/

// Dependencias
var mongoose = require('mongoose'); // controlador de la base de datos
var Schema = mongoose.Schema; // "Modelo" de la colección
var fs = require('fs'); // File system utility
var filesize = require('filesize'); // Human readable file size string from number

// Definición del esquema "Archivos", incluyendo nombre del campo y el tipo de dato (key: value_type)
var ArchivoSchema = new Schema({
	filename : {type: String, trim: true, required: true}, //index: {unique: true}
    location: {type: String, default: ''}, // required: true
    descripcion: {type: String},
    directory: {type: Boolean, default: false},
    usuario: {type: Schema.Types.ObjectId, ref: 'Usuarios'}
}, { // Opciones:
	collection: 'archivos',
	timestamps: true, //timestamps: {createdAt: 'creacion', updatedAt: 'actualizacion'}
	autoIndex: false,
	toObject: {virtuals: true}, // habilitar virtuals
	toJSON: {virtuals: true}
});
// Virtuals (tamaño en el sistema de archivos)
ArchivoSchema.virtual('size').get(function(){
	var dirbase = 'public/files/';
	try{
        // Verifica si existe el archivo, en caso contrario se dispara excepción (se maneja en catch)
        fs.accessSync(dirbase + this.location + this.filename, (fs.constants || fs).F_OK);
        return filesize(fs.statSync(dirbase + this.location + this.filename).size, {round: 0});
    }catch(err){
        return filesize(0, {round: 0});
    }
});
// Compound index
ArchivoSchema.index({filename: 1, location: 1}, {unique: true});

// exportar el modelo "Archivos"
// module.exports permite pasar el modelo a otros archivos cuando es llamado
module.exports = mongoose.model('Archivo', ArchivoSchema);