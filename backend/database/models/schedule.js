const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    createdBy: {
        type: String,
        required: true,
        ref: 'User'
    },
    classroom: {
        type: String,
        required: true,
        ref: 'Class'
    },
    /**
     * list of date that classroom
     */
    listDate: [{
        type: Date,
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
    }
});

module.exports = mongoose.model('Schedule', scheduleSchema);
