const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const message = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    classId: {
        type: String,
        required: true,
        ref: 'Class'
    },
    // link with userId
    byUser: {
        type: String,
        required: true,
        ref: 'User'
    },
    createdAt: Date,
    file: {
        type: String,
        ref: 'File'
    }
});

module.exports = mongoose.model('Message', message);
