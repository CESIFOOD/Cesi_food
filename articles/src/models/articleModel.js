const mongoose = require('mongoose')

const articleSchema = mongoose.Schema(
    {
        name: {
            type: String, 
            required: true
        },
        type: {
            type: String,
            required: true
        },
        price: {
            type: String, 
            required: true
        },
        restaurant : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Restaurant',
            required: true //TODO
        }
    }
)

module.exports = mongoose.model('ArticleModel', articleSchema)