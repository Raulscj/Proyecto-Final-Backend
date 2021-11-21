//requerimiento de modelo de usuarios
const user = require('../models/user');

//requerimiento de modelo de admins
const adm = require('../models/admin');

//requerimiento de json web token
const jsonwebtoken = require('jsonwebtoken');

//secret config
const config = require('./config');

//Inicio de Sesion
async function Inicio_de_Sesion_Usuarios(req, res) {
	//busqueda de email
	const userfind = await user.findOne({ email: req.body.email });
	//verificacion de existencia
	if (!userfind) {
		console.log('Email no existente');
		return false;
	}
	//verificacion de password
	const verify_password = await userfind.verificar(req.body.password);
	//verificacion para token
	if (!verify_password) {
		console.log('Password Incorrecto');
		return false;
	}
	//generacion de token
	//NOTA: Expiracion de 15 minutos
	const token = jsonwebtoken.sign({ id: userfind._id }, config.secret, {
		expiresIn: 60 * 15,
	});
	console.log(token);
	return token;
}

//Inicio de Sesion Admins
async function Inicio_de_Sesion_Admins(req, res) {
	//busqueda de email
	const adminfind = await adm.findOne({ email: req.body.email });
	//verificacion de existencia
	if (!adminfind) {
		console.log('Email no existente');
		return false;
	}
	//verificacion de password
	const verify_password = await adminfind.verificar(req.body.password);
	//verificacion para token
	if (!verify_password) {
		console.log('Password Incorrecto');
		return false;
	}
	//generacion de token
	//NOTA: Expiracion de 15 minutos
	const token = jsonwebtoken.sign({ id: adminfind._id }, config.secret, {
		expiresIn: 60 * 15,
	});
	console.log(token);
	return token;
}

//exportacion de funciones
module.exports = { Inicio_de_Sesion_Usuarios, Inicio_de_Sesion_Admins };
