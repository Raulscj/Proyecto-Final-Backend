//requerimiento de producto
const producto = require('../models/producto');
//requerimiento de registro
const registro = require('../models/registro');

//funcion de eliminar producto
async function eliminar(req, res) {
	try {
		await producto.findByIdAndDelete(req.params.id);
		console.log('Data Erased');
	} catch (error) {
		console.log(error);
		return false;
	}
	console.log('Data Erased');
	return true;
}

//funcion de eliminar registro
async function eliminar_registro(req, res) {
	try {
		await registro.findByIdAndDelete(req.params.id);
	} catch (error) {
		console.log(error);
		return false;
	}
	console.log('Data Erased');
	return true;
}

//funcion de limpiar base de datos de registro (al momento de finalizar compra)
async function DropCar(database) {
	database.deleteMany({}, function (err) {
		if (err) {
			console.log(err);
		} else {
			console.log('success');
		}
	});
}

//exportacion de funciones
module.exports = { eliminar, eliminar_registro, DropCar };
