//requerimiento de modelo de usuario
const user = require('../models/user');

//requerimiento de json web token
const jsonwebtoken = require('jsonwebtoken');

//requerimiento de modelo de admin
const adm = require('../models/admin');

//requerimiento de secret config
const config = require('./config');

//verificacion de token de user
async function VerifyTokenUser(TokenActual) {
	const token = TokenActual;
	if (token == undefined) {
		console.log('No Token provided');
		return false;
	} else {
		//decodificacion
		const decoded = jsonwebtoken.verify(token, config.secret);
		const id = decoded.id;
		//busqueda
		const busqueda = await user.findById(id, { password: 0 });
		if (!busqueda) {
			console.log('No token Provided');
			return false;
		} else {
			console.log('Valid Token');
			return true;
		}
	}
}

//verificacion de token de admin
async function VerifyTokenAdmin(TokenActual) {
	const token = TokenActual;
	if (token == undefined) {
		console.log('No Token provided');
		return false;
	} else {
		//decodificacion
		const decoded = jsonwebtoken.verify(token, config.secret);
		const id = decoded.id;
		//busqueda
		const busqueda = await adm.findById(id, { password: 0 });
		if (!busqueda) {
			console.log('No token Provided');
			return false;
		} else {
			console.log('Valid Token');
			return true;
		}
	}
}

//exportacion de funciones
module.exports = { VerifyTokenUser, VerifyTokenAdmin };
