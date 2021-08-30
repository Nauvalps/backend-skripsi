const { authJwt } = require('../middleware');
const gejala = require('../controller/gejala.controller');
var router = require('express').Router();

module.exports = (app) => {
	app.use((req, res, next) => {
		res.header(
			'Access-Control-Allow-Headers',
			'access-token, Origin, Content-Type, Accept'
		);
		next();
	});

	// create a new gejala
	router.post('/', gejala.create);

	// route find
	router.get(
		'/:partKomponenId',
		[authJwt.verifyToken],
		gejala.findByPartKomponen
	);

	// get all gejala
	router.get('/', [authJwt.verifyToken], gejala.findAll);

	app.use('/api/gejala', router);
};
