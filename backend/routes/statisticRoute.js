const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const checkAdmin = require('../middleware/check-admin');

const Classroom = require('../database/models/classroom');
const File = require('../database/models/file');
const Message = require('../database/models/message');

/**
 * admin dashboard
 * staff: 1
 * tutor: 2
 * student: 3
 */
router.post('/admin/staff', checkAuth, checkAdmin, async (req,res)=> {
    const staffId = req.body.staffId;

    const classroom = await Classroom.find({
        createdBy: staffId
    }).populate('student tutor').exec();

    const message = await Message.find({
        classroom: classroom._id
    }).populate('byUser').exec();

    const file = await File.find({
        classroom: classroom._id
    }).populate('byUser').exec();

    return res.json({
        message: 'statistic for staff dashboard retrieve successfully',
        data: {classroom, message, file}
    })
})

router.post('/admin/tutor', checkAuth, checkAdmin, async (req,res)=> {
    const tutorId = req.body.tutorId;

    const classroom = await Classroom.find({
        tutor: tutorId
    }).populate('student tutor').exec();

    const message = await Message.find({
        classroom: classroom._id
    }).populate('byUser').exec();

    const file = await File.find({
        classroom: classroom._id
    }).populate('byUser').exec();

    return res.json({
        message: 'statistic for tutor dashboard retrieve successfully',
        data: {classroom, message, file}
    })
})

router.post('/admin/student', checkAuth, checkAdmin, async (req,res)=> {
    const studentId = req.body.studentId;

    const classroom = await Classroom.find({
        student: studentId
    }).populate('student tutor').exec();

    const message = await Message.find({
        classroom: classroom._id
    }).populate('byUser').exec();

    const file = await File.find({
        classroom: classroom._id
    }).populate('byUser').exec();

    return res.json({
        message: 'statistic for student dashboard retrieve successfully',
        data: {classroom, message, file}
    })
})

/**{
 * tutor dashboard
 * level: 2
 */
router.post('/tutor', checkAuth, async (req,res)=> {
    if(req.userData.level !== 2){
        return res.json({
            message: 'calling 911, there\'s no tutor like you, you are a thief !!!'
        })
    }

    const classroom = await Classroom.find({
        tutor: req.userData._id
    }).populate('student').exec();

    const message = await Message.find({
        classroom: classroom._id
    }).populate('classroom byUser quote').exec();

    const file = await File.find({
        classroom: classroom._id
    }).populate('classroom byUser').exec();

    return res.json({
        message: 'statistic for tutor dashboard retrieve successfully',
        data: {classroom, message, file}
    })
})

/**{
 * student dashboard
 * level: 3
 */
router.post('/student', checkAuth, async (req,res)=> {
    if(req.userData.level !== 3){
        return res.json({
            message: 'calling 911, there\'s no student like you, you are a thief !!!'
        })
    }

    const classroom = await Classroom.find({
        student: req.userData._id
    }).populate('tutor').exec();

    const message = await Message.find({
        classroom: classroom._id
    }).populate('classroom byUser quote').exec();

    const file = await File.find({
        classroom: classroom._id
    }).populate('classroom byUser').exec();

    return res.json({
        message: 'statistic for student dashboard retrieve successfully',
        data: {classroom, message, file}
    })
})

/**{
 * staff dashboard
 * level: 1
 */
router.post('/staff', checkAuth, async (req,res)=> {
    if(req.userData.level !== 1){
        return res.json({
            message: 'calling 911, there\'s no staff like you, you are a thief !!!'
        })
    }

    const classroom = await Classroom.find({
        createdBy: req.userData._id
    }).populate('student tutor').exec();

    const message = await Message.find({
        classroom: classroom._id
    }).populate('classroom byUser quote').exec();

    const file = await File.find({
        classroom: classroom._id
    }).populate('classroom byUser').exec();

    return res.json({
        message: 'statistic for staff dashboard retrieve successfully',
        data: {classroom, message, file}
    })
})

/**{
 * test dashboard
 * level: 1000
 */
router.post('/all', checkAuth, async (req,res)=> {
    if(req.userData.level === 1){
        const classroom = await Classroom.find({
            createdBy: req.userData._id
        }).populate('student tutor').exec();

        const message = await Message.find({
            classroom: classroom._id
        }).populate('classroom byUser quote').exec();

        const file = await File.find({
            classroom: classroom._id
        }).populate('classroom byUser').exec();

        return res.json({
            message: 'statistic for staff dashboard retrieve successfully',
            data: {classroom, message, file}
        })
    }

    if(req.userData.level === 3){
        const classroom = await Classroom.find({
            student: req.userData._id
        }).populate('tutor').exec();

        const message = await Message.find({
            classroom: classroom._id
        }).populate('classroom byUser quote').exec();

        const file = await File.find({
            classroom: classroom._id
        }).populate('classroom byUser').exec();

        return res.json({
            message: 'statistic for student dashboard retrieve successfully',
            data: {classroom, message, file}
        })
    }

    if(req.userData.level === 2){
        const classroom = await Classroom.find({
            tutor: req.userData._id
        }).populate('student').exec();

        const message = await Message.find({
            classroom: classroom._id
        }).populate('classroom byUser quote').exec();

        const file = await File.find({
            classroom: classroom._id
        }).populate('classroom byUser').exec();

        return res.json({
            message: 'statistic for tutor dashboard retrieve successfully',
            data: {classroom, message, file}
        })
    }
})

module.exports = router;





