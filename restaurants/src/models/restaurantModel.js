const mongoose = require('mongoose')

const restaurantsSchema = mongoose.Schema(
    {
        name: {
            type : String,
            required : true
        },
        type : {
            type : String,
            required : true
        },
        adress :  {
            type : String,
            required : true 
        },
        image : {
            type : String,
            required : false
        },
        description : {
            type : String,
            required : false
        },
        userId : {
            type : String,
            required : true
        }
    }   
)

module.exports = mongoose.model('RestaurantModel', restaurantsSchema)