//Requerimientos con Express y mongoose

const mongoose = require('mongoose');
const db = mongoose.connection;
const express = require('express');
const servidor = express();
const { engine } = require('express-handlebars');
const path = require('path');

//url de conexion

let url = 'mongodb://127.0.0.1:27017/Proyecto';

//conexion de mongoose
mongoose
	.connect(url)
	//promesa catch para captar errores
	.catch((err) => console.log(err));

//mensaje de conexion exitosa
db.on('open', (_) => {
	console.log(`Database connected url: ${url}`);
});

//errores
db.on('error', (err) => {
	console.log(err);
});

//Configuraciones

//puerto
servidor.set('port', 3000);

//views
servidor.set('views', path.join(__dirname, 'views'));

//engine
servidor.engine(
	'.hbs',
	engine({
		defaultLayout: 'main',
		layoutsDir: path.join(servidor.get('views'), 'layouts'),
		partialsDir: path.join(servidor.get('views'), 'partials'),
		extname: '.hbs',
	})
);

//view engine
servidor.set('view engine', '.hbs');

//Middlewares

servidor.use(express.json());
servidor.use(express.urlencoded({ extended: false }));

//Routes
servidor.use(require('./routes/rutas'));

//Listen

servidor.listen(servidor.get('port'), () => {
	console.log(`Server Started on port ${servidor.get('port')} (EXPRESS)`);
});
