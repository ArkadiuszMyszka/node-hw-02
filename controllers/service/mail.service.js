import nodemailer from "nodemailer";
import "dotenv/config";

const config = {
  host: "smtp.mailgun.org",
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAILGUN_USER,
    // pass: process.env.SENDGRID_API_KEY,
    pass: process.env.MAILGUN_PASS,
  },
};

const transporter = nodemailer.createTransport(config);

// const emailOptions = {
//   from: "no-reply@sandbox1969ffb402d946ae8f6d40953f31c9c0.mailgun.org",
//   to: "myszkaaarek@gmail.com",
//   subject: "Nodemailer test",
//   text: "Cześć. Testujemy wysyłanie wiadomości!",
// };

// transporter
//   .sendMail(emailOptions)
//   .then((info) => console.log(info))
//   .catch((err) => console.log("ERR", err));


export default transporter;
