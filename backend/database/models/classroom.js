const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const classroomSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    student: {
        type: String,
        required: true,
        ref: 'User'
    },
    tutor: {
        type: String,
        required: true,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
    }
});

module.exports = mongoose.model('Classroom', classroomSchema);
