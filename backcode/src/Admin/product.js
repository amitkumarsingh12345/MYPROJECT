const db = require('../db');
const cartschema = new db.Schema({
    name: String,
    price: Number,
    category: String,
    image: String,
    qty: {
        type: String,
        default: 1
    },
    discription: String
});
const product = new db.model('product',cartschema);
module.exports = product;
