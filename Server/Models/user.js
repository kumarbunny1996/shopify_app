const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 5,
        max: 256
    },
    mobile: {
        type: String,
        required: true,
        max: 10
    },
    email: {
        type: String,
        required: true,
        max: 256
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 1024
    },
    cart: {
        type: Array,
    },
    saved_items: {
        type: Array,
    },
    orders: {
        type: Array,
    },
    cancelledOrders: {
        type: Array,
    },
    delivery_address: {
        type: Array,
    },
    single_item: {
        type: Array,
    },
    address: {
        name: {
            type: String,
            max: 256,
        },
        street: {
            type: String,
            max: 1024,
        },
        township: {
            type: String,
            max: 256,
        },
        state: {
            type: String,
        },
        country: {
            type: String,
        },
        pin_code: {
            type: String,
            max: 8,
        },
        shipping_cost: {
            type: String,
        }
    },
    created_At: {
        type: Number,
        default: Date.now()
    }
});

const userModel = mongoose.model('Users', userSchema);

module.exports = userModel;