const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join('/app/uploads')); // Assurez-vous que ce chemin est correct
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname.replace(/[^a-z0-9.]/gi, '_').toLowerCase());
    }
});

module.exports = storage;
