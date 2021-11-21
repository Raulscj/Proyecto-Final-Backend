//requerimiento de producto
const producto = require('../models/producto');
//requerimiento de registro
const registro = require('../models/registro');

//funcion de editar datos en productos
async function editar_datos(req, res) {
	try {
		const nProducto = await producto.updateOne(
			{ _id: req.params.id },
			{
				nombre: req.body.Nombre,
				tipo: req.body.Tipo,
				marca: req.body.Marca,
				descripcion: req.body.Descripcion,
				existencia: req.body.Existencia,
				precio: req.body.Precio,
			}
		);
		return true;
	} catch (error) {
		return false;
	}
}

//funcion de restar de inventario
async function restar(req, res) {
	let objeto = await producto.findOne({ _id: req.params.id }).lean();
	console.log(objeto.existencia);
	if (objeto.existencia <= 0) {
		return false
	} else {
		await producto.updateOne(
			{ _id: req.params.id },
			{
				existencia: objeto.existencia - 1,
			}
		);
	}
}

//funcion de sumar
async function sumar(req, res) {
	let objeto = await registro.findOne({ _id: req.params.id }).lean();
	let objeto_2 = await producto.findOne({
		nombre: objeto.nombre,
		tipo: objeto.tipo,
		marca: objeto.marca,
		descripcion: objeto.descripcion,
		precio: objeto.precio,
	});
	await producto.updateOne(
		{ _id: objeto_2.id },
		{
			existencia: objeto_2.existencia + 1,
		}
	);
}

//funcion de suma de total
async function total(){
	let total_final = 0
	let valor = await registro.find().lean()
	await valor.forEach(element => {
		total_final += element.precio
	}); 
	return total_final
}

//exportacion de funciones
module.exports = { editar_datos, restar, sumar, total };
