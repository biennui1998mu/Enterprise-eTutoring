const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const User = require('../database/models/user');
const Classroom = require('../database/models/classroom');
const File = require('../database/models/file');
const Message = require('../database/models/message');

router.post('/tutor', checkAuth, async (req,res)=> {
    const userId = req.userData._id;

    const checkTutor = await User.findOne({
        _id: userId
    }).exec();

    if(!checkTutor){
        return res.json({
            message: 'calling 911, you are a thief !!!'
        })
    }

    if(checkTutor.level !== 2){
        return res.json({
            message: 'calling 911, there\'s no tutor like you, you are a thief !!!'
        })
    }

    const classroom = await Classroom.find({
        tutor: checkTutor
    }).exec();

    const message = await Message.find({
        classroom: classroom._id
    }).exec();

    const file = await File.find({
        classroom: classroom._id
    }).exec();

    return res.json({
        message: 'statistic for tutor dashboard',
        data: {classroom, message, file}
    })

})


module.exports = router;





