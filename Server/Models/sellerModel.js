const mongoose = require('mongoose');
const sellerSchema = new mongoose.Schema({
    company_name: {
        type: String,
        required: true,
        min: 1,
        max: 256
    },
    email: {
        type: String,
        required: true,
        max: 256
    },

    business_type: {
        type: String,
        required: true,
        min: 1,
        max: 256
    },
    account_type: {
        type: String,
        required: true,
        min: 1,
        max: 256
    },
    contact: {
        type: String,
        required: true,
        min: 1,
        max: 256
    },
    created_At: {
        type: Number,
        default: Date.now()
    }
});

const sellerModel = mongoose.model('Sellers', sellerSchema);

module.exports = sellerModel;