// const express = require('express')
const LogsModel = require('../models/logsModel')
const LogsComposantModel = require('../models/logsComposantModel')
const asynchHandler = require('express-async-handler');

const getLogs = asynchHandler(async(req, res) => {
    try {
        const logs = await LogsModel.find({}).sort({ createdAt: -1 });
        res.status(200).json(logs)
    } catch (error) {
        res.status(500);
        throw new Error(error.message)
    }
})


const getLog = asynchHandler(async(req, res) => {
    try {
        const {id} = req.params
        const logs = await LogsModel.findById(id)
        if (!logs) {
            res.status(404);
            throw new Error(`no restaurant find with id ${id}`)
        }
        res.json(logs);

    } catch (error) {
        res.status(500);
        throw new Error(error.message)
    }
})

const putLog = asynchHandler(async(req, res) => {
    try {
        const {id} = req.params;
        const log = await LogsModel.findByIdAndUpdate(id, req.body, {new :true});
        if(!log) {
            res.status(404).json(`cannot find any restaurant with the id : ${id} `);
        }
        res.status(200).json(log)
    } catch (error) {
        res.status(500);
        throw new Error(error.message)
    }
})

const deleteLog = asynchHandler(async(req, res) => {
    try {
        const {id} = req.params
        const log = await LogsModel.findByIdAndDelete(id)
        if(!log) {
            res.status(404).json(`couldn't find any restaurant with id : ${id}`)
        }
        const udpdatedLog = await LogsModel.findById(id)
        res.status(200).json(udpdatedLog)
    } catch (error) {
        res.status(500);
        throw new Error(error.message)
    }
})

const createLog = asynchHandler(async(req, res) => {
    try {
        const log = await LogsModel.create(req.body)
        res.status(200).json(log)
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

const createLogComposant = asynchHandler(async(req, res) => {
    try {
        const log = await LogsComposantModel.create(req.body)
        res.status(200).json(log)
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

const getLogsComposant = asynchHandler(async(req, res) => {
    console.log("Cocou")
    try {
        const logs = await LogsComposantModel.find({}).sort({ createdAt: -1 });
        res.status(200).json(logs)
    } catch (error) {
        res.status(500);
        throw new Error(error.message)
    }
})


module.exports = {
    getLogs,
    getLog,
    putLog,
    deleteLog,  
    createLog,
    createLogComposant,
    getLogsComposant
}