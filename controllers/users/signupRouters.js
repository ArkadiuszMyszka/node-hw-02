import schema from "../validators/users/signupValidator.js";
import newAvatar from "../service/gravatar.js";
import User from "../service/schemas/user.js";
import { v4 as uuidv4 } from "uuid";
import transporter from "../service/mail.service.js";

async function signupUser(req, res, next) {
  const { email, password } = req.body;
  const avatar = newAvatar(email);
  const resultValidate = schema.validate(req.body);

  if (resultValidate.error) {
    return res.status(400).json({ message: resultValidate.error.message });
  } else {
    const user = await User.findOne({ email }, { _id: 1 }).lean();
    if (user) {
      return res.status(409).json({ message: "Email in use" });
    }
    try {
      const authToken = uuidv4();
      const newUser = new User({
        email,
        password,
        avatarURL: avatar,
        verificationToken: authToken,
      });
      await newUser.setPassword(password);
      await newUser.save();
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

      return res.status(201).json({ message: "User created" });
    } catch (e) {
      console.log(e);
      return res.status(500).json(e);
    }
  }
}

export default signupUser;
