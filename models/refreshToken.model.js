const authConfig = require('../config/auth.config');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, importSequelize) => {
	const RefreshToken = sequelize.define('refresh_token', {
		token: {
			type: importSequelize.STRING,
		},
		expiryDate: {
			type: importSequelize.DATE,
		},
	});

	RefreshToken.createToken = async function (user) {
		let expiredAt = new Date();
		expiredAt.setSeconds(
			expiredAt.getSeconds() + authConfig.jwtRefreshExpiration
		);

		let _token = uuidv4();
		let refreshToken = await this.create({
			token: _token,
			userId: user.id,
			expiryDate: expiredAt.getTime(),
		});
		return refreshToken.token;
	};
	RefreshToken.verifyExpiration = (token) => {
		return token.expiryDate.getTime() < new Date().getTime();
	};
	return RefreshToken;
};
