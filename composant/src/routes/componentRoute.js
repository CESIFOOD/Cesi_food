const express = require('express');
const router = express.Router();
const {
    createComponent,
    putComponent,
    getComponent,
    getComponents,
    deleteComponent,
    downloadComponent, // Import de la fonction de téléchargement
} = require('../controllers/ComponentController');
const multer = require('multer');
const path = require('path');

const storage = require('../config/storageConfig');

const upload = multer({ storage });

router.get('/', getComponents);
router.get('/:id', getComponent);
router.get('/:id/download', downloadComponent); // Route pour télécharger un composant
router.put('/:id', putComponent);
router.delete('/:id', deleteComponent); // Route pour la suppression
router.post('/', upload.single('file'), createComponent);

module.exports = router;