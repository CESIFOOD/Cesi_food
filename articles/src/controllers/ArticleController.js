const express = require('express')
const ArticleModel = require('../models/articleModel')
const asynchHandler = require('express-async-handler');
const articleModel = require('../models/articleModel');

const getArticles = asynchHandler(async (req, res) => {
    try {
        const articles = await ArticleModel.find({});
        res.status(200).json(articles)
    } catch (error) {
        res.status(500);
        throw new Error(error.message)
    }
})

const getArticle = asynchHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const article = await ArticleModel.findById(id);
        if (!article) {
            res.status(404).json(`Couldn't find any article with id ${id}`)
        }
        res.status(200).json(article)
    } catch (error) {
        res.status(500);
        throw new Error(error.message)
    }

})

const putArticle = asynchHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const article = await ArticleModel.findByIdAndUpdate(id, req.body, {new : true});
        if (!article) {
            res.status(404).json(`Couldn't find any article with id ${id}`)
        }
        res.status(200).json(article)
    } catch (error) {
        res.status(500);
        throw new Error(error.message)
    }
})


const deleteArticle = asynchHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const article = await ArticleModel.findByIdAndDelete(id);
        if (!article) {
            res.status(404).json(`Couldn't find any article with id ${id}`)
        }
        const updatedArticle = await ArticleModel.findById(id)
        res.status(200).json(updatedArticle)
    } catch (error) {
        res.status(500);
        throw new Error(error.message)
    }
})

const createArticle = asynchHandler(async (req, res) => {
    try {
        const article = await articleModel.create(req.body)
        res.status(200).json(article)
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

module.exports = {
    createArticle,
    deleteArticle,
    putArticle,
    getArticle,
    getArticles,
}