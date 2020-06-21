const axios = require('axios');
const mongoose = require('mongoose');
const Device = mongoose.model('Device');
const Organization = mongoose.model('Organization');
const { createToken } = require('../services/Token');

module.exports = (app) => {
  app.post('/policy-manager/device', async (req, res) => {
      // check if organization exists
      let organization = await Organization.findOne({ name: req.body.organization });
      console.log(`Organization: ${organization}`)
      if (organization) {
        let organization_token = req.body.organization_token;
        let header ={ headers: {
            'X-Vault-Token': 's.J6cvIW0E5DaMJaRtvZVHTTvk',
            'Content-Type': 'application/x-www-form-urlencoded'}
        }
        await axios.get(`http://13.58.96.116:8200/v1/secret/data/${req.body.organization}`, header).then(async response=>{
            let vault_organization_token = response.data.data.data["org1"];
            if (organization_token == vault_organization_token) {
                let device = new Device({
                    name: req.body.name,
                    device_token: createToken(),
                    organization: organization._id})
                try {
                    await device.save();
                    res.status(200).send(device);
                } catch (err) {
                    res.status(400).send(err);
                }
            } else { es.status(400).send("Invalid token provided");}
        });
      } else {res.status(400).send("No such organization"); }
    });

  app.get('/policy-manager/device',
    async (req, res) => {
      const {
        name,
        organization
      } = req.body
      let status
      await Organization.findOne({ name: organization })
        .then(async (res) => {
          if (!res) [
            status = 400
          ]
          await Device.findOne({ name: name, organization: res._id })
            .then((res) => {
              if (!res) {
                console.log(`Organization doesn't exist: ${res}`)
                return res.status(400)
              } else {
                console.log(`Success! ${res}`)
                status = 200
              }
            })
            .catch((err) => {
              console.log(err)
              status = 400
            })
        })
        .catch((err) => {
          console.log(err)
          status = 400
        })
      return res.status(status)
    }
  )
}

