const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const kafka = require('./config/kafka');
require('./config/mongo');

const APP_PORT = 4000;
const APP_NAME = "PRODUCTS"

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/products', routes);

app.listen(APP_PORT, () => console.log(`${APP_NAME} listening on port ${APP_PORT}!`));
