const express = require('express');
const controller = require('../controllers');

const routes = (producer) => {
  const router = express.Router();
  router.get('/', controller.all);
  return router;
}

module.exports = routes;
