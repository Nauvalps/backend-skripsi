const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const { TokenExpiredError } = jwt;

const catchErr = (err, res) => {
	if (err instanceof TokenExpiredError) {
		return res.status(401).send({
			message: 'Unauthorized! Access Token was expired!',
		});
	}
	return res.status(401).send({
		message: 'Unauthorized!',
	});
};
const verifyToken = (req, res, next) => {
	let token = req.headers['access-token'];
	if (!token) {
		return res.status(403).send({
			message: 'Tidak ada token yang disediakan!',
		});
	}

	jwt.verify(token, config.secret, (err, decoded) => {
		if (err) {
			return catchErr(err, res);
		}
		req.userId = decoded.id;
		next();
	});
};

const authJwt = {
	verifyToken: verifyToken,
};

module.exports = authJwt;
