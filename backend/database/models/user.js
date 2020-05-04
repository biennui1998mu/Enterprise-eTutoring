const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const url = `${process.env.PROTOCOL}://${process.env.HOST_NAME}:${process.env.PORT}/`;

const userSchema = new Schema({
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
    deletedAt: {
        type: Date
    }
});

/**
 * https://github.com/ramiel/mongoose-sequence
 */
userSchema.plugin(AutoIncrement, {
    /**
     * required if use reference_fields
     */
    id: 'indicator_seq',


    /**
     * plugin auto create this field in schema
     */
    inc_field: 'indicator',


    /**
     * only increment based on level
     */
    reference_fields: ['level']
});

module.exports = mongoose.model('User', userSchema);
