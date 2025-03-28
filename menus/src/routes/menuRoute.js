const express = require('express');
const router = express.Router();
const {getMenu, getMenus, deleteMenu, putMenu, createMenu} = require('../controllers/MenuController');

router.get('/', getMenus);
router.get('/:id', getMenu);
router.put('/:id', putMenu);
router.delete('/:id', deleteMenu);
router.post('/', createMenu)

module.exports = router