const Product = require('../models');

exports.create = function (req, res, next) {
  let product = new Product( { name: req.body.name, price: req.body.price });
  product.save(function (err) {
    if (err) return next(err);
    res.send('Product created successfully');
  })
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

exports.delete = function (req, res, next) {
  Product.findByIdAndRemove(req.params.id, function (err) {
    if (err) return next(err);
    res.send('Product deleted successfully');
  })
};
