const mongoose = require('mongoose')

const logsComposantSchema = mongoose.Schema(
    {
        name: {
            type : String,
            required : true
        },
        text : {
            type : String,
            required : true
        },
    },   {timestamps: true} // Automatically add createdAt and updatedAt timestamps
)

module.exports = mongoose.model('LogsComposantModel', logsComposantSchema)