const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const kafka = require('./config/kafka');
require('./config/mongo');

const APP_PORT = 4000;
const APP_NAME = "CATALOGS"

async function start() {
  kafka.service();
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));
  app.use('/catalogs', routes());

  app.listen(APP_PORT, () => console.log(`${APP_NAME} listening on port ${APP_PORT}!`));
}

start();
