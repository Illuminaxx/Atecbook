const router = require("express").Router();
const auth = require("../../../middleware/auth");
const Posts = require("../../../models/Posts");
const User = require("../../../models/User");

router.put("/posts/comment/:id", auth, async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    const user = await User.findById(req.user.id).select("-password");

    const newComment = {
      user: req.user.id,
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
    };
    post.comments.unshift(newComment);
    await post.save();
    res.json(post.comments);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
