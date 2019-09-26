const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CatalogSchema = new Schema({
    product_id: {type: String, required: true},
});

module.exports = mongoose.model('Catalog', CatalogSchema);
