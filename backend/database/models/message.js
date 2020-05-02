const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const message = new Schema({
    classroom: {
        type: String,
        required: true,
        ref: 'Classroom'
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
