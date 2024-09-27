const nodemailer = require("nodemailer");


const sendMail = async(user, subj, mssg) => {
  const transporter = nodemailer.createTransport({
    service: process.env.SERVICE,
    host: process.env.HOST,
    port: process.env.PORTZ,
    secure: process.env.SECURE,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  await transporter.sendMail({
    from: process.env.EMAIL,
    to: user,
    subject: subj,
    html: mssg
  });
};




module.exports = { sendMail }