const express = require('express')
const path = require('path')

const nodemailer = require('nodemailer');
const formidableMiddleware = require('express-formidable');
// var bodyParser = require('body-parser');
// var multer = require('multer');
// var upload = multer();

const alert = require('alert');

const app = express();

app.use('/', express.static(path.join(__dirname, 'public')))

app.use(formidableMiddleware());


// app.use(bodyParser.json()); 
// app.use(bodyParser.urlencoded({ extended: true })); 
// app.use(upload.array()); 

app.post('/send', (req, res) => {
    console.log(req.fields);
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        secure:false,
        auth: {
            user: req.fields.Senders_Email,
            pass: req.fields.Senders_Password
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    var mailOptions = {
        from: req.fields.Senders_Email,
        to: req.fields.Recievers_Email,
        subject: 'Sending Email using Node.js',
        text: req.fields.Message
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    alert("Email has been successfully sent");
    res.redirect('/');
})
app.get('/', (req, res) => {
    res.render('index');
})

app.listen(process.env.PORT || 5000, () => console.log('Server started at http://localhost:2678'))