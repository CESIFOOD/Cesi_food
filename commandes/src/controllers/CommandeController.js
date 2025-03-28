const express = require('express');
const asyncHandler = require('express-async-handler');
const OrderModel = require('../models/commandeModel');

// Récupérer toutes les commandes
const getOrders = asyncHandler(async (req, res) => {
    try {
        const orders = await OrderModel.find({}); //.populate('restaurant').populate('article.article')
        res.status(200).json(orders);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});

// Récupérer une commande spécifique
const getOrder = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const order = await OrderModel.findById(id); //.populate('restaurant').populate('article.article');

        if (!order) {
            res.status(404);
            throw new Error(`No order found with id ${id}`);
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});

// Créer une commande
const createOrder = asyncHandler(async (req, res) => {
    try {
        const { userId, restaurant, article, totalPrice } = req.body;

        if (!userId || !restaurant || !article || article.length === 0) {
            res.status(400);
            throw new Error("Missing required fields");
        }
        const order = await OrderModel.create(req.body);
        res.status(201).json(order);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});

// Mettre à jour une commande (ex: changer le statut)
const updateOrder = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const order = await OrderModel.findByIdAndUpdate(id, req.body, { new: true });

        if (!order) {
            res.status(404);
            throw new Error(`No order found with id ${id}`);
        }

        res.status(200).json(order);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});

// Supprimer une commande
const deleteOrder = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const order = await OrderModel.findByIdAndDelete(id);

        if (!order) {
            res.status(404);
            throw new Error(`No order found with id ${id}`);
        }

        res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});

module.exports = {
    getOrders,
    getOrder,
    createOrder,
    updateOrder,
    deleteOrder,
};
