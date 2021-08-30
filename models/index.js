const dbConfig = require('../config/db.config');

const importSequelize = require('sequelize');
const sequelize = new importSequelize(
	dbConfig.DB,
	dbConfig.USER,
	dbConfig.PASSWORD,
	{
		host: dbConfig.HOST,
		dialect: dbConfig.dialect,

		pool: {
			max: dbConfig.pool.max,
			min: dbConfig.pool.min,
			acquire: dbConfig.pool.acquire,
			idle: dbConfig.pool.idle,
		},
	}
);

const db = {};

db.importSequelize = importSequelize;
db.sequelize = sequelize;

db.komponen = require('./komponen.model')(sequelize, importSequelize);
db.partKomponen = require('./part.komponen.model')(sequelize, importSequelize);

db.gejala = require('./gejala.model')(sequelize, importSequelize);
db.kerusakan = require('./kerusakan.model')(sequelize, importSequelize);

db.user = require('./user.model')(sequelize, importSequelize);
db.refreshToken = require('./refreshToken.model')(sequelize, importSequelize);

db.komponen.hasMany(db.partKomponen, { as: 'part_komponen' });
db.partKomponen.belongsTo(db.komponen, {
	foreignKey: 'komponenId',
	as: 'komponen',
});

db.partKomponen.hasMany(db.gejala, { as: 'gejala' });
db.gejala.belongsTo(db.partKomponen, {
	foreignKey: 'partKomponenId',
	as: 'part_komponen',
});

db.gejala.hasMany(db.kerusakan, { as: 'kerusakan' });

db.kerusakan.belongsTo(db.gejala, {
	foreignKey: 'gejalaId',
	as: 'gejala',
});

db.refreshToken.belongsTo(db.user, {
	foreignKey: 'userId',
	targetKey: 'id',
});

db.user.hasOne(db.refreshToken, {
	foreignKey: 'userId',
	targetKey: 'id',
});
module.exports = db;
