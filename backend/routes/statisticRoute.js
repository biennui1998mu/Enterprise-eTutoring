const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const User = require('../database/models/user');
const Classroom = require('../database/models/classroom');

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

    const message = await Classroom.find({
        classroom: classroom
    }).exec();

    const file = await Classroom.find({
        classroom: classroom
    }).exec();

    return res.json({
        message: 'statistic for tutor dashboard',
        data: {classroom, message, file}
    })

})


module.exports = router;





