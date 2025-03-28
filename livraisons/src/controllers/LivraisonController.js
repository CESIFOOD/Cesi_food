const express = require('express')
const LivraisonModel = require('../models/livraisonModel')
const asynchHandler = require('express-async-handler');

const getLivraisons = asynchHandler(async(req, res) => {
    try {
        const livraisons = await LivraisonModel.find({});
        res.status(200).json(livraisons)
    } catch (error) {
        res.status(500);
        throw new Error(error.message)
    }
})

const getLivraison = asynchHandler(async(req, res) => {
    try {
        const {id} = req.params
        const livraison = await LivraisonModel.findById(id)
        if (!livraison) {
            res.status(404);
            throw new Error(`no livraison find with id ${id}`)
        }
        res.json(livraison);

    } catch (error) {
        res.status(500);
        throw new Error(error.message)
    }
})

const putLivraison = asynchHandler(async(req, res) => {
    try {
        const {id} = req.params;
        const livraison = await LivraisonModel.findByIdAndUpdate(id, req.body, {new :true});
        if(!livraison) {
            res.status(404).json(`cannot find any livraison with the id : ${id} `);
        }
        res.status(200).json(livraison)
    } catch (error) {
        res.status(500);
        throw new Error(error.message)
    }
})

const deleteLivraison = asynchHandler(async(req, res) => {
    try {
        const {id} = req.params
        const livraison = await LivraisonModel.findByIdAndDelete(id)
        if(!livraison) {
            res.status(404).json(`couldn't find any livraison with id : ${id}`)
        }
        const udpdatedLivraison = await LivraisonModel.findById(id)
        res.status(200).json(udpdatedLivraison)
    } catch (error) {
        res.status(500);
        throw new Error(error.message)
    }
})

const createLivraison = asynchHandler(async(req, res) => {
    try {
        const livraison = await LivraisonModel.create(req.body)
        res.status(200).json(livraison)
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})


module.exports = {
    getLivraison,
    getLivraisons,
    deleteLivraison,
    putLivraison,
    createLivraison
}