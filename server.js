const express = require('express');
const cors = require('cors');
const db = require('./models');

// init route
const routeKomponen = require('./routes/komponen.routes');
const routeGejala = require('./routes/gejala.routes');
const routeKerusakan = require('./routes/kerusakan.routes');
const routeAuth = require('./routes/auth.routes');
const app = express();
global.__basedir = __dirname;

var corsOpt = {
	origin: 'http://localhost:3000',
};

app.use(cors(corsOpt));

db.sequelize.sync();

// parse request of content type json
app.use(express.json());

// call directory public
app.use(express.static('public'));

// parse request of content type application/x-www-form-urlencoded
app.use(
	express.urlencoded({
		extended: true,
	})
);

// route home
app.get('/', (request, response) => {
	response.json({
		message: 'Welcome backend skripsi!',
	});
});

// route all about komponen
routeKomponen(app);

// route all about gejala
routeGejala(app);

// route all about kerusakan
routeKerusakan(app);

// route auth
routeAuth(app);

// set port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server berjalan di port ${PORT}`);
});
