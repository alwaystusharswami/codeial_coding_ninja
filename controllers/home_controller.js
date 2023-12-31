const Post = require("../models/post");
const User = require("../models/user.js");
module.exports.home = async function (req, res) {
  try {
    let posts = await Post.find()
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      })
      .exec();
    const allUsers = await User.find();
    return res.render("home", { title: "Codieal Home", posts, allUsers });
  } catch (err) {
    console.log(`Error in home controller ${err}`);
    return;
  }
};
