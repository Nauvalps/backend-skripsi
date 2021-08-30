const { authJwt } = require('../middleware');
const komponen = require('../controller/komponen.controller');
const upload = require('../middleware/upload_img');
var router = require('express').Router();

module.exports = (app) => {
	app.use((req, res, next) => {
		res.header(
			'Access-Control-Allow-Headers',
			'access-token, Origin, Content-Type, Accept'
		);
		next();
	});

	// create a new komponen
	router.post('/', upload.single('gambar'), komponen.create);

	// create a new part komponen
	router.post('/part', komponen.createPartKomponen);

	// retrieve all komponen
	router.get('/', [authJwt.verifyToken], komponen.findAll);

	// retrieve all part komponen
	router.get('/part', [authJwt.verifyToken], komponen.findAllPartKomponen);

	// retrieve part komponen with komponen id
	router.get(
		'/part/:komponenId',
		[authJwt.verifyToken],
		komponen.findOneByKomponenId
	);

	// retrieve a single komponen with id
	router.get('/:id', [authJwt.verifyToken], komponen.findOne);

	app.use('/api/komponen', router);
};
