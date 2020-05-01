const express = require('express');
const router = express.Router();
const Class = require('../database/models/class');

// take all user from list user
router.post('/', (req, res) => {
    Class.find()
        .exec()
        .then( allClass => {
            if (allClass.length >= 1) {
                const response = {
                    count: allClass.length,
                    users: allClass.map(user => {
                        return {
                            _id: allClass._id,
                            title: allClass.title,
                            studentId: allClass.studentId,
                            tutorId: allClass.tutorId,
                            startDate: allClass.startDate,
                            endDate: allClass.endDate
                        }
                    })
                };
                res.status(200).json(response)
            } else {
                res.status(200).json({
                    message: 'No class found',
                })
            }

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'No class found',
                error: err,
            })
        })
});

// take class info
router.post('/view', (req, res) => {
    const id = req.body.classId;

    Class.findById(id)
        .exec()
        .then( aClass => {
            if (aClass) {
                return res.status(200).json(aClass)
            } else {
                return res.status(404).json({
                    message: 'No Class found by id'
                })
            }
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({
                error: err
            })
        })
});

// Search class
router.post('/search', async (req, res) => {
    const input = req.body.title;

    try {
        const listClass = await Class.find({
            title: input
        }).limit(10).exec();

        if (!listClass || listClass.length === 0) {
            return res.json([]);
        }

        return res.json(listClass);
    } catch (e) {
        console.log(e);
        return res.status(500).json([]);
    }
});

// Create class
router.post('/create', (req, res) => {
    const aClass = new Class({
        title: req.body.title,
        studentId: req.body.studentId,
        tutorId: req.body.tutorId,
        startDate: Date.now(),
        endDate: req.body.endDate
    });
    aClass.save()
        .then(result => {
            console.log(result);
            return res.status(200).json({
                title: result.title,
                studentId: result.studentId,
                tutorId: result.tutorId,
                startDate: result.startDate,
                endDate: result.endDate
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

// Update class
router.post('/update/:classId', (req, res) => {
    const id = req.params.classId;
    const updateOps = {...req.body};

    // console.log(updateOps);

    Class.update({_id: id}, {$set: updateOps})
        .exec()
        .then(result => {
            console.log(result);
            return res.status(200).json({
                message: 'Class updated',
            });
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({
                Error: err
            });
        });
});

// Delete class
router.post('/delete/:classId', (req, res, next) => {
    const id = req.params.classId;
    Class.remove({_id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Class was deleted',
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                Error: err,
            })
        });
});

module.exports = router;





