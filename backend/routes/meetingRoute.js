const express = require('express');
const router = express.Router();
const Meeting = require('../database/models/meeting');

// take all meeting from class
router.post('/', (req, res) => {
    Meeting.find({classId: req.body.classId})
        .exec()
        .then( meeting => {
            const response = {
                count: meeting.length,
                users: meeting.map(user => {
                    return {
                        _id: meeting._id,
                        title: meeting.title,
                        classId: meeting.classId,
                        address: meeting.address,
                        date: meeting.date,
                        description: meeting.description
                    }
                })
            };
            res.status(200).json(response)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'No meeting found',
                error: err,
            })
        })
});

// take meeting info
router.post('/view', (req, res) => {
    const id = req.body.meetingId;

    Meeting.findById(id)
        .exec()
        .then( meeting => {
            if (meeting) {
                return res.status(200).json(meeting)
            } else {
                return res.status(404).json({
                    message: 'No meeting found by id'
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

// Create meeting
router.post('/create', (req, res) => {
    const meeting = new Meeting({
        title: req.body.title,
        classId: req.body.classId,
        address: req.body.address,
        description: req.body.description,
        date: req.body.date
    });
    meeting.save()
        .then(result => {
            console.log(result);
            return res.status(200).json({
                title: result.title,
                classId: result.classId,
                address: result.address,
                description: result.description,
                date: result.date
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

// Update meeting
router.post('/update/:classId', (req, res) => {
    const id = req.params.meetingId;
    const updateOps = {...req.body};

    Meeting.update({_id: id}, {$set: updateOps})
        .exec()
        .then(result => {
            console.log(result);
            return res.status(200).json({
                message: 'meeting updated',
            });
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({
                Error: err
            });
        });
});

// Delete meeting
router.post('/delete/:meetingId', (req, res, next) => {
    const id = req.params.meetingId;
    Meeting.remove({_id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'meeting was deleted',
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
