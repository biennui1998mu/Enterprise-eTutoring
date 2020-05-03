require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Classroom = require('./database/models/classroom');

mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);

const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

mongoose.connect(`mongodb://${username}:${password}@nosama-shard-00-00-dstgw.gcp.mongodb.net:27017,nosama-shard-00-01-dstgw.gcp.mongodb.net:27017,nosama-shard-00-02-dstgw.gcp.mongodb.net:27017/${dbName}?replicaSet=NOsama-shard-0&ssl=true&authSource=admin`, {
    useNewUrlParser: true,
});

const app = express();
const PORT = process.env.PORT || 5000;

const classRoutes = require('./routes/classRoute');
const fileRoute = require('./routes/fileRoute');
const meetingRoutes = require('./routes/meetingRoute');
const messageRoutes = require('./routes/messageRoute');
const scheduleRoutes = require('./routes/scheduleRoute');
const userRoutes = require('./routes/userRoute');
const statisticRoutes = require('./routes/statisticRoute');

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

//hiện dưới terminal
app.use(morgan('dev'));
app.use('/uploads/', express.static('uploads'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use(cookieParser());

//routes handle request
app.use('/class', classRoutes);
app.use('/files', fileRoute);
app.use('/meeting', meetingRoutes);
app.use('/message', messageRoutes);
app.use('/schedule', scheduleRoutes);
app.use('/user', userRoutes);
app.use('/statistic', statisticRoutes);

app.use((req, res, next) => {
    const error = new Error('not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

// -------------------------------------------------------------------------------------
// io.sockets.emit gửi tới toàn bộ server
// socket.emit gửi tới chính nó
// socket.broadcast.emit gửi tới toàn bộ server trừ chính nó
// io.to(socketId).emit() gửi tới người có socketid
// socket.adapter.rooms Show danh sách room đang có


// Socket.io cho chat
const http = require('http').Server(app);
const io = require('socket.io')(http);

io.use(async function (socket, next) {
    if (socket.handshake.query && socket.handshake.query.token) {
        jwt.verify(
            socket.handshake.query.token,
            process.env.JWT_KEY,
            function (err, decoded) {
                if (err) return next(new Error('Authentication error'));
                socket.decoded = decoded;
                // show token connect
                console.log('Đăng nhập mới: ' + username);
                next();
            });
    } else {
        next(new Error('Authentication error'));
    }
}).on('connection', async (socket) => {
    const decoded = socket.decoded;
    const username = decoded.username;
    const userId = decoded._id;

    /**
     * show socket disconnect
     * socket handshake with token decoded
     */
    socket.on('disconnect', function () {
        console.log('User: ' + username + ' đã out');
    });

    /**
     * socket listen event user join room
     */
    socket.on("user-join-room-chat", async function (classroomId) {
        const checkClass = await Classroom.findOne({_id: classroomId});

        if (!checkClass) {
            return false
        }

        /**
         * socket join room chat from class id
         * class id become room name
         */
        socket.join(classroomId);

        /**
         * Server listen event user send message
         */
        socket.on("user-send-message", function (messageData) {
            /**
             * message from server will send to room
             * user in room can view message real time
             */
            io.to(classroomId).emit("server-send-message", messageData);
        });
    });
});

http.listen(PORT, () => {
    console.log(`Server lives! Port: ${PORT}`);
});




