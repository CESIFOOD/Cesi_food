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
                ref: "ArticleModel"
            },
            quantity: Number
        }],  
        totalPrice: {
            type: Number,
        },
        status : {
            type : String,
            enum: ['en validation', 'en préparation', 'livraison en cours', 'livré'], default: 'en validation'
        }
    }
)

module.exports = mongoose.model('CommandeModel', commandesSchema)