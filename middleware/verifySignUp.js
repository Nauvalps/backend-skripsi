const db = require('../models');
const User = db.user;

checkDuplicateNamaOrEmail = (req, res, next) => {
	User.findOne({
		where: {
			nama: req.body.nama,
		},
	}).then((user) => {
		if (user) {
			return res.status(400).send({
				message: 'Gagal! nama sudah ada yang dipakai.',
			});
		}
		User.findOne({
			where: {
				email: req.body.email,
			},
		}).then((user) => {
			if (user) {
				return res.status(400).send({
					message: 'Gagal! email sudah ada yang dipakai',
				});
			}
			next();
		});
	});
};

const verifySignUp = {
	checkDuplicateNamaOrEmail: checkDuplicateNamaOrEmail,
};

module.exports = verifySignUp;
