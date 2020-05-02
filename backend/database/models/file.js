const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const file = new Schema({
    /**
     * files name
     */
    name: {
        type: String,
        required: true
    },
    /**
     * files url
     */
    url: {
        type: String,
        required: true
    },
    /**
     * files of classroom
     */
    classroom: {
        type: String,
        required: true,
        ref: 'Classroom'
    },
    /**
     * up by user
     */
    byUser: {
        type: String,
        required: true,
        ref: 'User'
    },
    type: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    }
});

module.exports = mongoose.model('File', file);
