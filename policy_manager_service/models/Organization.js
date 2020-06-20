const Mongoose = require('mongoose')
const { Schema } = Mongoose
const organizationSchema = new Schema({
    name: String,
    devices: [
        {
            type: Schema.Types.ObjectId,
            ref: Device
        },
    ],
    tokens: [
        {
            type: Schema.Types.ObjectId,
            ref: Token
        }
    ]
})

Mongoose.model('Organization', organizationSchema)
