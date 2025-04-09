const mongoose = require('mongoose');

const componentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    path: {
        type: String,
        required: true,
    },
    downloadUrl: {
        type: String,
        required: true,
    },
    description: { // Ajout du champ description
        type: String,
        required: false,
    }
}, { timestamps: true });

module.exports = mongoose.model('Component', componentSchema);
