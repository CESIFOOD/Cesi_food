const express = require('express');
const router = express.Router();
const {getOrder, getOrders, deleteOrder, createOrder, updateOrder} = require('../controllers/CommandeController');

router.get('/', getOrders);
router.get('/:id', getOrder);
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);
router.post('/', createOrder)

module.exports = router