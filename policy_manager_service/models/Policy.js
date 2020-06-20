const Mongoose = require('mongoose')
const { Schema } = Mongoose
const policySchema = new Schema({
    name: String,
    permission: String
})

Mongoose.model('Policy', policySchema)
