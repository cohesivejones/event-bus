const Product = require('../models');

const sendCallback = (error, result) => {
  if (error) {
    console.err('Failed to send event', error);
  } else {
    console.log('Sent event', result);
  }
}

const productCreated = (id) => {
  return [{
    topic: 'PRODUCTS',
    messages: JSON.stringify({ event: 'PRODUCT_CREATED', id})
  }];
}

const productDeleted = (id) => {
  return [{
    topic: 'PRODUCTS',
    messages: JSON.stringify({ event: 'PRODUCT_DELETED', id})
  }];
}

exports.create = (producer) => {
  return async function (req, res, next) {
    try {
      const {name, price} = req.body
      let product = new Product({ name, price });
      product = await product.save()
      producer.send(productCreated(product._id), sendCallback);
      res.send(product);
      next();
    } catch (err) {
      next(err);
    }
  };
};

exports.all = function (req, res, next) {
  Product.find({}, function (err, products) {
    if (err) return next(err);
    res.send(products);
  })
};

exports.get = function (req, res, next) {
  Product.findById(req.params.id, function (err, product) {
    if (err) return next(err);
    res.send(product);
  })
};

exports.update = function (req, res, next) {
  Product.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, product) {
    if (err) return next(err);
    res.send('Product udpated successfully');
  });
};

exports.delete = (producer) => async function (req, res, next) {
    try {
      const id = req.params.id;
      await Product.findByIdAndRemove(id);
      producer.send(productDeleted(id), sendCallback);
      res.send('Product deleted successfully');
      next();
    } catch (err) {
      next(err);
    }
};
