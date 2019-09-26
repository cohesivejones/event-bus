const express = require('express');
const router = express.Router();
const controller = require('../controllers');

const routes = (producer) => {
  const router = express.Router();
  router.post('/create', controller.create(producer));
  router.get('/', controller.all);
  router.get('/:id', controller.get);
  router.put('/:id/update', controller.update);
  router.delete('/:id/delete', controller.delete);
  return router;
}

module.exports = routes;
