//requerimiento de modelo de productos
const producto = require('../models/producto');
//requerimientos de modelo de registros
const registros = require('../models/registro')
//requerimiento de funcion de ediciones
const { total } = require('../controllers/edicion');

//funcion de busqueda en Productos
function Busqueda(req, res) {
	let Producto;
	switch (req.body.atributo) {
		case 'all':
			Producto = producto
				.find()
				.lean()
				.then((Producto) => {
					console.log(Producto);
					res.render('inventario', { Producto });
				})
				.catch((err) => console.log(err));
			break;
		case 'nombre':
			Producto = producto
				.find({ nombre: req.body.dato })
				.lean()
				.then((Producto) => {
					console.log(Producto);
					res.render('inventario', { Producto });
				})
				.catch((err) => console.log(err));
			break;
		case 'tipo':
			Producto = producto
				.find({ tipo: req.body.dato })
				.lean()
				.then((Producto) => {
					console.log(Producto);
					res.render('inventario', { Producto });
				})
				.catch((err) => console.log(err));
			break;
		case 'marca':
			Producto = producto
				.find({ marca: req.body.dato })
				.lean()
				.then((Producto) => {
					console.log(Producto);
					res.render('inventario', { Producto });
				})
				.catch((err) => console.log(err));
			break;
		case 'descripcion':
			Producto = producto
				.find({ descripcion: req.body.dato })
				.lean()
				.then((Producto) => {
					console.log(Producto);
					res.render('inventario', { Producto });
				})
				.catch((err) => console.log(err));
			break;
		case 'existencia':
			Producto = producto
				.find({ existencia: req.body.dato })
				.lean()
				.then((Producto) => {
					console.log(Producto);
					res.render('inventario', { Producto });
				})
				.catch((err) => console.log(err));
			break;
		case 'precio':
			Producto = producto
				.find({ precio: req.body.dato })
				.lean()
				.then((Producto) => {
					console.log(Producto);
					res.render('inventario', { Producto });
				})
				.catch((err) => res.render('Err'));
			break;
		default:
			res.render('inventario', { Producto });
	}
}

//Funcion de busqueda en tienda
async function BusquedaTienda(req, res) {
	let tota_a_pagar
	let Producto;
	switch (req.body.atributo) {
		case 'all':
			Producto = producto
				.find()
				.lean()
				.then(async (Producto) => {
					console.log(Producto);
					total_a_pagar = await total()
					const Registro = await registros.find().lean();
					res.render('Tienda', { Producto, Registro, total_a_pagar });
				})
				.catch((err) => console.log(err));
			break;
		case 'nombre':
			Producto = producto
				.find({ nombre: req.body.dato })
				.lean()
				.then(async (Producto) => {
					console.log(Producto);
					total_a_pagar = await total()
					const Registro = await registros.find().lean();
					res.render('Tienda', { Producto, Registro, total_a_pagar });
				})
				.catch((err) => console.log(err));
			break;
		case 'tipo':
			Producto = producto
				.find({ tipo: req.body.dato })
				.lean()
				.then(async (Producto) => {
					console.log(Producto);
					total_a_pagar = await total()
					const Registro = await registros.find().lean();
					res.render('Tienda', { Producto, Registro, total_a_pagar });
				})
				.catch((err) => console.log(err));
			break;
		case 'marca':
			Producto = producto
				.find({ marca: req.body.dato })
				.lean()
				.then(async (Producto) => {
					console.log(Producto);
					total_a_pagar = await total()
					const Registro = await registros.find().lean();
					res.render('Tienda', { Producto, Registro, total_a_pagar });
				})
				.catch((err) => console.log(err));
			break;
		case 'descripcion':
			Producto = producto
				.find({ descripcion: req.body.dato })
				.lean()
				.then(async (Producto) => {
					console.log(Producto);
					total_a_pagar = await total()
					const Registro = await registros.find().lean();
					res.render('Tienda', { Producto, Registro, total_a_pagar });
				})
				.catch((err) => console.log(err));
			break;
		case 'existencia':
			Producto = producto
				.find({ existencia: req.body.dato })
				.lean()
				.then(async (Producto) => {
					console.log(Producto);
					total_a_pagar = await total()
					const Registro = await registros.find().lean();
					res.render('Tienda', { Producto, Registro, total_a_pagar });
				})
				.catch((err) => console.log(err));
			break;
		case 'precio':
			Producto = producto
				.find({ precio: req.body.dato })
				.lean()
				.then(async (Producto) => {
					console.log(Producto);
					total_a_pagar = await total()
					const Registro = await registros.find().lean();
					res.render('Tienda', { Producto, Registro, total_a_pagar });
				})
				.catch((err) => res.render('Err'));
			break;
		default:
			total_a_pagar = await total()
			const Registro = await registros.find().lean();
			res.render('Tienda', { Producto, Registro, total_a_pagar });
	}
}

//busqueda auxiliar para una funcion
async function objeto(req, res) {
	let pproducto = await producto.findOne({ _id: req.params.id });
	return pproducto;
}

//exportacion de funciones
module.exports = { Busqueda, BusquedaTienda, objeto };
