const router = require("express").Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../DB/schema/UserSchema");

const isMail = (e) =>
  !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))^/i.test(
    e
  );

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (isMail(email)) throw new Error("Invalid email");
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      throw new Error("User not found");
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error("Invalid password");
    }
    res.status(200).json({
      userID: user._id,
      token: jwt.sign({ userID: user._id }, process.env.KEYTOKEN, {
        expiresIn: "24h",
      }),
    });
  } catch (e) {
    res.status(400).send(e.message);
  }
});
router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (isMail(email)) throw new Error("Invalid email");
    const hashPwd = await bcrypt.hash(password, 10);
    await User.create({ email, password: hashPwd });
    res.status(200).json({ msg: "Account created with successs!" });
  } catch (e) {
    res.status(400).send(e.message);
  }
});

module.exports = router;
