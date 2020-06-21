const mongoose = require('mongoose');
const Device = mongoose.model('Device');
const Policy = mongoose.model('Policy');
const { policy }  = require('../services/Policy');

module.exports = (app) => {

    app.post('/policy-manager/policy', async (req, res) => {
        const { device_name, device_token, policy_type  } = req.body;
        let device = await Device.findOne({ name: device_name, device_token: device_token});
        if (device){
            let newPolicy = new Policy({
                device: device._id,
                policies: policy[policy_type]
            })
            try {
                await newPolicy.save();
                res.status(200).send(newPolicy);

            } catch (err)  { res.status(500).send(err) }
        } else { res.status(400).send("Device not found!") }
    });
    app.get('/policy-manager/policy/:id', async (req, res) => {
        let policy = await Policy.findOne({
            _id: req.params.id
        });
        if (policy) {
            res.status(200).send(policy);
        } else { res.status(400).send('Bad Request')}
    });
}