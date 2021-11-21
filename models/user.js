//requerimiento de esquema y modelo
const { Schema, model } = require('mongoose');

//encriptacion
const bcrypt = require('bcryptjs');

//Model Schema
const user_object = new Schema({
	username: {
		type: String,
		unique: true,
		required: true,
	},
	email: {
		type: String,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
});

//Metodos de Modelo

//encriptado de password
user_object.methods.encriptar = async (password) => {
	//Mejorar seguridad en password
	const salt = await bcrypt.genSalt(10);
	//encriptar password
	return bcrypt.hash(password, salt);
};
//verificacion de password
user_object.methods.verificar = function (password) {
	return bcrypt.compare(password, this.password);
};

//exportacion de modelo
module.exports = model('usuarios', user_object);
