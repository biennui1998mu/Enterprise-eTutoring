const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const moment = require('moment');
const Schedule = require('../database/models/schedule');
const Classroom = require('../database/models/classroom');
const User = require('../database/models/user');

/**
 * take all schedule from a classroom in database
 */
router.post('/', async (req, res) => {
    const classId = req.body.classId;

    const classroomExist = await Classroom.findOne({
        _id: classId
    }).exec()

    if (!classroomExist) {
        return res.json({
            message: 'classroom is not exist!'
        })
    }

    Schedule.find({
        classroom: classId
    })
        .exec()
        .then(schedule => {
            return res.json({
                message: 'view schedule!',
                data: schedule
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
 * Create schedule
 */
router.post('/create', checkAuth, async (req, res) => {
    const createdBy = req.userData._id;
    const {title, description, classroom, listDate, startAt, endAt} = req.body;

    let classroomExist = await Classroom.findOne({
        _id: classroom.toString()
    })
    if (!classroomExist || !classroom || typeof classroom !== 'string' || classroom.length === 0) {
        return res.json({
            message: 'Classroom is not valid'
        })
    }

    let userExist = await User.findOne({
        _id: createdBy.toString()
    })
    if (!userExist || !createdBy || typeof createdBy !== 'string' || createdBy.length === 0) {
        return res.json({
            message: 'User is not valid'
        })
    }

    if(!title || typeof title !== 'string' || title.length === 0){
        return res.json({
            message: 'Title is not valid'
        })
    }

    const startAtParser = moment(String(startAt), 'x');
    const endAtParser = moment(String(endAt), 'x');

    if(startAtParser.isValid() && endAtParser.isValid()){
        if(endAtParser.isBefore(startAtParser)){
            return res.json({
                message: 'endAt must after startAt!'
            })
        }
    }

    const schedule = new Schedule({
        title,
        description,
        createdBy,
        classroom,
        listDate,
        startAt,
        endAt
    });

    schedule.save()
        .then(result => {
            return res.json({
                message: 'schedule created!',
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
router.post('/update/:scheduleId', (req, res) => {
    const scheduleId = req.params.scheduleId;
    const updateOps = {...req.body};

    Schedule.update({
        _id: scheduleId
    }, {$set: {
            updateOps,
            updatedAt: Date.now
        }
    })
        .exec()
        .then(result => {
            return res.json({
                message: 'schedule updated',
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
router.post('/delete/:scheduleId', (req, res) => {
    const scheduleId = req.params.scheduleId;

    Schedule.remove({_id: scheduleId})
        .exec()
        .then(result => {
            return res.json({
                message: 'Schedule was deleted',
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
