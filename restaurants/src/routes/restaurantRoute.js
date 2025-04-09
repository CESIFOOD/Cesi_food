const express = require('express');
const router = express.Router();
const {createRestaurant, getRestaurant, getRestaurants, deleteRestaurant, putRestaurant} = require('../controllers/RestaurantController');

router.get('/', getRestaurants);
router.get('/:id', getRestaurant);
router.put('/:id', putRestaurant);
router.delete('/:id', deleteRestaurant);
router.post('/', createRestaurant)

module.exports = router