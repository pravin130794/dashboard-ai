const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "anku130794@gmail.com",
    pass: "stwvppopovscqlqm",
  },
});

function sendEmail(to, subject, text) {
  return transporter.sendMail({
    from: "anku130794@gmail.com",
    to,
    subject,
    text,
  });
}

module.exports = { sendEmail };
