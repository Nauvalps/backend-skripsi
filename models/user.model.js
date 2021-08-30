module.exports = (sequelize, importSequelize) => {
	const User = sequelize.define(
		'tb_users',
		{
			nama: {
				type: importSequelize.STRING,
			},
			email: {
				type: importSequelize.STRING,
			},
			password: {
				type: importSequelize.STRING,
			},
			gambar: {
				type: importSequelize.STRING,
			},
		},
		{
			timestamps: false,
			freezeTableName: true,
		}
	);
	return User;
};
