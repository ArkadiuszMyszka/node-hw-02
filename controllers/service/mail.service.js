import nodemailer from "nodemailer";

const config = {
  host: "smtp.mailgun.org",
  port: 587,
  secure: false,
  auth: {
    user: "postmaster@sandbox1969ffb402d946ae8f6d40953f31c9c0.mailgun.org",
    // pass: process.env.SENDGRID_API_KEY,
    pass: "a6acb8b2f3e487d394bab3dbee2739a2-8c90f339-307a4457",
  },
};

const transporter = nodemailer.createTransport(config);

const emailOptions = {
  from: "no-reply@sandbox1969ffb402d946ae8f6d40953f31c9c0.mailgun.org",
  to: "myszkaaarek@gmail.com",
  subject: "Nodemailer test",
  text: "Cześć. Testujemy wysyłanie wiadomości!",
};

transporter
  .sendMail(emailOptions)
  .then((info) => console.log(info))
  .catch((err) => console.log("ERR", err));


export default transporter;
