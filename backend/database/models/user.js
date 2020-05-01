const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const url = `${process.env.PROTOCOL}://${process.env.HOST_NAME}:${process.env.PORT}/`;

const userSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        required: true,
        unique: true},
    password: {
        type: String,
        required: true,
        select: false // loai field password ra khoi tat ca cac query default.
    },
    name: {
        type: String,
        required: true
    },
    /**
     * level of account
     * 0: admin, 1: staff, 2: tutor, 3: student
     */
    level: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    activeAt: {
        type: Date
    },
    avatar: {
        type: String,
        default: url + "uploads/sample.png"
    },
});

module.exports = mongoose.model('User', userSchema);
