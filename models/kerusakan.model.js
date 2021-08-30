module.exports = (sequelize, importSequelize) => {
	const Kerusakan = sequelize.define(
		'kerusakan',
		{
			id: {
				type: importSequelize.UUID,
				defaultValue: importSequelize.UUIDV1,
				primaryKey: true,
			},
			nama_kerusakan: {
				type: importSequelize.STRING,
			},
			solusi: {
				type: importSequelize.TEXT,
			},
		},
		{
			timestamps: false,
			freezeTableName: true,
		}
	);

	return Kerusakan;
};
