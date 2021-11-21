//requerimiento de express
const express = require('express');
const rutas = express.Router();
//requerimiento de modelo de productos
const producto = require('../models/producto');
//requerimiento de modelo de registros
const registros = require('../models/registro');

//Controladores

//requerimiento de controladores de Creacion
const {
	Creacion_De_Admin,
	Creacion_De_Usuario,
	Nuevo_Producto,
	Nuevo_registro,
} = require('../controllers/AllCreation');

//requerimiento de controladores de Inicio de Sesion
const {
	Inicio_de_Sesion_Usuarios,
	Inicio_de_Sesion_Admins,
} = require('../controllers/Inicio_Sesion');

//requerimiento de controladores de Verificaciones
const {
	VerifyTokenUser,
	VerifyTokenAdmin,
} = require('../controllers/Verificaciones');

//requerimiento de controladores de busquedas
const {
	Busqueda,
	BusquedaTienda,
	objeto,
} = require('../controllers/busquedas');

//requerimiento de controladores de edicion
const { editar_datos, restar, sumar, total } = require('../controllers/edicion');

//requerimiento de controladores de eliminacion
const {
	eliminar,
	eliminar_registro,
	DropCar,
} = require('../controllers/eliminar');

//JSONWebtoken
let token_actuall;
let total_a_pagar = 0;

//Inventario
//Crear Producto
rutas.post('/Crear', async (req, res) => {
	let resp = await VerifyTokenAdmin(token_actuall);
	if (resp == false) {
		res.render('Err');
	} else {
		let resp = await Nuevo_Producto(req, res);
		if (resp == false) {
			console.log('Error en creacion');
		} else {
			const Producto = await producto.find().lean();
			res.render('inventario', { Producto: Producto });
		}
	}
});
//Actualizar Producto 
rutas.get('/Actualizar/:id', async (req, res) => {
	const Producto = await producto.findById(req.params.id).lean();
	res.render('Actualizar', { Producto });
});
rutas.post('/Actualizar/:id', async (req, res) => {
	let resp = await editar_datos(req, res);
	if (resp == false) {
		res.render('Err');
	} else {
		const Producto = await producto.find().lean();
		console.log(Producto);
		res.render('inventario', { Producto: Producto });
	}
});
//Eliminar Producto
rutas.get('/Eliminar/:id', async (req, res) => {
	let resp = await VerifyTokenAdmin(token_actuall);
	if (resp == false) {
		res.render('Err');
	} else {
		let resp = await eliminar(req, res);
		if (resp == false) {
			res.render('Err');
		} else {
			const Producto = await producto.find().lean();
			res.render('inventario', { Producto: Producto });
		}
	}
});
//Buscar
rutas.post('/Buscar', async (req, res) => {
	let resp = await VerifyTokenAdmin(token_actuall);
	if (resp == false) {
		res.render('Err');
	} else {
		await Busqueda(req, res);
	}
});

//Tienda
//Buscar
rutas.post('/BuscarT', async (req, res) => {
	let resp = await VerifyTokenUser(token_actuall);
	if (resp == false) {
		res.render('Err');
	} else {
		await BusquedaTienda(req, res);
	}
});
//Agregar al carrito
rutas.get('/Agregado/:id', async (req, res) => {
	let resp = await VerifyTokenUser(token_actuall);
	if (resp == false) {
		res.render('Err');
	} else {
		restar(req, res).then( async (resp) => {
			if (resp == false) {
				const Producto = await producto.find().lean();
				const Registro = await registros.find().lean();
				total_a_pagar = await total()
				res.render('Tienda', { Registro, Producto, total_a_pagar });
			} else {
				objeto(req, res).then(async (resp) => {
					await Nuevo_registro(
						resp.nombre,
						resp.tipo,
						resp.marca,
						resp.descripcion,
						resp.existencia,
						resp.precio
					).then(async (respp) => {
						if (respp == false) {
							res.render('Err');
						} else {
							total_a_pagar = await total()
							const Producto = await producto.find().lean();
							const Registro = await registros.find().lean();
							res.render('Tienda', { Registro, Producto,total_a_pagar });
						}
					});
				});
			}
		});
	}
});
//Quitar del carrito
rutas.get('/Quitado/:id', async (req, res) => {
	let resp = await VerifyTokenUser(token_actuall);
	if (resp == false) {
		res.render('Err');
	} else {
		sumar(req, res).then(() => {
			eliminar_registro(req, res).then(async (resp) => {
				if (!resp) {
					res.render('Err');
				} else {
					total_a_pagar = await total()
					const Producto = await producto.find().lean();
					const Registro = await registros.find().lean();
					res.render('tienda', { Registro, Producto, total_a_pagar });
				}
			});
		});
	}
});

//Rutas Generales
rutas.get('/', (req, res) => {
	res.render('principal');
});
//Admin
rutas.post('/Inventario', async (req, res) => {
	let resp = await Creacion_De_Admin(req, res);
	if (resp == false) {
		res.render('Err');
	} else {
		token_actuall = resp;
		const Producto = await producto.find().lean();
		res.render('inventario', { Producto: Producto });
	}
});
rutas.post('/Inventarios', async (req, res) => {
	let resp = await Inicio_de_Sesion_Admins(req, res);
	if (resp == false) {
		console.log('No iniciaste sesion');
		res.render('Err');
	} else {
		token_actuall = resp;
		const Producto = await producto.find().lean();
		res.render('inventario', { Producto: Producto });
	}
});
//Cliente
rutas.post('/Tienda', async (req, res) => {
	let resp = await Creacion_De_Usuario(req, res);
	if (resp == false) {
		console.log('Error en creacion');
	} else {
		token_actuall = resp;
		const Producto = await producto.find().lean();
		res.render('tienda', { Producto: Producto });
	}
});
rutas.post('/Tiendas', async (req, res) => {
	let resp = await Inicio_de_Sesion_Usuarios(req, res);
	if (resp == false) {
		console.log('No iniciaste sesion');
		res.render('Err');
	} else {
		token_actuall = resp;
		const Producto = await producto.find().lean();
		res.render('tienda', { Producto: Producto });
	}
});

//Log out Admin
rutas.get('/LogoutA', async (req, res) => {
	let resp = await VerifyTokenAdmin(token_actuall);
	if (resp == false) {
		res.render('Err');
	} else {
		token_actuall = undefined;
		res.render('principal');
	}
});
//Log out Cliente
rutas.get('/Logout', async (req, res) => {
	let resp = await VerifyTokenUser(token_actuall);
	if (resp == false) {
		res.render('Err');
	} else {
		DropCar(registros);
		token_actuall = undefined;
		res.render('principal');
	}
});

//exportacion
module.exports = rutas;
