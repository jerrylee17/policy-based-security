const cluster = require('cluster');
const express = require('express');
const keys = require('./config/keys');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// mongodb setup
mongoose.connect(keys.mongoURI,  { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=> console.log("mongodb connect success"))
.catch(err => console.log(err));

// import models
require('./models/Organization');
require('./models/Device');
require('./models/Policy');

if (cluster.isMaster) {
  cluster.fork();
  cluster.fork();
} else {
  const app = express();
  app.use(bodyParser.json());
  app.use(cors());
  app.get('/policy-manager/test-service', (req, res) => {
    res.send('Hello world');
  });
  // import routes
  require('./routes/organizationRoutes')(app);
  require('./routes/deviceRoutes')(app);
  require('./routes/policyRoutes')(app);

  const PORT = keys.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Listening on port`, PORT);
  });
}