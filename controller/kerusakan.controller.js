const db = require('../models');
const { QueryTypes } = require('sequelize');
const Kerusakan = db.kerusakan;
const conn = db.sequelize;

// CREATE AND SAVE A NEW KERUSAKAN
exports.create = async (req, res) => {
	// validate req
	if (!req.body.nama_kerusakan || !req.body.solusi) {
		res.status(400).send({
			message: 'Request tidak sesuai.',
		});
		return;
	}

	const kerusakan = {
		nama_kerusakan: req.body.nama_kerusakan,
		solusi: req.body.solusi,
		gejalaId: req.body.gejalaId,
	};

	Kerusakan.create(kerusakan)
		.then((data) => {
			res.json({
				status: 200,
				message: 'Kerusakan berhasil ditambahkan',
				data: data,
			});
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message || 'Beberapa kesalahan terjadi saat membuat Kerusakan.',
			});
		});
};

// RETRIEVE ALL KERUSAKAN FROM THE TABLE

exports.findAll = async (req, res) => {
	await conn
		.query(
			'SELECT * FROM kerusakan INNER JOIN gejala ON kerusakan.gejalaId = gejala.id WHERE gejala.partKomponenId = :partKomponenId ORDER BY nama_kerusakan',
			{
				replacements: {
					partKomponenId: req.params.partKomponenId,
				},
				type: QueryTypes.SELECT,
			}
		)
		.then((response) => {
			// define array nama kerusakan
			let namaKerusakan = [];
			// define array solusi kerusakan
			let solusiKerusakan = [];
			// define array temporary bobot sesuai kerusakan
			let tmpBobot = [];
			// define array temporary gejala sesuai kerusakan
			let tmpGejala = [];
			// define array nilai kemiripan kasus baru sesuai gejala kasus lama
			let nilaiKemiripan = [];
			// define array temporary respon json
			let tmpJson = [];
			// tampung request body gejala
			let requestGejala = req.body.gejala;

			// loop response dari db
			response.forEach((item) => {
				let tmpCounter = namaKerusakan.indexOf(item.nama_kerusakan);
				if (tmpCounter === -1) {
					namaKerusakan.push(item.nama_kerusakan);
					solusiKerusakan.push(item.solusi);
					tmpGejala.push([]);
					tmpBobot.push([]);
					nilaiKemiripan.push([]);
				}

				tmpGejala[namaKerusakan.indexOf(item.nama_kerusakan)].push(
					item.nama_gejala
				);
				tmpBobot[namaKerusakan.indexOf(item.nama_kerusakan)].push(item.bobot);
				let tampungNilaiKemiripan = requestGejala.includes(item.nama_gejala)
					? 1
					: 0;
				nilaiKemiripan[namaKerusakan.indexOf(item.nama_kerusakan)].push(
					tampungNilaiKemiripan
				);
			});

			const pertambahanByIndex = (x, y) => x + y;
			const pisakanHasilPertambahanByIndex = (result) =>
				result.reduce(pertambahanByIndex, 0);
			let tampungBobot = tmpBobot.map(pisakanHasilPertambahanByIndex);
			let tmpHasilPerkalianBobotDenganNilaiKemiripan = [];
			tmpBobot.forEach((x, y) => {
				let acc = 0;
				nilaiKemiripan[y].forEach((x1, y1) => {
					acc += x[y1] * x1;
				});
				tmpHasilPerkalianBobotDenganNilaiKemiripan[y] = acc;
			});

			let bagiKemiripanDenganJumlahBobot =
				tmpHasilPerkalianBobotDenganNilaiKemiripan.map(function (num, idx) {
					return (num / tampungBobot[idx]) * 100;
				});
			namaKerusakan.forEach((data) => {
				tmpJson.push({
					kerusakan: data,
					gejala: tmpGejala[namaKerusakan.indexOf(data)],
					bobot: tmpBobot[namaKerusakan.indexOf(data)],
					solusi: solusiKerusakan[namaKerusakan.indexOf(data)],
					kemiripan: nilaiKemiripan[namaKerusakan.indexOf(data)],
					similarity: Math.round(
						bagiKemiripanDenganJumlahBobot[namaKerusakan.indexOf(data)]
					),
				});
			});

			let resultFinall = tmpJson.sort((a, b) => {
				return b.similarity - a.similarity;
			});
			console.log(tmpJson);
			res.send(resultFinall);
		})
		.catch((err) => {
			res.send({
				message: err.message,
			});
		});
};
