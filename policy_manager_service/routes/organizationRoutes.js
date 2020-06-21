const axios = require('axios');
const mongoose = require('mongoose')
const Organization = mongoose.model('Organization')

module.exports = (app) => {

    app.post('/policy-manager/organization', async (req, res) => {
        const { name } = req.body;
        let header ={
                    headers: {
                    'X-Vault-Token': 's.J6cvIW0E5DaMJaRtvZVHTTvk',
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        await axios.get(`http://13.58.96.116:8200/v1/secret/data/${name}`, header).then(async response=>{
            let organization_token = response.data.data.data["org1"];
            let org = new Organization({ name, organization_token});
            try {
                await org.save();
                res.status(200).send(org);
            } catch (err) {
                res.send(400).send(err);
            }
        });
    });

  app.get('/policy-manager/organization',
    async (req, res) => {
      const {
        name
      } = req.body
      let status;
      await Organization.findOne({ name: name })
        .then((res) => {
          console.log(`Success! ${res}`)
          status = 200
        })
        .catch((err) => {
          console.log(err)
          status = 400
        })
      return res.status(status)
    }
  )
}