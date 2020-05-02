const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const File = require('../database/models/file');
const User = require('../database/models/user');
const Classroom = require('../database/models/classroom');

/**
 * https://github.com/expressjs/multer
 * @type {multer}
 */
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './uploads/files/')
    },
    filename: function (req, file, cb) {
        return cb(null, file.originalname + Date.now)
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 3
    }
})

/**
 * take all files from classroom
 */
router.post('/', checkAuth, async (req, res) => {
    const userId = req.userData._id;

    const userExist = await User.findOne({
        _id: userId
    }).exec()

    if (!userExist) {
        return res.json({
            message: 'User is not exist in database'
        })
    }

    const classroomId = req.body.classroom;
    const allFile = await File.find({
        classroom: classroomId
    });

    if (allFile.length === 0 || !allFile) {
        return res.json({
            message: 'No files founded',
            data: []
        })
    }
    return res.json({
        message: 'List files in classroom!',
        data: allFile
    })
});

// Search files
router.post('/search', async (req, res) => {
    const input = req.body.input;

    try {
        const listFile = await File.find({
            name: input
        }).limit(10).exec();

        if (listFile.length === 0 || !listFile) {
            return res.json({
                message: 'No files founded',
                data: []
            })
        }

        return res.json({
            message: 'File founded!',
            data: listFile
        });
    } catch (e) {
        return res.status(500).json({
            message: 'SKY FALL',
            data: []
        });
    }
});

// Create files
router.post('/create', upload.single, checkAuth, async (req, res) => {
    const byUser = req.userData._id;
    const classroom = req.body

    const classroomExist = await Classroom.findOne({
        _id: classroom
    }).exec()

    if(!classroomExist){
        return res.json({
            message: 'Classroom does not exist!'
        })
    }

    const newFile = await new File({
        name: req.file.originalname,
        url: req.file.path,
        type: req.file.mimetype,
        classroom,
        byUser
    });

    const saved = await newFile.save();

    if(!saved){
        return res.json({
            message: 'saved fail'
        });
    }
    return res.json({
        message: 'File save successfully!',
        data: newFile
    });

});

module.exports = router;
