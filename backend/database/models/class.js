const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const classSchema = new Schema({
    _id : mongoose.Schema.Types.ObjectId,
    title: {type: String,
        required: true
    },
    studentId: {
        type: String,
        required: true,
        ref: 'User'
    },
    tutorId: {
        type: String,
        required: true,
        ref: 'User'
    },
    startDate: Date,
    endDate: Date
});

module.exports = mongoose.model('Class', classSchema);
