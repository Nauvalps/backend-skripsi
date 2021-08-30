const db = require('../models');
const { QueryTypes } = require('sequelize');
const Gejala = db.gejala;
const conn = db.sequelize;

// CREATE AND SAVE A NEW GEJALA
exports.create = async (req, res) => {
	// validate req
	if (!req.body.nama_gejala || !req.body.bobot || !req.body.partKomponenId) {
		res.status(400).send({
			message: 'Request tidak sesuai!',
		});
		return;
	}

	const gejala = {
		nama_gejala: req.body.nama_gejala,
		bobot: req.body.bobot,
		partKomponenId: req.body.partKomponenId,
	};

	Gejala.create(gejala)
		.then((data) => {
			res.json({
				status: 200,
				message: 'Gejala berhasil di tambahkan',
				data: data,
			});
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message || 'Beberapa kesalahan terjadi saat membuat Gejala.',
			});
		});
};

// RETRIEVE ALL GEJALA FROM THE TABLE

exports.findAll = async (req, res) => {
	Gejala.findAll()
		.then((data) => {
			res.json({
				result: data,
			});
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message || 'Beberapa kesalahan terjadi saat mengambil Gejala.',
			});
		});
};

// find gejala by request
exports.findByPartKomponen = async (req, res) => {
	Gejala.findAll({ where: { partKomponenId: req.params.partKomponenId } })
		.then((data) => {
			res.json({
				result: data,
			});
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					'Beberapa kesalahan terjadi saat mengambil gejala sesuai part komponen',
			});
		});
};

// UPDATE A KOMPONEN BY ID
exports.update = (req, res) => {};

// DELETE KOMPONEN BY ID
exports.delete = (req, res) => {};

// DELETE ALL
exports.deleteAll = (req, res) => {};
