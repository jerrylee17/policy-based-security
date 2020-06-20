const Mongoose = require('mongoose')
const { Schema } = Mongoose
const organizationSchema = new Schema({
    name: String,
    token: String
})

module.exports = Mongoose.model('Organization', organizationSchema)
