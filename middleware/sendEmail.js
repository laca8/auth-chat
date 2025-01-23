const nodemailer = require("nodemailer");

//send email
const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.Email_Host,
    port: process.env.Email_Port, //if secure = false port = 587 , if true port=465
    secure: true,
    auth: {
      user: process.env.Email_User,
      pass: process.env.Email_Pass,
    },
  });
  const mailOpts = {
    from: `${process.env.Email_User} Zoom Team`,
    to: options.email,
    subject: options.subject,
    text: `
    Password Reset Request
      Hello,
      We received a request to reset your password. Please visit the following link to create a new password:
      This link will expire in 1 hour for security reasons.
      If you didn't request a password reset, please ignore this email or contact support if you have concerns.
      Best regards,
      Your App Team
    `,
    html: options.message,
  };
  await transporter.sendMail(mailOpts);
};
module.exports = sendEmail;
