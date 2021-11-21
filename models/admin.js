//requerimiento de esquema y modelo
const { Schema, model } = require('mongoose');

//requerimiento de moduelo bcrypt
const bcrypt = require('bcryptjs');

//Model Schema
const admin_object = new Schema({
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

//encriptar password
admin_object.methods.encriptar = async (password) => {
	//Mejorar seguridad en password
	const salt = await bcrypt.genSalt(10);
	//encriptar password
	return bcrypt.hash(password, salt);
};
//verificar password
admin_object.methods.verificar = function (password) {
	return bcrypt.compare(password, this.password);
};

//exportacion de modelo
module.exports = model('administradores', admin_object);
