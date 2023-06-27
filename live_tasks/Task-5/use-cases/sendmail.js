module.exports = function makesendemailUseCase({

}) {
    return async function sendMail() {
        console.info(`Inside send mail use case`);
        var nodemailer = require('nodemailer');

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'akshst08092001@gmail.com',
                pass: 'uvluivlynrhrfgxk'
            }
        });

        var mailOptions = {
            from: 'akshst08092001@gmail.com',
            to: 'akshat19cs012@satiengg.in',
            subject: 'Sending Email using Node.js',
            text: 'Regarding your xl sheet report',
            attachments: [
                {
                    filename: 'data.csv',
                    path: '/home/ad.rapidops.com/akshat.jain/Akshat-Jain/live_tasks/Task-2/data.csv'
                }
            ]
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });


    }
}