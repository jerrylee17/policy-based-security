const Mongoose = require('mongoose')
const { Schema } = Mongoose
const tokenSchema = new Schema({
    name: String,
    policies: [
        {
            type: Schema.Types.ObjectId,
            ref: Policy
        }
    ]
})

Mongoose.model('Token', tokenSchema)
