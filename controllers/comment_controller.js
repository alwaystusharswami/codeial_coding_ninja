const Post = require("../models/post");
const Comment = require("../models/comments");

module.exports.create = async function (req, res) {
  try {
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
  } catch (error) {
    console.log(`error in comment controller ${error} `);
    return;
  }
};
module.exports.destroy = async function (req, res) {
  try {
    const comment = await Comment.findById(req.params.id).exec();
    if (comment.user == req.user.id) {
      let postId = comment.post;
      await comment.deleteOne();
      const post = await Post.findById(postId).exec();
      post.comments.pull({ _id: req.params.id });
    }
    return res.redirect("back");
  } catch (error) {
    console.log(`error in comment controller ${error} `);
    return;
  }
};
