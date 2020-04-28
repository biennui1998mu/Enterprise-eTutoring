const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const meeting = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true
    },
    classId: {
        type: String,
        required: true
    },
    address: String,
    date: Date,
    description: String
});

module.exports = mongoose.model('Meeting', meeting);
