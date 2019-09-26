const Catalog = require('../models');

exports.all = function (req, res, next) {
  Catalog.find({}, function (err, catalogs) {
    if (err) return next(err);
    res.send(catalogs);
  })
};
