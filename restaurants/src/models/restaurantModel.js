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
        }
    }   
)

module.exports = mongoose.model('RestaurantModel', restaurantsSchema)