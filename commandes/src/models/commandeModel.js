const mongoose = require('mongoose')

const commandesSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        restaurant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "RestaurantModel"
        },
        article: [{
            article: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "ArticleModel",
                
            },
            quantity: {
                type: Number,
                required: true,
                default: 1, // 🔹 Valeur par défaut
                min: 1, // 🔹 Assure que la quantité est toujours ≥ 1
              },
        }],  
        totalPrice: {
            type: Number,
        },
        status : {
            type : String,
            enum: ['en validation', 'en préparation', 'livraison en cours', 'livré'], default: 'en validation'
        }
    }, { timestamps: true }
);

module.exports = mongoose.model('CommandeModel', commandesSchema)