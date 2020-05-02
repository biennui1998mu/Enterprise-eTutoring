const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');
const User = require('../database/models/user');

/**
 * https://github.com/expressjs/multer
 * @type {multer}
 */
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './uploads/image');
    },
    filename: function (req, file, cb) {
        return cb(null, file.originalname + Date.now);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        return cb(null, true);
    } else {
        return cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

/**
 * take all tutor and student from database
 * only staff can view
 */
router.post('/', checkAuth, async (req, res) => {
    const idUserLogin = req.userData._id;

    const checkUser = await User.findOne({
        _id: idUserLogin
    }).exec()

    if (!checkUser) {
        return res.json({
            message: 'User is a thief'
        })
    }

    if (checkUser.level !== 1) {
        return res.json({
            message: 'User is not one of staff'
        })
    }

    const listUser = await User.find({
        $and: [
            {level: 3},
            {level: 4}
        ]
    }).exec()

    if (!listUser) {
        return res.json({
            message: 'No user found',
        });
    }

    return res.json({
        message: 'List tutor and student',
        data: listUser
    })
});

/**
 * take my info
 */
router.post('/view', checkAuth, (req, res) => {
    const userId = req.userData._id;

    User.findOne({
        _id: userId
    })
        .exec()
        .then(user => {
            if (!user) {
                return res.json({
                    message: 'No user found by id'
                })
            }
            return res.json({
                message: 'Hello!',
                data: user
            })
        })
        .catch(err => {
            return res.status(500).json({
                message: 'SKY FALL',
                error: err
            })
        })
});

/**
 * Search user by username or name
 * only staff
 */
router.post('/search', checkAuth, async (req, res) => {
    const input = req.body.input;

    try {
        const users = await User.find({
            $or: [
                {username: new RegExp(input)},
                {name: new RegExp(input)}
            ]
        }).limit(10).exec();

        if (!users || users.length === 0) {
            return res.json({
                message: 'no user founded!',
                data: []
            });
        }
        return res.json({
            message: 'founded users',
            data: users
        });
    } catch (e) {
        return res.status(500).json({
            message: 'SKY FALL',
            data: []
        });
    }
});

/**
 * sign up
 */
router.post('/signup', upload.single('avatar'), async (req, res) => {
    const {username, password, name, level} = req.body;

    const checkUser = await User.find({
        username: username
    }).exec()

    if (checkUser || checkUser.length >= 1) {
        return res.json({
            message: 'username exist!'
        })
    }

    if(!username || typeof username !== 'string' || username.length === 0){
        return res.json({
            message: 'username invalid'
        })
    }

    if(!name || typeof name !== 'string' || name.length === 0){
        return res.json({
            message: 'name invalid'
        })
    }

    if(!level){
        return res.json({
            message: 'level invalid'
        })
    }

    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err
            })
        } else {
            const newUser = new User({
                username,
                password: hash,
                name,
                level
            });
            newUser.save()
                .then(result => {
                    return res.json({
                        message: 'user created!',
                        data: result
                    })
                        .catch(err => {
                            res.status(500).json({
                                message: 'SKY FALL',
                                error: err
                            })
                        })
                })
        }
    });
});

/**
 * sign in
 */
router.post('/signin', async (req, res) => {
    const {username, password} = req.body;

    const user = await User.findOne({
        username: username
    })
        // chi dinh print field bi hidden by default trong schema.
        .select('+password')
        .exec();

    if (!user) {
        return res.json({
            message: 'No user found'
        });
    }

    const validatePassword = await bcrypt.compare(password, user.password);

    if (!validatePassword) {
        return res.json({
            message: 'password is not valid'
        });
    }

    const myAccount = user.toObject();
    delete myAccount.password;
    delete myAccount.__v;

    const token = jwt.sign({
            _id: user._id,
            username: user.username,
            name: user.name
        },
        process.env.JWT_KEY,
        {
            expiresIn: 604800
        });

    await User.updateOne({
        username: username
    }, {
        $set: {
            activeAt: Date.now
        }
    }).exec();

    return res.json({
        message: 'Login successfully',
        token: token,
        data: myAccount
    });
});

/**
 * Update user
 */
router.post('/update/:userId', (req, res) => {
    const userId = req.params.userId;
    const updateOps = {...req.body};

    User.update({
        _id: userId
    }, {$set: {
            updateOps,
            updatedAt: Date.now
        }
    })
        .exec()
        .then(result => {
            return res.json({
                message: 'User updated',
                data: result
            });
        })
        .catch(err => {
            return res.json({
                message: 'SKY FALL',
                error: err
            });
        });
});

/**
 * Delete user
 */
router.post('/delete/:userId', (req, res) => {
    const userId = req.params.userId;
    User.remove({_id: userId})
        .exec()
        .then(result => {
            return res.json({
                message: 'User was deleted',
            });
        })
        .catch(err => {
            return res.json({
                message: 'SKY FALL',
                error: err,
            })
        });
});

module.exports = router;





