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
            type: Number, 
            required: true
        },
        restaurant : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Restaurant',
            required: true //TODO
        },
        image : {
          type : String,
          required: false,  
        }
    }
)

module.exports = mongoose.model('ArticleModel', articleSchema)