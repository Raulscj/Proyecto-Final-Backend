//requerimiento de modelo de productos
const producto = require('../models/producto');

//funcion de busqueda en Productos
async function Busqueda(req, res) {
	let Producto;
	switch (req.body.atributo) {
		case 'all':
			Producto = await producto
				.find()
				.lean()
				.then((Producto) => {
					console.log(Producto);
					res.render('inventario', { Producto });
				})
				.catch((err) => console.log(err));
			break;
		case 'nombre':
			Producto = await producto
				.find({ nombre: req.body.dato })
				.lean()
				.then((Producto) => {
					console.log(Producto);
					res.render('inventario', { Producto });
				})
				.catch((err) => console.log(err));
			break;
		case 'tipo':
			Producto = await producto
				.find({ tipo: req.body.dato })
				.lean()
				.then((Producto) => {
					console.log(Producto);
					res.render('inventario', { Producto });
				})
				.catch((err) => console.log(err));
			break;
		case 'marca':
			Producto = await producto
				.find({ marca: req.body.dato })
				.lean()
				.then((Producto) => {
					console.log(Producto);
					res.render('inventario', { Producto });
				})
				.catch((err) => console.log(err));
			break;
		case 'descripcion':
			Producto = await producto
				.find({ descripcion: req.body.dato })
				.lean()
				.then((Producto) => {
					console.log(Producto);
					res.render('inventario', { Producto });
				})
				.catch((err) => console.log(err));
			break;
		case 'existencia':
			Producto = await producto
				.find({ existencia: req.body.dato })
				.lean()
				.then((Producto) => {
					console.log(Producto);
					res.render('inventario', { Producto });
				})
				.catch((err) => console.log(err));
			break;
		case 'precio':
			Producto = await producto
				.find({ precio: req.body.dato })
				.lean()
				.then((Producto) => {
					console.log(Producto);
					res.render('inventario', { Producto });
				})
				.catch((err) => res.render('Err'));
			break;
		default:
			res.send(
				'La categoria selecionada, no se encuentra en el sistema, por favor intente con alguna de estas [tipo,marca,modelo,descripcion,precio,id]'
			);
	}
}

//Funcion de busqueda en tienda
async function BusquedaTienda(req, res) {
	let Producto;
	switch (req.body.atributo) {
		case 'all':
			Producto = await producto
				.find()
				.lean()
				.then((Producto) => {
					console.log(Producto);
					res.render('tienda', { Producto });
				})
				.catch((err) => console.log(err));
			break;
		case 'nombre':
			Producto = await producto
				.find({ nombre: req.body.dato })
				.lean()
				.then((Producto) => {
					console.log(Producto);
					res.render('tienda', { Producto });
				})
				.catch((err) => console.log(err));
			break;
		case 'tipo':
			Producto = await producto
				.find({ tipo: req.body.dato })
				.lean()
				.then((Producto) => {
					console.log(Producto);
					res.render('tienda', { Producto });
				})
				.catch((err) => console.log(err));
			break;
		case 'marca':
			Producto = await producto
				.find({ marca: req.body.dato })
				.lean()
				.then((Producto) => {
					console.log(Producto);
					res.render('tienda', { Producto });
				})
				.catch((err) => console.log(err));
			break;
		case 'descripcion':
			Producto = await producto
				.find({ descripcion: req.body.dato })
				.lean()
				.then((Producto) => {
					console.log(Producto);
					res.render('tienda', { Producto });
				})
				.catch((err) => console.log(err));
			break;
		case 'existencia':
			Producto = await producto
				.find({ existencia: req.body.dato })
				.lean()
				.then((Producto) => {
					console.log(Producto);
					res.render('tienda', { Producto });
				})
				.catch((err) => console.log(err));
			break;
		case 'precio':
			Producto = await producto
				.find({ precio: req.body.dato })
				.lean()
				.then((Producto) => {
					console.log(Producto);
					res.render('tienda', { Producto });
				})
				.catch((err) => res.render('Err'));
			break;
		default:
			res.send(
				'La categoria selecionada, no se encuentra en el sistema, por favor intente con alguna de estas [tipo,marca,modelo,descripcion,precio,id]'
			);
	}
}

//busqueda auxiliar para una funcion
async function objeto(req, res) {
	let pproducto = await producto.findOne({ _id: req.params.id });
	return pproducto;
}

//exportacion de funciones
module.exports = { Busqueda, BusquedaTienda, objeto };
