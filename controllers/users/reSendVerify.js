import schema from "../validators/users/emailValidator.js";
import User from "../service/schemas/user.js";
import transporter from "../service/mail.service.js";

async function reSendVerify(req, res, next) {
  const { email } = req.body;
  const resultValidate = schema.validate(req.body);

  if (resultValidate.error) {
    return res.status(400).json({ message: "missing required field email" });
  } else {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email is wrong" });
    }
    if (user.verify === true) {
      return res
        .status(400)
        .json({ message: "Verification has already been passed" });
    }
    try {
      const authToken = user.verificationToken;
      // console.log(authToken);

      const emailOptions = {
        from: "no-reply@sandbox1969ffb402d946ae8f6d40953f31c9c0.mailgun.org",
        to: email,
        subject: "Verification",
        text: `Cześć. Testowy link do veryfikacji http://localhost:3000/users/verify/${authToken}`,
      };

      transporter
        .sendMail(emailOptions)
        .then((info) => console.log(info))
        .catch((err) => console.log("ERR", err));

      return res.status(200).json({ message: "Verification email sent" });
    } catch (e) {
      console.log(e);
      return res.status(500).json(e);
    }
  }
}

export default reSendVerify;
