const Post = require("../models/post");
const Comment = require("../models/comments");

module.exports.create = async function (req, res) {
  try {
    await Post.create({
      content: req.body.content,
      user: req.user._id,
    });
    return res.redirect("back");
  } catch (error) {
    console.log(`error in post controller ${error} `);
    return;
  }
};
module.exports.destroy = async function (req, res) {
  try {
    const post = await Post.findById(req.params.id).exec();
    if (post.user == req.user.id) {
      await post.deleteOne();
    }
    await Comment.deleteMany({ post: req.params.id });
    return res.redirect("back");
  } catch (error) {
    console.log(`error in post controller ${error} `);
    return;
  }
};
