const mongoose = require('mongoose');
const counterSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    sequence_value: {
        type: Number,
    }

});

const counterModel = mongoose.model('Counters', counterSchema);

module.exports = counterModel;