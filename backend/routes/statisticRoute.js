const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const checkAdmin = require('../middleware/check-admin');

const Classroom = require('../database/models/classroom');
const File = require('../database/models/file');
const Message = require('../database/models/message');
const User = require('../database/models/user');

/**
 * admin dashboard
 * staff: 1
 * tutor: 2
 * student: 3
 */
router.post('/admin/staff', checkAuth, checkAdmin, async (req,res)=> {
    const staffId = req.body.staffId;

    if(staffId.level !== 1 && staffId.level !== 0){
        return res.json({
            message: 'calling 911!',
        })
    }
    const totalStaff = await User.find({level: 1}).exec();
    const totalTutor = await User.find({level: 2}).exec();
    const totalStudent = await User.find({level: 3}).exec();

    const totalMessage = await Message.find().populate('classroom byUser quote').exec();
    const message7days = await Message.find({
        createdAt: {
            $gte: new Date((new Date().getTime() - (7 * 24 * 60 * 60 * 1000)))
        }
    }).sort({ createdAt : -1 })

    const totalClassroom = await Classroom.find().populate('student tutor createdBy').exec();
    const classroom7days = await Classroom.find({
        createdAt: {
            $gte: new Date((new Date().getTime() - (7 * 24 * 60 * 60 * 1000)))
        }
    }).sort({ createdAt : -1 })

    const totalFile = await File.find().populate('classroom byUser').exec();

    return res.json({
        message: 'All statistic for staff dashboard retrieve successfully',
        data: {totalStaff, totalTutor, totalStudent, totalMessage, message7days, totalClassroom, classroom7days, totalFile}
    })
})

router.post('/admin/tutor', checkAuth, checkAdmin, async (req,res)=> {
    const tutorId = req.body.tutorId;

    const classroom = await Classroom.find({
        tutor: tutorId
    }).populate('student createdBy').exec();

    const message = await Message.find({
        byUser: tutorId
    }).populate('classroom quote').exec();

    const file = await File.find({
        byUser: tutorId
    }).populate('classroom').exec();


    return res.json({
        message: 'statistic for tutor dashboard retrieve successfully',
        data: {classroom, message, file}
    })
})

router.post('/admin/student', checkAuth, checkAdmin, async (req,res)=> {
    const studentId = req.body.studentId;

    const classroom = await Classroom.find({
        student: studentId
    }).populate('tutor createdBy').exec();

    const message = await Message.find({
        byUser: studentId
    }).populate('classroom quote').exec();

    const file = await File.find({
        byUser: studentId
    }).populate('classroom').exec();

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
    }).populate('student createdBy').exec();

    const message = await Message.find({
        byUser: req.userData._id
    }).populate('classroom quote').exec();

    const file = await File.find({
        byUser: req.userData._id
    }).populate('classroom').exec();


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
    }).populate('tutor createdBy').exec();

    const message = await Message.find({
        byUser: req.userData._id
    }).populate('classroom quote').exec();

    const file = await File.find({
        byUser: req.userData._id
    }).populate('classroom').exec();

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
    if(req.userData.level !== 1 && req.userData.level !== 0){
        return res.json({
            message: 'calling 911!',
        })
    }
    const totalStaff = await User.find({level: 1}).exec();
    const totalTutor = await User.find({level: 2}).exec();
    const totalStudent = await User.find({level: 3}).exec();

    const totalMessage = await Message.find().populate('classroom byUser quote').exec();
    const message7days = await Message.find({
        createdAt: {
            $gte: new Date((new Date().getTime() - (7 * 24 * 60 * 60 * 1000)))
        }
    }).sort({ createdAt : -1 })

    const totalClassroom = await Classroom.find().populate('student tutor createdBy').exec();
    const classroom7days = await Classroom.find({
        createdAt: {
            $gte: new Date((new Date().getTime() - (7 * 24 * 60 * 60 * 1000)))
        }
    }).sort({ createdAt : -1 })

    const totalFile = await File.find().populate('classroom byUser').exec();

    return res.json({
        message: 'All statistic for staff dashboard retrieve successfully',
        data: {totalStaff, totalTutor, totalStudent, totalMessage, message7days, totalClassroom, classroom7days, totalFile}
    })
})

module.exports = router;





