const express = require('express');
const router = express.Router();
const {createArticle, putArticle, getArticle, getArticles, deleteArticle} = require('../controllers/ArticleController')

router.get('/', getArticles);
router.get('/:id', getArticle);
router.put('/:id', putArticle);
router.delete('/:id', deleteArticle);
router.post('/', createArticle)

module.exports = router