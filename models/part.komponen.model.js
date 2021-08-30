module.exports = (sequelize, importSequelize) => {
	const partKomponen = sequelize.define(
		'part_komponen',
		{
			id: {
				type: importSequelize.UUID,
				defaultValue: importSequelize.UUIDV1,
				primaryKey: true,
			},
			nama_part: {
				type: importSequelize.STRING,
			},
		},
		{
			timestamps: false,
			freezeTableName: true,
		}
	);

	return partKomponen;
};
