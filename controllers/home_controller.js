const Post = require("../models/post");
module.exports.home = async function (req, res) {
  const posts = await Post.find({}).populate('user');

  return res.render("home", { title: "Codieal Home", posts });
};
