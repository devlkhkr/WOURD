// S : sql setting
const express = require('express');
const app = express();
const PORT = process.env.PORT || 9090;
const config = require('./config/config');
const db = config.db;
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const nodemailerConfig = config.nodemailer;
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

app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`);
})
// E : sql setting

app.post('/api/join/reg', (req, res) => {
    db.query("INSERT INTO USER_TB ("
            + "user_seq,"
            + "user_id,"
            + "user_password,"
            + "user_salt,"
            + "user_nickname,"
            + "user_prf_img,"
            + "user_join_date"
        + ") VALUES ("
            + "null, '"
            + req.body.joinUserData.email + "','"
            + req.body.joinUserData.pw + "','"
            + req.body.joinUserData.salt + "','"
            + req.body.joinUserData.name + "','"
            + req.body.joinUserData.prfImg + "',"
            + "NOW())"
        , (err, data) => {
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
                // console.log("input",req.body.loginUserData.pw)
                // console.log("db", data[0].user_password)
                if(req.body.loginUserData.pw == data[0].user_password) {
                    res.send({
                        loginFlag: true,
                        userInfo: {
                            seq: data[0].user_seq,
                            id: data[0].user_id,
                            nickname: data[0].user_nickname,
                            prfimg: data[0].user_prf_img
                        }
                    });
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

function getRandomString () {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'
    const stringLength = 6
    let randomstring = ''
    for (let i = 0; i < stringLength; i++) {
        const rnum = Math.floor(Math.random() * chars.length)
        randomstring += chars.substring(rnum, rnum + 1)
    }
    return randomstring;
}

app.post('/api/join/dup', (req, res) => {
    db.query(`SELECT * FROM USER_TB WHERE user_id='${req.body.joinUserData.email}'`, (err, data) => {
        if (!err) {
            res.send(data)
        } else {
            console.log(err);
            res.send(err);
        }
    })
})

app.post('/api/join/sendmail', (req, res) => {
    let user_email = req.body.joinUserData.email;
    let randomAuthCode = getRandomString()

    let transporter = nodemailer.createTransport({
        service: 'gmail'
        , prot: 587
        , host: 'smtp.gmlail.com'
        , secure: false
        , requireTLS: true
        , auth: {
            user: 'devlkhkr@gmail.com',
            pass: nodemailerConfig.pass
        }
    });

    let info = transporter.sendMail({   
        from: 'Team CIDict <admin@cidict.com>',
        to: user_email,
        subject: '[CIDict] 인증코드 입니다',
        text: `인증번호 : ${randomAuthCode}\n\n회원가입 인증코드 입력란에 위의 코드를 올바르게 입력해주세요. 대소문자를 구분합니다.\n\n유효시간 10분, 타인 유출 금지.`,
    });

    info.then(function(data) {
        let connectObject = {
            data: data,
            authCode: randomAuthCode
        }
        console.log(connectObject)
        res.send(connectObject)
    })
})

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