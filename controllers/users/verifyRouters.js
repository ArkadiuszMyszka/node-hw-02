import User from "../service/schemas/user.js";

async function verifyUser(req, res, next) {
  const verificationToken = req.params.verificationToken;
    const user = await User.findOne({ verificationToken }, { _id: 1 }).lean();
    if (!user) {
       return res.status(404).json({ message: "User not found" }); 
    }
    try {
        await User.findOneAndUpdate(
          {
            _id: user._id,
          },
          {
            $set: {
                  verificationToken: null,
                verify: true,
            },
          },
          {
            upsert: false,
          }
        );
         return res.status(200).json("Verification successful");
    } 
    catch (e) {
        console.log(e);
        return res.status(500).json(e);
    }
    
//   console.log(user._id);
  // console.log("tutaj", verificationToken);
  // return res.status(200).json({ message: "ok" });
}

export default verifyUser;
