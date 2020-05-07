const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const File = require('../database/models/file');
const User = require('../database/models/user');
const Classroom = require('../database/models/classroom');
const fs = require('fs');
const path = require('path');

/**
 * https://github.com/expressjs/multer
 * @type {multer}
 */
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const pathDownload = path.join(__dirname, '../uploads/files/' + req.userData._id + '/')
        if (!fs.existsSync(pathDownload)) {
            // create folder if not exist
            fs.mkdirSync(pathDownload);
        }
        return cb(null, pathDownload)
    },
    filename: function (req, file, cb) {
        return cb(null, Date.now() + '-' + file.originalname);
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
    let searchCondition = {
        _id: classroomId,
    };

    if (userExist.level !== 0 && userExist.level !== 1) {
        // if not admin or staff
        // => student or tutor => filter class
        searchCondition.$or = [
            {tutor: userId},
            {student: userId}
        ];
    }

    const findClass = await Classroom.findOne(searchCondition).exec();

    if (!findClass) {
        return res.json({
            message: 'Classroom does not invalid',
            data: [],
        })
    }

    const allFile = await File.find({
        classroom: classroomId
    });

    return res.json({
        message: 'List files in classroom!',
        data: allFile
    })
});

/**
 * Search files
 */
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

/**
 * Create files
 */
router.post('/create', checkAuth, upload.single('file'), async (req, res) => {
    const byUser = req.userData._id;
    const classroom = req.body.classroom;

    const classroomExist = await Classroom.findOne({
        _id: classroom
    }).exec()

    if (!classroomExist) {
        return res.json({
            message: 'Classroom does not exist!'
        })
    }

    const newFile = await new File({
        name: req.file.originalname,
        url: '/uploads/files/' + req.userData._id + '/' + req.file.filename,
        type: req.file.mimetype,
        size: req.file.size,
        classroom,
        byUser
    });

    const saved = await newFile.save();

    if (!saved) {
        return res.json({
            message: 'saved fail'
        });
    }
    return res.json({
        message: 'File save successfully!',
        data: newFile
    });

});

/**
 * download file
 */
router.get('/download/:fileId/:classId',
    async (req, res) => {
        const fileId = req.params.fileId;
        const classroomId = req.params.classId;

        const checkClassroom = await Classroom.findOne({
            _id: classroomId,
        }).populate('student tutor').exec();

        if (!checkClassroom) {
            return res.status(404).json({
                message: 'File dont exist!'
            })
        }

        const checkFile = await File.findOne({
            _id: fileId,
            classroom: classroomId,
        }).exec();

        if (!checkFile) {
            return res.status(404).json({
                message: 'File dont exist!'
            })
        }

        const pathFile = path.join(__dirname, '..' + checkFile.url);
        return res.download(pathFile, checkFile.name);
    }
)

module.exports = router;
