const Post = require("../models/post");
const Comment = require("../models/comments");

module.exports.create = async function (req, res) {
  let post = await Post.findById(req.body.post).exec();
  if (post) {
    const comment = await Comment.create({
      comment: req.body.content,
      post: req.body.post,
      user: req.user.id,
    });
    post.comments.push(comment);
    post.save();
  }
  return res.redirect("/");
};
