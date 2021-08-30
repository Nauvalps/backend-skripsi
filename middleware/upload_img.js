const multer = require('multer');

const imgFilter = (req, file, cb) => {
	if (file.mimetype.startsWith('image')) {
		cb(null, true);
	} else {
		cb('Mohon untuk upload hanya file berupa gambar', false);
	}
};

var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, __basedir + '/public/img-komponen');
	},
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}-nauvalp-${file.originalname}`);
	},
});

var uploadFile = multer({
	storage: storage,
	fileFilter: imgFilter,
});

module.exports = uploadFile;
