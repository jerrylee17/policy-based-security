const cluster = require('cluster');
const express = require('express');
const keys = require('./config/keys');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
// import models
require('./models/Organization');
require('./models/Device');

// mongodb setup
mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, { useNewUrlParser: true })
  .then(() => console.log("mongodb connect success"))
  .catch(err => console.log(err));
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

  const PORT = keys.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Listening on port`, PORT);
  });
}