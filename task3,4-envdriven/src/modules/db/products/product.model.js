const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        min: 1,
        require: true
    },
    price: {
        type: Number,
        min: 1,
        require: true
    },
    description: String,
    stock: {
        type: Number,
        default: 0
    },
    product_type: {
        type: String,
        enum: ['clothing', 'electronics', 'groceries'],
        require: true
    },
    image: String
}, {
    timestamps: true,
    autoCreate: true,
    autoIndex: true
})

const ProductModel = mongoose.model('Product', ProductSchema);

module.exports = ProductModel