const express = require("express");
const auth = require("../../middleware/auth");
const router = express.Router();
const User = require("../../models/User");

const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.get("/auth", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    //console.log(user);
    return res.status(200).json(user);
  } catch {
    return res.status(500).json({ msg: "Server error" });
  }
});

router.post(
  "/auth",
  [
    check("email", "Enter a valid email").isEmail(),
    check("password", "Password required").exists(),
  ],
  //checks for email and pasword
  async (req, res) => {
    try {
      const err = validationResult(req);
      //extract user data
      if (!err.isEmpty()) return res.status(400).json({ error: err.array() });

      const { email, password } = req.body;

      const user = await User.findOne({ email });
      //check if user exists
      if (!user) {
        return res.status(400).json([{ msg: "Invalid credentials " }]);
      }
      //compare pasword
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json([{ msg: "Invalid credentials " }]);
      }
      //return auth token
      const payload = { user: { id: user.id } };
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 36000 },
        (err, token) => {
          if (err) {
            return res
              .status(5000)
              .json([{ msg: "JWT token cant be created" }]);
          }
          return res.status(201).json({ token });
        }
      );
    } catch (err) {
      return res.status(500).json("Server error.");
    }
  }
);

module.exports = router;
