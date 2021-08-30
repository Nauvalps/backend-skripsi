const db = require('../models');
const Komponen = db.komponen;
const PartKomponen = db.partKomponen;

// CREATE AND SAVE A NEW KOMPONEN
exports.create = async (req, res) => {
	console.log(req.file);
	// validate req
	if (!req.body.nama_komponen || req.file == undefined || !req.body.deskripsi) {
		res.status(400).send({
			message: 'Request tidak sesuai',
		});
		return;
	}

	const komponen = {
		nama_komponen: req.body.nama_komponen,
		gambar: req.file === undefined ? '' : req.file.filename,
		deskripsi: req.body.deskripsi,
	};

	// SAVE KOMPONEN IN THE TABLE
	Komponen.create(komponen)
		.then((data) => {
			res.json({
				status: 200,
				message: 'Komponen berhasil ditambahkan',
				data: data,
			});
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message || 'Beberapa kesalahan terjadi saat membuat Komponen.',
			});
		});
};

// CREATE AND SAVE PART KOMPONEN WITH KOMPONEN_ID
exports.createPartKomponen = async (req, res) => {
	if (!req.body.nama_part) {
		res.status(400).send({
			message: 'Request tidak sesuai',
		});
		return;
	}

	const partKomponen = {
		nama_part: req.body.nama_part,
		komponenId: req.body.komponenId,
	};

	// SAVE PART KOMPONEN
	PartKomponen.create(partKomponen)
		.then((data) => {
			res.json({
				status: 200,
				messsage: 'Part komponen berhasil ditambahkan',
				data: data,
			});
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					'Beberapa kesalahan terjadi saat membuat Part Komponen.',
			});
		});
};

// RETRIEVE ALL PART KOMPONEN
exports.findAllPartKomponen = (req, res) => {
	PartKomponen.findAll()
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					'Beberapa kesalahan terjadi saat mengambil Part Komponen.',
			});
		});
};

// RETRIEVE ALL KOMPONEN FROM THE TABLE
exports.findAll = (req, res) => {
	Komponen.findAll()
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message || 'Beberapa kesalahan terjadi saat mengambil Komponen.',
			});
		});
};

// FIND A SINGLE KOMPONEN WITH ID
exports.findOne = (req, res) => {
	const id = req.params.id;

	Komponen.findByPk(id)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Kesalahan mengambil Komponen dengan id=' + id,
			});
		});
};

// FIND A SINGLE PART KOMPONEN WITH KOMPONEN_ID
exports.findOneByKomponenId = (req, res) => {
	PartKomponen.findAll({
		where: {
			komponenId: req.params.komponenId,
		},
	})
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					'Kesalahan mengambil Part komponen dengan komponenId' +
						req.params.komponenId,
			});
		});
};

// UPDATE A KOMPONEN BY ID
exports.update = (req, res) => {};

// DELETE KOMPONEN BY ID
exports.delete = (req, res) => {};

// DELETE ALL
exports.deleteAll = (req, res) => {};
