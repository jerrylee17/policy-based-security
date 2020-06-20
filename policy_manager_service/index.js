const cluster = require('cluster');
const express = require('express');
const keys = require('./config/keys');
const bodyParser = require('body-parser');
const cors = require('cors');

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

      const PORT = keys.PORT || 5000;
      app.listen(PORT, () => {
        console.log(`Listening on port`, PORT);
      });
  }