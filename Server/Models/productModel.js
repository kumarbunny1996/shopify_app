const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    seller_email: {
        type: String,
        required: true,
        min: 1,
        max: 256
    },
    item_name: {
        type: String,
        required: true,
        min: 1,
        max: 256
    },
    brand_name: {
        type: String,
        required: true,
        max: 256
    },
    category: {
        type: String,
        required: true,
    },

    price: {
        type: String,
        required: true,
        min: 1,
        max: 10
    },
    quantity: {
        type: String,
        required: true,
        min: 1,
        max: 10
    },
    max_quantity: {
        type: String,
        required: true,
        min: 1,
        max: 10
    },
    shipping_cost: {
        type: String,
        required: true,
        min: 1,
        max: 10
    },
    features: {
        type: String,
        required: true,
        min: 1,
        max: 256
    },
    description: {
        type: String,
        required: true,
        min: 1,
        max: 1056
    },
    image: {
        type: Buffer,
        required: true
    },
    created_At: {
        type: Number,
        default: Date.now()
    }
});

const productModel = mongoose.model('Products', productSchema);

module.exports = productModel;