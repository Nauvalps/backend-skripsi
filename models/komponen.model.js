module.exports = (sequelize, importSequelize) => {
	const Komponen = sequelize.define(
		'komponen',
		{
			id: {
				type: importSequelize.UUID,
				defaultValue: importSequelize.UUIDV1,
				primaryKey: true,
			},
			nama_komponen: {
				type: importSequelize.STRING,
			},
			gambar: {
				type: importSequelize.STRING,
			},
			deskripsi: {
				type: importSequelize.TEXT,
			},
		},
		{
			timestamps: false,
			freezeTableName: true,
		}
	);

	return Komponen;
};
