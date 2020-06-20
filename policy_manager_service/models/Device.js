const Mongoose = require('mongoose')
const { Schema } = Mongoose
const deviceSchema = new Schema({
    name: String,
    tokens: [
        {
            type: Schema.Types.ObjectId,
            ref: Token
        }
    ]
})

Mongoose.model('Device', deviceSchema)
