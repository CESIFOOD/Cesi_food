const ComponentModel = require('../models/componentModel');
const multer = require('multer');
const asynchHandler = require('express-async-handler');
const fs = require('fs/promises');
const path = require('path');
const Component = require('../models/componentModel'); // à adapter selon ton projet
const uploadsDir = '/app/uploads/';
const { join, dirname } = require('path');
const storage = require('../config/storageConfig');
const upload = multer({ storage });

const createComponent = asynchHandler(async (req, res) => {
    try {
        const { name, description } = req.body;
        const file = req.file;

        if (!name || !file) {
            return res.status(400).json({ error: 'Le nom et le fichier sont requis' });
        }

        const timestamp = Date.now();
        const safeFileName = file.originalname.replace(/[^a-z0-9.]/gi, '_').toLowerCase();
        const fileName = `${safeFileName}`;
        const filePath = path.join('/app/uploads', fileName); // Assurez-vous que ce chemin est correct

        const downloadUrl = `${fileName}`; // Correct download URL

        const newComponent = await ComponentModel.create({
            name,
            path: filePath, // Save the correct path
            downloadUrl,
            description,
        });

        res.status(201).json(newComponent);
    } catch (error) {
        console.error('Erreur création composant:', error);
        return res.status(500).json({ error: 'Erreur serveur lors de la création du composant' });
    }
});

// Get All
const getComponents = asynchHandler(async (req, res) => {
    const components = await ComponentModel.find({});
    res.status(200).json(components);
});

// Get by ID
const getComponent = asynchHandler(async (req, res) => {
    const { id } = req.params;
    const component = await ComponentModel.findById(id);
    if (!component) {
        res.status(404);
        throw new Error(`Aucun composant trouvé avec l'id ${id}`);
    }
    res.status(200).json(component);
});

// Update
const putComponent = asynchHandler(async (req, res) => {
    const { id } = req.params;
    const component = await ComponentModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!component) {
        return res.status(404).json(`Aucun composant trouvé avec l'id ${id}`);
    }
    res.status(200).json(component);
});

// Delete
const deleteComponent = asynchHandler(async (req, res) => {
    const { id } = req.params;
    const component = await ComponentModel.findByIdAndDelete(id);
    if (!component) {
        return res.status(404).json(`Aucun composant trouvé avec l'id ${id}`);
    }
    res.status(200).json({ message: "Composant supprimé avec succès" });
});

// Télécharger un composant
const downloadComponent = asynchHandler(async (req, res) => {
    const { id } = req.params;
    const component = await ComponentModel.findById(id);
    console.log(`dirname: ${__dirname}`)

    if (!component) {
        return res.status(404).json({ error: "Composant introuvable" });
    }

    try {
        const filePath = path.join(uploadsDir, component.downloadUrl); // Chemin du fichier à télécharger
        console.log(`filePath: ${filePath}`)
        await fs.access(filePath); // Check if the file exists

        res.download(filePath, component.name, (err) => {
            if (err) {
                console.error("Erreur lors du téléchargement :", err);
                res.status(500).json({ error: "Erreur lors du téléchargement" });
            }
        });
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error("Fichier introuvable :", component.path);
            return res.status(404).json({ error: "Fichier introuvable" });
        }
        console.error("Erreur lors de la résolution du chemin :", error);
        res.status(500).json({ error: "Erreur interne du serveur" });
    }
});

module.exports = {
    getComponents,
    getComponent,
    putComponent,
    deleteComponent,
    createComponent,
    downloadComponent, // Ajout de la fonction de téléchargement
};