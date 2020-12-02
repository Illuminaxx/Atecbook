const express = require("express");
const router = express.Router();
const Profile = require("../../../models/Profile");
const Posts = require("../../../models/Posts");
const User = require("../../../models/User");
const auth = require("../../../middleware/auth");

router.delete("/profiles", auth, async (req, res) => {
  try {
    const id = req.user.id;
    await Posts.deleteMany({ user: id });
    await Profile.findOneAndRemove({ user: id });
    await User.findOneAndRemove({ _id: id });
    res.send("User deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
