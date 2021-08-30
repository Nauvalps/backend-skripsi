const { verifySignUp } = require('../middleware');
const authController = require('../controller/auth.controller');
var router = require('express').Router();

module.exports = (app) => {
	app.use((req, res, next) => {
		res.header(
			'Access-Control-Allow-Headers',
			'access-token, Origin, Content-Type, Accept'
		);
		next();
	});

	router.post(
		'/signup',
		[verifySignUp.checkDuplicateNamaOrEmail],
		authController.signup
	);
	router.post('/signin', authController.signin);
	router.post('/refreshtoken', authController.refreshToken);
	app.use('/api/auth', router);
};
