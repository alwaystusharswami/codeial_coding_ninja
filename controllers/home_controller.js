const Post = require("../models/post");

module.exports.home = async function (req, res) {
  let posts = await Post.find()
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    })
    .exec();

  return res.render("home", { title: "Codieal Home", posts });
};
