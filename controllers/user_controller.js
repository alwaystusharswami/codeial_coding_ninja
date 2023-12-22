const User = require("../models/user");

module.exports.profile = function (req, res) {
  console.log(req.cookies);
  return res.render("profile", { title: "Codieal profile" });
};
module.exports.signup = function (req, res) {
  return res.render("user_sign_up", {
    title: "Codieal | Sign Up",
  });
};
module.exports.signin = function (req, res) {
  return res.render("user_sign_in", {
    title: "Codieal | Sign in",
  });
};
module.exports.create = async function (req, res) {
  if (req.body.password != req.body.confirmpassword) {
    return res.redirect("back");
  }
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    User.create(req.body);
    return res.redirect("/user/sign-in");
  } else {
    return res.redirect("back");
  }
};
module.exports.createSession = function (req, res) {
  console.log(`done`);
  return res.redirect("/");
};
