const nodemailer = require('nodemailer')
const asyncHandler = require('express-async-handler')

const sendMail = asyncHandler(async({email, html}) => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // or 'STARTTLS'
        auth: {
            user: process.env.EMAIL_NAME,
            pass: process.env.EMAIL_APP_PASSWORD,
        },

    });

    let info = await transporter.sendMail({
        from: '"Cuahangonline" <no-reply@cuahangonline.com>',
        to: email,
        subject: "Forgot Password",
        html: html
    });
    return info
})


module.exports = sendMail