const express = require('express');
const router = express.Router();
const File = require('../database/models/file');

// take all file from list user
router.post('/', (req, res) => {
    File.find()
        .exec()
        .then( allFile => {
            if (allFile.length >= 1) {
                const response = {
                    count: allFile.length,
                    users: allFile.map(user => {
                        return {
                            _id: allFile._id,
                            name: allFile.name,
                            type: allFile.type,
                            createdAt: allFile.createdAt,
                            updatedAt: allFile.updatedAt
                        }
                    })
                };
                res.status(200).json(response)
            } else {
                res.status(200).json({
                    message: 'No file found',
                })
            }

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'No file found',
                error: err,
            })
        })
});

// take file info
router.post('/view', (req, res) => {
    const id = req.body.fileId;

    File.findById(id)
        .exec()
        .then( file => {
            if (file) {
                return res.status(200).json(file)
            } else {
                return res.status(404).json({
                    message: 'No file found by id'
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

// Search file
router.post('/search', async (req, res) => {
    const input = req.body.name;

    try {
        const listFile = await File.find({
            name: input
        }).limit(10).exec();

        if (!listFile || listFile.length === 0) {
            return res.json([]);
        }

        return res.json(listFile);
    } catch (e) {
        console.log(e);
        return res.status(500).json([]);
    }
});

// Create file
router.post('/create', (req, res) => {
    const file = new File({
        name: req.body.name,
        type: req.body.type,
        createdAt: Date.now(),
        updatedAt: req.body.updatedAt
    });
    file.save()
        .then(result => {
            console.log(result);
            return res.status(200).json({
                name: result.name,
                type: result.type,
                createdAt: result.createdAt,
                updatedAt: result.updatedAt
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});


module.exports = router;
