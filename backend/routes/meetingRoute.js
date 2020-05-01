const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const Meeting = require('../database/models/meeting');
const Classroom = require('../database/models/classroom');
const User = require('../database/models/user');
const moment = require('moment')

/**
 * take all meeting from classroom
 */
router.post('/', async (req, res) => {
    const classroomExist = await Classroom.findOne({
        _id: req.body.classId
    }).exec()

    if (!classroomExist) {
        return res.json({
            message: 'classroom does not exist'
        })
    }

    const meeting = await Meeting.find({
        classId: req.body.classId
    }).exec()

    if (!meeting) {
        return res.json({
            message: 'no meeting was founded!'
        })
    }
    return res.json({
        message: 'Meeting founded!',
        data: meeting
    })
});

/**
 * take meeting info
 */
router.post('/view', (req, res) => {
    const meetingId = req.body.meetingId;

    Meeting.findOne({
        _id: meetingId
    }).exec()
        .then(meeting => {
            if (!meeting) {
                return res.json({
                    message: 'No meeting founded'
                })
            }
            return res.json({
                message: 'meeting founded!',
                data: meeting
            })
        })
        .catch(err => {
            return res.status(500).json({
                message: 'SKY FALL',
                error: err
            })
        })
});

/**
 * Create meeting
 */
router.post('/create', checkAuth, async (req, res) => {
    const createdBy = req.userData._id;
    const {title, description, classroom, address, time} = req.body;

    const userExist = await User.findOne({
        _id: createdBy.toString()
    }).exec()

    if(!userExist){
        return res.json({
            message: 'There was a thief get in the house!'
        })
    }

    const classroomExist = await Classroom.findOne({
        _id: classroom.toString()
    }).exec()

    if(!classroomExist){
        return res.json({
            message: 'Cant found classroom!'
        })
    }

    if(!title || typeof title !== 'string' || title.length === 0){
        return res.json({
            message: 'title invalid'
        })
    }

    if(!address || typeof address !== 'string' || address.length === 0){
        return res.json({
            message: 'address invalid'
        })
    }

    if(!time){
        return res.json({
            message: 'time need input'
        })
    }

    const timeParser = moment(String(time), 'x');
    const now = moment(String(Date.now), 'x');

    if(!timeParser.isValid()){
        return res.json({
            message: 'time invalid'
        })
    }

    if(timeParser.isBefore(now)){
        return res.json({
            message: 'time cannot happen before now'
        })
    }

    const meeting = new Meeting({
        title,
        description,
        createdBy,
        classroom,
        address,
        time
    });

    meeting.save()
        .then(result => {
            return res.json({
                message: 'meeting created!',
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

/**
 * Update meeting
 */
router.post('/update/:classId', (req, res) => {
    const meetingId = req.params.meetingId;
    const updateOps = {...req.body};

    Meeting.update({
        _id: meetingId
    }, {$set: {
            updateOps,
            updatedAt: Date.now
        }
    })
        .exec()
        .then(result => {
            return res.json({
                message: 'meeting updated',
                data: result
            });
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({
                message: 'SKY FALL',
                error: err
            });
        });
});

/**
 * Delete meeting
 */
router.post('/delete/:meetingId', (req, res) => {
    const meetingId = req.params.meetingId;

    Meeting.remove({_id: meetingId})
        .exec()
        .then(result => {
            return res.json({
                message: 'meeting was deleted',
            });
        })
        .catch(err => {
            return res.status(500).json({
                message: 'SKY FALL',
                error: err,
            })
        });
});

module.exports = router;
