const mongoose = require('mongoose')

const livraisonsSchema = mongoose.Schema(
    {
        commande: {
            type : mongoose.Schema.Types.ObjectId,
            required : true
        },
        address : {
            type : String,
            required : true
        },
        deliveredAt :  {
            type : Date,
            required : false 
        }
    }   
)

module.exports = mongoose.model('LivraisonModel', livraisonsSchema)