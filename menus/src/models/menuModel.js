const mongoose = require("mongoose")

const menusSchema = mongoose.Schema (
    {
        name : {
            type : String, 
            required : true,
        } ,
        price : {
            type : Number, 
            required : true 
        },
        restaurant : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'RestaurantModel'
        },
        image : {
            type : String,
        },
        articles : [{
            type : mongoose.Schema.Types.ObjectId,
            ref : 'ArticleModel'
        }]


    }
)

module.exports = mongoose.model('MenuModel', menusSchema)