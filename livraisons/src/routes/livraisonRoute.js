const express = require('express');
const router = express.Router();
const {createLivraison, getLivraison, getLivraisons, putLivraison, deleteLivraison} = require('../controllers/LivraisonController');

router.get('/', getLivraisons);
router.get('/:id', getLivraison);
router.put('/:id', putLivraison);
router.delete('/:id', deleteLivraison);
router.post('/', createLivraison)

module.exports = router