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
    created_At: {
        type: Number,
        default: Date.now()
    }
});

const userModel = mongoose.model('Users', userSchema);

module.exports = userModel;