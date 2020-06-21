const Mongoose = require('mongoose')
const { Schema } = Mongoose
const organizationSchema = new Schema({
    name: String,
    organization_token: String
})

module.exports = Mongoose.model('Organization', organizationSchema)
