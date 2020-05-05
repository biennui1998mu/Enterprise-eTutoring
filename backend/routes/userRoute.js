const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');
const User = require('../database/models/user');
const Classroom = require('../database/models/classroom');
const moment = require('moment');

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
 * take all tutor from database
 * staff/admin can view
 */
router.post('/list', checkAuth, async (req, res) => {
    const idUserLogin = req.userData._id;

    const checkUser = await User.findOne({
        _id: idUserLogin
    }).exec()

    if (!checkUser) {
        return res.json({
            message: 'User is a thief'
        })
    }

    if (checkUser.level !== 1 && checkUser.level !== 0) {
        return res.json({
            message: 'User is not one of staff/admin'
        })
    }

    const listUser = await User.find({
        $or: [
            {level: 1},
            {level: 2},
            {level: 3}
        ],
        _id: {$ne: checkUser._id}
    }).exec()

    if (!listUser) {
        return res.json({
            message: 'Empty!!!'
        })
    }

    return res.json({
        message: 'List user',
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
router.post('/signup', upload.single('avatar'), checkAuth, async (req, res) => {
    if (req.userData.level !== 1) {
        return res.json({
            message: 'You do not have permission to create account!!'
        })
    }

    const {username, password, name, level} = req.body;

    const checkUser = await User.findOne({
        username: username
    }).exec()

    if (checkUser) {
        return res.json({
            message: 'username exist!'
        })
    }

    if (!username || typeof username !== 'string' || username.length === 0) {
        return res.json({
            message: 'username invalid'
        })
    }

    if (!name || typeof name !== 'string' || name.length === 0) {
        return res.json({
            message: 'name invalid'
        })
    }

    if (!level) {
        return res.json({
            message: 'level invalid'
        })
    }

    if (!password && typeof password === 'string' && password.length > 1) {
        return res.json({
            message: 'Password invalid'
        });
    }
    let hashedPassword = undefined;

    // if client send password then update, else skip
    try {
        hashedPassword = await bcrypt.hash(password, 10);
    } catch (e) {
        return res.status(500).json({
            error: e
        })
    }

    const newUser = new User({
        username,
        password: hashedPassword,
        name,
        level
    });

    newUser.save()
        .then(result => {
            return res.json({
                message: 'user created!',
                data: result
            }).catch(err => {
                res.status(500).json({
                    message: 'SKY FALL',
                    error: err
                })
            })
        })
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

    if (user.deletedAt) {
        return res.json({
            message: 'contact staff!'
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
        process.env.JWT_SECRET,
        {
            expiresIn: 604800
        });

    user.activeAt = Date.now()

    try {
        await user.save();
    } catch (e) {
        return res.json({
            message: 'SKY FALL',
            data: null,
            error: e
        });
    }

    return res.json({
        message: 'Login successfully',
        token: token,
        data: myAccount
    });
});

/**
 * Update user
 */
router.post('/update', upload.single('avatar'), checkAuth, async (req, res) => {
    console.log(req);
    const staffId = req.userData._id
    const checkStaff = await User.findOne({
        _id: staffId
    })

    if (!checkStaff) {
        return res.json({
            message: 'Staff dont exist!'
        });
    }

    if (checkStaff.level !== 1) {
        return res.json({
            message: 'You are not Staff!'
        });
    }

    const userId = req.body._id;
    const {username, name, password, activeAt} = req.body;
    // const avatar = req.file.

    const findUser = await User.findById(userId).exec();

    if (!findUser) {
        return res.status(404).json({
            message: 'User not found',
        });
    }

    if (username) {
        findUser.username = username;
    }

    if (name) {
        findUser.name = name;
    }

    if (
        activeAt &&
        moment(activeAt).isValid() &&
        moment(activeAt).isAfter(findUser.createdAt)
    ) {
        // activeAt must be date and after the create time
        findUser.activeAt = activeAt;
    }

    let hashedPassword = undefined;
    if (password) {
        // if client send password then update, else skip
        try {
            hashedPassword = await bcrypt.hash(password, 10);
            findUser.password = hashedPassword;
        } catch (e) {
            return res.status(500).json({
                error: e
            })
        }
    }

    try {
        findUser.updatedAt = Date.now(); // set the update time
        await findUser.save(); // save new information
    } catch (e) {
        return res.json({
            message: 'SKY FALL',
            error: e
        });
    }

    return res.json({
        message: 'User updated',
        data: findUser
    });
});

/**
 * account recover
 */
router.post('/recover/:userId', checkAuth, async (req, res) => {
    const staffId = req.userData._id
    const checkStaff = await User.findOne({
        _id: staffId
    })

    if (!checkStaff) {
        return res.json({
            message: 'Staff dont exist!'
        });
    }

    if (checkStaff.level !== 1) {
        return res.json({
            message: 'You are not Staff!'
        });
    }

    const userId = req.params.userId;

    User.updateOne({_id: userId}, {$set: {updatedAt: null}})
        .exec()
        .then(result => {
            return res.json({
                message: 'User recover',
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
router.post('/delete/:userId', checkAuth, async (req, res) => {
    const staffId = req.userData._id
    const checkStaff = await User.findOne({
        _id: staffId
    })

    if (!checkStaff) {
        return res.json({
            message: 'Staff dont exist!'
        });
    }

    if (checkStaff.level !== 1) {
        return res.json({
            message: 'You are not Staff!'
        });
    }

    const userId = req.params.userId;
    const checkUser = await User.findOne({
        _id: userId
    }).exec()

    if (checkUser.level === 3 || checkUser.level === 2) {
        const checkClassroom = await Classroom.findOne({
            $or: [
                {student: checkUser._id},
                {tutor: checkUser._id}
            ]
        }).exec()
        if (checkClassroom) {
            User.updateOne({
                _id: checkUser._id
            }, {
                $set: {
                    deletedAt: Date.now()
                }
            })
        }
        const deleteUser = await User.remove({_id: checkUser._id}).exec();
        if (!deleteUser) {
            return res.json({
                message: 'Delete fail'
            })
        }
        return res.json({
            message: 'Delete success!'
        })
    }

    if (checkUser.level === 1) {
        const checkClassroom = await Classroom.findOne({
            createdBy: checkUser._id
        }).exec()
        if (checkClassroom) {
            User.updateOne({
                _id: checkUser._id
            }, {
                $set: {
                    deletedAt: Date.now()
                }
            })
        }
        const deleteUser = await User.remove({_id: checkUser._id}).exec();
        if (!deleteUser) {
            return res.json({
                message: 'Delete fail'
            })
        }
        return res.json({
            message: 'Delete success!'
        })
    }
});

module.exports = router;





