const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const file = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    url: String,
    type: String,
    createdAt: Date,
    updatedAt: Date
});

module.exports = mongoose.model('File', file);
