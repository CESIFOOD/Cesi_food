const mongoose = require('mongoose')

const logsSchema = mongoose.Schema(
    {
        name: {
            type : String,
            required : true
        },
        text : {
            type : String,
            required : true
        }
    },  {timestamps: true} // Automatically add createdAt and updatedAt timestamps
)

module.exports = mongoose.model('LogsModel', logsSchema)