const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const meeting = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    /**
     * user create meeting
     */
    createdBy: {
        type: String,
        required: true,
        ref: 'User'
    },
    /**
     * from classroom
     */
    classroom: {
        type: String,
        required: true,
        ref: 'Class'
    },
    /**
     * address meeting
     */
    address: {
        type: String,
        required: true
    },
    /**
     * time meeting
     */
    time: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    }
});

module.exports = mongoose.model('Meeting', meeting);
