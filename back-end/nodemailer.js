const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = (email, message, subject, from) => {
  const transporter = nodemailer.createTransport({
    service: process.env.NODEMAILER_SERVICE,
    host: process.env.NODEMAILER_HOST,
    secure: false,
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });

  const mailOptions = {
    from: `${from}` + ": %s" + `<${process.env.USER}>`,
    to: `<${email}>`,
    subject: subject,
    text: message,
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) console.log(err);
    console.log(`Email sent to ${email}`);
  });
};

module.exports = sendEmail;
