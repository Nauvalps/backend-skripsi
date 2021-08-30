const { authJwt } = require('../middleware');
const kerusakan = require('../controller/kerusakan.controller');
var router = require('express').Router();

module.exports = (app) => {
	app.use((req, res, next) => {
		res.header(
			'Access-Control-Allow-Headers',
			'access-token, Origin, Content-Type, Accept'
		);
		next();
	});

	// create a new kerusakan
	router.post('/', kerusakan.create);

	// retrieve all kerusakan
	router.post('/:partKomponenId', [authJwt.verifyToken], kerusakan.findAll);

	app.use('/api/kerusakan', router);
};
