const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const kafka = require('./config/kafka');
require('./config/mongo');

const APP_PORT = 4000;
const APP_NAME = "PRODUCTS"

async function start() {
  const client = kafka.client();
  const producer = await kafka.producer(client);

  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));
  app.use('/products', routes(producer));
  app.listen(APP_PORT, () => console.log(`${APP_NAME} listening on port ${APP_PORT}!`));
}

start();
