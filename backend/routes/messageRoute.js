const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const Message = require('../database/models/message');
const Classroom = require('../database/models/classroom');
const User = require('../database/models/user');

/**
 * take all message from a classroom in database
 */
router.post('/', (req, res) => {
    Message.find({
        classroom: req.body.classId
    })
        .exec()
        .then( messages => {
            return res.json({
                message: 'classroom\'s message',
                data: messages
            })
        })
        .catch(err => {
            return res.status(500).json({
                message: 'SKY FALL',
                error: err,
            })
        })
});

/**
 * Create message
 */
router.post('/create', checkAuth, async (req, res) => {
    const {classroom, byUser, content, quote, file} = req.body;

    let classroomExist = await Classroom.findOne({
        _id: classroom
    })
    if(!classroomExist || !classroom || typeof classroom !== 'string' || classroom.length === 0){
        return res.json({
            message: 'Classroom is not valid'
        })
    }

    let userExist = await User.findOne({
        _id: byUser
    })
    if(!userExist || !byUser || typeof byUser !== 'string' || byUser.length === 0){
        return res.json({
            message: 'User is not valid'
        })
    }

    if(!content || typeof content !== 'string' || content.length === 0){
        return res.json({
            message: 'content of message invalid'
        })
    }

    const message = new Message({
        classroom,
        byUser,
        quote,
        file
    });

    message.save()
        .then(result => {
            return res.json({
                message: 'message created!',
                data: result
            });
        })
        .catch(err => {
            return res.status(500).json({
                message: 'SKY FALL',
                error: err
            });
        });
});

module.exports = router;
