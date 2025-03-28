const express = require('express')
const RestaurantModel = require('../models/restaurantModel')
const asynchHandler = require('express-async-handler');

const getRestaurants = asynchHandler(async(req, res) => {
    try {
        const restaurants = await RestaurantModel.find({});
        res.status(200).json(restaurants)
    } catch (error) {
        res.status(500);
        throw new Error(error.message)
    }
})

const getRestaurant = asynchHandler(async(req, res) => {
    try {
        const {id} = req.params
        const restaurant = await RestaurantModel.findById(id)
        if (!restaurant) {
            res.status(404);
            throw new Error(`no restaurant find with id ${id}`)
        }
        res.json(restaurant);

    } catch (error) {
        res.status(500);
        throw new Error(error.message)
    }
})

const putRestaurant = asynchHandler(async(req, res) => {
    try {
        const {id} = req.params;
        const restaurant = await RestaurantModel.findByIdAndUpdate(id, req.body, {new :true});
        if(!restaurant) {
            res.status(404).json(`cannot find any restaurant with the id : ${id} `);
        }
        res.status(200).json(restaurant)
    } catch (error) {
        res.status(500);
        throw new Error(error.message)
    }
})

const deleteRestaurant = asynchHandler(async(req, res) => {
    try {
        const {id} = req.params
        const restaurant = await RestaurantModel.findByIdAndDelete(id)
        if(!restaurant) {
            res.status(404).json(`couldn't find any restaurant with id : ${id}`)
        }
        const udpdatedRestaurant = await RestaurantModel.findById(id)
        res.status(200).json(udpdatedRestaurant)
    } catch (error) {
        res.status(500);
        throw new Error(error.message)
    }
})

const createRestaurant = asynchHandler(async(req, res) => {
    try {
        const restaurant = await RestaurantModel.create(req.body)
        res.status(200).json(restaurant)
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})


module.exports = {
    getRestaurants,
    getRestaurant,
    putRestaurant,
    deleteRestaurant,
    createRestaurant,
}