const mongoose = require('mongoose')
const Organization = mongoose.model('Organization')
const request = require('request')

module.exports = (app) => {
  app.post('/policy-manager/organization',
    async (req, res) => {
      const newOrganization = new Organization({
        name: req.body.name,
        token: req.body.token
      })
      await Organization.create(newOrganization, (err, entry) => {
        if (err) {
          console.log(err)
          return res.status(400)
        }
        console.log(`Success: ${entry}`)
        return res.json(entry)
      })
    })
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





      // let { name } = req.body
      // const options = {
      //   uri: 'http://13.58.96.116',
      //   port: '8200',
      //   path: `/v1/secret/data/${name}`,
      //   method: 'GET',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'X-Vault-Token': 's.J6cvIW0E5DaMJaRtvZVHTTvk'
      //   }
      // }
      // await request.get('https://13.58.96.116',
      //   (err, resp, body) => {
      //     console.log(`error: ${err}`)
      //     console.log(`response: ${resp}`)
      //     let responseBody = JSON.parse(body)
      //     console.log(`responsebody: ${responseBody}`)