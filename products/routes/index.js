const express = require('express');
const router = express.Router();
const controller = require('../controllers');

router.post('/create', controller.create);

router.get('/', controller.all);

router.get('/:id', controller.get);

router.put('/:id/update', controller.update);

router.delete('/:id/delete', controller.delete);

module.exports = router;
