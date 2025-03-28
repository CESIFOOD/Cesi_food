const express = require('express')
const MenuModel = require('../models/menuModel')
const asynchHandler = require('express-async-handler');

const getMenus = asynchHandler(async(req, res) => {
    try {
        const menus = await MenuModel.find({});
        res.status(200).json(menus)
    } catch (error) {
        res.status(500);
        throw new Error(error.message)
    }
})

const getMenu = asynchHandler(async(req, res) => {
    try {
        const {id} = req.params
        const menu = await MenuModel.findById(id)
        if (!menu) {
            res.status(404);
            throw new Error(`no menu find with id ${id}`)
        }
        res.json(menu);

    } catch (error) {
        res.status(500);
        throw new Error(error.message)
    }
})

const putMenu = asynchHandler(async(req, res) => {
    try {
        const {id} = req.params;
        const menu = await MenuModel.findByIdAndUpdate(id, req.body, {new :true});
        if(!menu) {
            res.status(404).json(`cannot find any menu with the id : ${id} `);
        }
        res.status(200).json(menu)
    } catch (error) {
        res.status(500);
        throw new Error(error.message)
    }
})

const deleteMenu = asynchHandler(async(req, res) => {
    try {
        const {id} = req.params
        const menu = await MenuModel.findByIdAndDelete(id)
        if(!menu) {
            res.status(404).json(`couldn't find any menu with id : ${id}`)
        }
        const udpdatedMenu = await MenuModel.findById(id)
        res.status(200).json(udpdatedMenu)
    } catch (error) {
        res.status(500);
        throw new Error(error.message)
    }
})

const createMenu = asynchHandler(async(req, res) => {
    try {
        const menu = await MenuModel.create(req.body)
        res.status(200).json(menu)
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})


module.exports = {
    getMenus,
    getMenu,
    createMenu,
    deleteMenu,
    putMenu,
}