const Mongoose = require('mongoose')
const { Schema } = Mongoose
const Organization = require('./Organization')

const deviceSchema = new Schema({
    name: String,
    device_token: String,
    organization: {
        type: Schema.Types.ObjectId,
        ref: Organization
    }
})

module.exports = Mongoose.model('Device', deviceSchema)
