//requerimiento de modelo de usuarios
const user = require('../models/user');

//requerimiento de modelo de admins
const adm = require('../models/admin');

//requerimiento de modelo de productos
const producto = require('../models/producto');

//requerimiento de modelo de registros
const registro = require('../models/registro');

//requerimiento de json web token
const jsonwebtoken = require('jsonwebtoken');

//secret config
const config = require('./config');

//creacion de usuario
async function Creacion_De_Usuario(req, res) {
	//objeto nuevo
	const usuario_nuevo = new user({
		username: req.body.username,
		email: req.body.email,
		password: req.body.password,
	});
	//encriptacion de password
	usuario_nuevo.password = await usuario_nuevo.encriptar(usuario_nuevo.password);
	//guardado
	try {
		await usuario_nuevo.save();
	} catch (err) {
		console.log(err);
		return false;
	}
	//generacion de token por registrarse exitosamente
	//NOTA: Tiempo de vencimiento 15min
	const token = jsonwebtoken.sign({ id: usuario_nuevo._id }, config.secret, {
		expiresIn: 60 * 15,
	});
	console.log(token);
	return token;
}

//creacion de admin
async function Creacion_De_Admin(req, res) {
	//objeto nuevo
	if (req.body.Codigo == '5CHIBH-12OGH') {
		const admin_nuevo = new adm({
			username: req.body.username,
			email: req.body.email,
			password: req.body.password,
		});
		//encriptacion de password
		admin_nuevo.password = await admin_nuevo.encriptar(admin_nuevo.password);
		//guardado
		try {
			await admin_nuevo.save();
		} catch (err) {
			console.log(err);
			return false;
		}
		//generacion de token por registrarse exitosamente
		//NOTA: Tiempo de vencimiento 15min
		const token = jsonwebtoken.sign({ id: admin_nuevo._id }, config.secret, {
			expiresIn: 60 * 15,
		});
		console.log(token);
		return token;
	} else {
		res.render('Err');
	}
}

//Creacion de Producto
async function Nuevo_Producto(req, res) {
	const nuevo_producto = new producto({
		nombre: req.body.Nombre,
		tipo: req.body.Tipo,
		marca: req.body.Marca,
		descripcion: req.body.Descripcion,
		existencia: req.body.Existencia,
		precio: req.body.Precio,
	});
	try {
		await nuevo_producto.save();
	} catch (error) {
		console.log(error);
		return false;
	}
	return true;
}

//Creacion de Registro
async function Nuevo_registro(
	nombre,
	tipo,
	marca,
	descripcion,
	existencia,
	precio
) {
	const nuevo_registro = new registro({
		nombre: nombre,
		tipo: tipo,
		marca: marca,
		descripcion: descripcion,
		existencia: existencia,
		precio: precio,
	});
	try {
		await nuevo_registro.save();
	} catch (error) {
		return false;
	}
	return true;
}

//Exportacion de funciones
module.exports = {
	Creacion_De_Admin,
	Creacion_De_Usuario,
	Nuevo_Producto,
	Nuevo_registro,
};
