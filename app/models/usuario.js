/*
Define y exporta el modelo de la colección Usuarios
*/

// Dependencias
var mongoose = require('mongoose'); // controlador de la base de datos
var Schema = mongoose.Schema; // "Modelo" de la colección
var bcrypt = require('bcrypt-nodejs')

// Definición del esquema "Usuario":
// nombre de usuario, permisos y contraseña.
var UsuarioSchema = new Schema({
    username: {type: String, minlength: 3, trim: true, required: true, index: {unique: true}},
    //permiso: {type: Number, min: 0, max: 4, default: 0},
    crud: {
    	create: {type: Boolean, default: false},
    	read: {type: Boolean, default: true},
    	update: {type: Boolean, default: false},
    	delete: {type: Boolean, default: false}
    },
    password: {type: String, minlength: 3, required: true, select: false}
});


// Hash/Codificar el password antes de que el usuario se guarde
UsuarioSchema.pre('save', function(next){
	var usuario = this;

	// hash/codificar password solo si el password ha sido cambiado o el usuario es nuevo
	if (!usuario.isModified('password'))
		return next();

	// generar hash/codificación
	bcrypt.hash(usuario.password, null, null, function(err, hash){
		if(err)
			return next(err);
		// cambiar el password por su versión hash/codificada
		usuario.password = hash;
		next();
	});
});

// Función para comparar un password dado con el hash/codificación de la base de datos
UsuarioSchema.methods.comparePassword = function(password){
	var usuario = this;
	return bcrypt.compareSync(password, usuario.password);
};

// exportar el modelo "Eventos"
// module.exports permite pasar el modelo a otros archivos cuando es llamado
module.exports = mongoose.model('Usuario', UsuarioSchema);