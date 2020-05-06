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
router.post('/', checkAuth, async (req, res) => {
    const userData = req.userData;
    const classroomExist = await Classroom.findOne({
        _id: req.body.classId,
        $or: [
            {tutor: userData._id},
            {student: userData._id},
        ],
    }).exec();

    if (!classroomExist) {
        return res.json({
            message: 'classroom does not exist'
        })
    }

    const meeting = await Meeting.find({
        classroom: req.body.classId
    }).exec();

    return res.json({
        message: 'Meeting fetched!',
        data: meeting,
    })
});

/**
 * take meeting info
 */
router.post('/view', (req, res) => {
    const meetingId = req.body.meetingId;

    Meeting.findOne({
        _id: meetingId
    }).populate('createdBy classroom')
        .exec()
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

    if (!userExist) {
        return res.json({
            message: 'There was a thief get in the house!'
        })
    }

    const classroomExist = await Classroom.findOne({
        _id: classroom.toString()
    }).exec()

    if (!classroomExist) {
        return res.json({
            message: 'Cant found classroom!'
        })
    }

    if (!title || typeof title !== 'string' || title.length === 0) {
        return res.json({
            message: 'title invalid'
        })
    }

    if (!address || typeof address !== 'string' || address.length === 0) {
        return res.json({
            message: 'address invalid'
        })
    }

    if (!time) {
        return res.json({
            message: 'time need input'
        })
    }

    const timeParser = moment(String(time), 'x');
    const now = moment(String(Date.now), 'x');

    if (!timeParser.isValid()) {
        return res.json({
            message: 'time invalid'
        })
    }

    if (timeParser.isBefore(now)) {
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
router.post('/update/:id', checkAuth, async (req, res) => {
    const meetingId = req.params.id;
    const {title, description, address, time} = req.body;

    try {
        const meetingFind = await Meeting.findById(
            meetingId,
        ).exec();

        if (!meetingFind) {
            return res.json({
                message: 'Not found the meeting!',
            });
        }

        if (title && title.length > 0) {
            meetingFind.title = title;
        }

        if (description && description.length > 0) {
            meetingFind.description = description;
        }

        if (address && address.length > 0) {
            meetingFind.address = address;
        }

        if (time && moment(time).isValid() && moment(time).isBefore(meetingFind.createdAt)) {
            meetingFind.time = time;
        }

        await meetingFind.save();

        return res.json({
            message: 'meeting updated',
            data: meetingFind
        });
    } catch (e) {
        return res.status(500).json({
            message: 'SKY FALL',
            error: e
        });
    }
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
