const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const Message = require('../database/models/message');

// take all message from class
router.post('/', (req, res) => {
    Message.find({classId: req.body.classId})
        .exec()
        .then( meeting => {
            const response = {
                count: meeting.length,
                users: meeting.map(user => {
                    return {
                        _id: meeting._id,
                        title: meeting.title,
                        classId: meeting.classId,
                        startDate: meeting.startDate,
                        endDate: meeting.endDate,
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

// Create message
router.post('/create', checkAuth, (req, res) => {
    const message = new Message({
        classId: req.body.classId,
        byUser: req.userData.userId,
        description: req.body.description,
        createdAt: Date.now(),
        file: req.body.file
    });
    message.save()
        .then(result => {
            console.log(result);
            return res.status(200).json({
                classId: result.classId,
                byUser: result.byUser,
                description: result.description,
                createdAt: result.createdAt,
                file: result.file
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

// Delete meeting
router.post('/delete/:messageId', (req, res) => {
    const id = req.params.messageId;
    Message.remove({_id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'message was deleted',
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
