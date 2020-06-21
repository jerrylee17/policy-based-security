const mongoose = require('mongoose')
const Device = mongoose.model('Device')
const Organization = mongoose.model('Organization')
const request = require('request')

module.exports = (app) => {
  app.post('/policy-manager/device',
    async (req, res) => {
      let status;
      await Organization.findOne({ name: req.body.organization })
        .then(async (org) => {
          if (!org) {
            console.log(`Organization doesn't exist: ${org}`)
            return
          }
          const newDevice = new Device({
            name: req.body.name,
            token: req.body.token,
            organization: org._id
          })
          await Device.create(newDevice, (err, entry) => {
            if (err) {
              console.log(err)
              status = 400
            }
            console.log(`Success: ${entry}`)
            status = 200
          })
        })
        .catch((err) => {
          console.log(`Failed: ${err}`)
          status = 400
        })
      return res.status(status)
    })
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

