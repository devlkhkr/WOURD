// S : sql setting
const express = require('express');
const app = express();
const PORT = process.env.PORT || 9090;
const db = require('./config/db');
const bodyParser = require('body-parser');
// const path = require("path");
const cors = require('cors');

app.use(express.urlencoded({
    extended: true
}))
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

// app.use(express.static(path.join(__dirname, "build")));

// app.get("/", (req, res) => {
//     res.set({
//         "Cache-Control": "no-cache, no-store, must-revalidate",
//         Pragma: "no-cache",
//         Date: Date.now()
//     });
//     res.sendFile(path.join(__dirname, "build", "index.html"));
// });

app.get('/api/host', (req, res) => {
    res.send({
        host: 'kany'
    });
})

app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`);
})
// E : sql setting

app.get('/api/words/list', (req, res) => {
    db.query("SELECT * FROM WORD_TB", (err, data) => {
        if (!err) {
            res.send(data);
        } else {
            console.log(err);
            res.send(err);
        }
    })
});

app.post('/api/user/login', (req, res) => {
    db.query(`SELECT * FROM USER_TB WHERE user_id='${req.body.loginUserData.id}'`, (err, data) => {
        if (!err) {
            if(data.length === 0){
                res.send("존재하지 않는 아이디 입니다.")
            }
            else if(data.length === 1) {
                if(req.body.loginUserData.pw === data[0].user_password) {
                    res.send(true);
                }
                else{
                    res.send("비밀번호가 일치하지 않습니다.")
                }
            }
            else{
                res.send(false)
            }
        } else {
            console.log(err);
            res.send(err);
        }
    })
});


// app.post('/api/board/del', (req, res) => {
//     db.query("DELETE FROM BOARD_TB WHERE BOARD_SEQ=" + +req.body.seq, (err, data) => {
//         if (!err) {
//             res.send(data);

//         } else {
//             console.log(err);
//             res.send(err);
//         }
//     })
// });

// app.get('/api/board/list', (req, res) => {
//     db.query("SELECT * FROM BOARD_TB", (err, data) => {
//         if (!err) {
//             res.send(data);

//         } else {
//             console.log(err);
//             res.send(err);
//         }
//     })
// });

// app.get('/api/devlog/list', (req, res) => {
//     db.query("SELECT * FROM DEVLOG_TB", (err, data) => {
//         if (!err) {
//             res.send(data);

//         } else {
//             console.log(err);
//             res.send(err);
//         }
//     })
// });

// app.get('/api/project/list', (req, res) => {
//     db.query("SELECT * FROM PROJECT_TB", (err, data) => {
//         if (!err) {
//             res.send(data);

//         } else {
//             console.log(err);
//             res.send(err);
//         }
//     })
// });

// app.get('/api/s3/info', (req, res) => {
//     db.query("SELECT * FROM S3_INFO_TB", (err, data) => {
//         if (!err) {
//             res.send(data);

//         } else {
//             console.log(err);
//             res.send(err);
//         }
//     })
// });

// app.post('/api/devlog/write', (req, res) => {
//     db.query(`INSERT INTO DEVLOG_TB (DEVLOG_SEQ, DEVLOG_TITLE, DEVLOG_DETAIL, DEVLOG_IMG_URL, DEVLOG_WRITED_TIME, DEVLOG_CATEGORY, DEVLOG_WRITER) VALUES (null, "${req.body.postTitle}", '${req.body.postDetail}', "${req.body.postImgUrl}", NOW(), "REACT", "Lee Kanghyoung" )`
//         , (err, data) => {
//         if (!err) {
//             res.send(data);
//         } else {
//             console.log(err);
//             res.send(err);
//         }
//     })
// });