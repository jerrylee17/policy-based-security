const mongoose = require('mongoose');
const { Schema } = mongoose;
const Device = require('./Device')

const policySchema = new Schema({
    device: { type: Schema.Types.ObjectId, ref: Device },
    policies: {
        type: Map,
        of: String
    }
});

mongoose.model('Policy', policySchema);
