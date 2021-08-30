module.exports = (sequelize, importSequelize) => {
	const Gejala = sequelize.define(
		'gejala',
		{
			id: {
				type: importSequelize.UUID,
				defaultValue: importSequelize.UUIDV1,
				primaryKey: true,
			},
			nama_gejala: {
				type: importSequelize.STRING,
			},
			bobot: {
				type: importSequelize.INTEGER,
			},
		},
		{
			timestamps: false,
			freezeTableName: true,
		}
	);

	return Gejala;
};
