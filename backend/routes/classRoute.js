const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const Classroom = require('../database/models/classroom');
const User = require('../database/models/user')

/**
 * take all classroom exist from database
 */
router.post('/', checkAuth, async (req, res) => {
    const idUserLogin = req.userData._id;

    const checkUser = await User.findOne({
        _id: idUserLogin
    }).exec()

    if (!checkUser || checkUser.level !== 1) {
        return res.json({
            message: 'User is not have enough ability to view all classroom || ' +
                'it\'s mean user is not a staff'
        })
    }

    const listClass = await Classroom.find().exec()

    if (!listClass) {
        return res.json({
            message: 'No classroom found',
        });
    }

    return res.json({
        message: 'List classroom',
        data: listClass
    })
});

/**
 * take classroom info
 */
router.post('/view', (req, res) => {
    const classroomId = req.body.classroomId;

    Classroom.findOne({
        _id: classroomId
    })
        .exec()
        .then( classroom => {
            if (!classroom) {
                return res.json({
                    message: 'No classroom found by id'
                })
            }
            return res.json({
                message: 'classroom info!',
                data: classroom
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
 * Search classroom by title
 */
router.post('/search', async (req, res) => {
    const input = req.body.input;

    try {
        const listClass = await Classroom.find({
            title: input
        }).limit(10).exec();

        if (!listClass || listClass.length === 0) {
            return res.json({
                message: 'no classroom founded!',
                data: []
            });
        }
        return res.json({
            message: 'classroom founded!',
            data: listClass
        });
    } catch (e) {
        return res.status(500).json({
            message: 'SKY FALL',
            data: []
        });
    }
});

/**
 * Create classroom
 */
router.post('/create', checkAuth, async (req, res) => {
    const {title, description, student, tutor} = req.body;

    if (!title || typeof title !== 'string' || title.length === 0) {
        return res.json({
            message: 'title invalid!'
        })
    }

    let studentExist = await User.findOne({
        $and: [
            {_id: student.toString()},
            {level: 3}
        ]
    })
    if (!student || typeof student !== 'string' || student.length === 0 || !studentExist) {
        return res.json({
            message: 'student invalid!'
        })
    }

    let tutorExist = await User.findOne({
        $and: [
            {_id: tutor.toString()},
            {level: 2}
        ]
    })
    if (!tutor || typeof tutor !== 'string' || tutor.length === 0 || !tutorExist) {
        return res.json({
            message: 'tutor invalid!'
        })
    }

    const classroom = new Classroom({
        title,
        description,
        student,
        tutor
    });
    classroom.save()
        .then(result => {
            return res.json({
                message: 'a classroom has been create!',
                data: result
            });
        })
        .catch(err => {
            res.status(500).json({
                message: 'SKY FALL',
                error: err
            });
        });
});

/**
 * Update classroom
 */
router.post('/update/:classId', (req, res) => {
    const classId = req.params.classId;
    const updateOps = {...req.body};

    Classroom.update({
        _id: classId
    }, {
        $set: {
            updateOps,
            updatedAt: Date.now
        }
    })
        .exec()
        .then(result => {
            return res.json({
                message: 'Class updated',
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
 * Delete classroom
 */
router.post('/delete/:classId', (req, res) => {
    const classroomId = req.params.classroomId;
    Classroom.remove({_id: classroomId})
        .exec()
        .then(result => {
            return res.json({
                message: 'Class was deleted',
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





