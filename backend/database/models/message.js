const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const message = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    classroom: {
        type: String,
        required: true,
        ref: 'Class'
    },
    byUser: {
        type: String,
        required: true,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    quote: {
        type: String,
        ref: 'Message'
    },
    file: {
        type: String,
        ref: 'File'
    }
});

module.exports = mongoose.model('Message', message);
