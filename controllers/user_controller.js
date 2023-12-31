const User = require("../models/user");
module.exports.update = async function (req, res) {
  if(req.user.id==req.params.id){
  await User.findByIdAndUpdate(req.params.id, req.body);
  }
  console.log(req.body)
  console.log('update')
  return res.redirect("back");
};
module.exports.profile = function (req, res) {
  return res.render("profile", { title: "Profile page" });
};
module.exports.userprofile = async function (req, res) {
  const user = await User.findById(req.params.id);
  return res.render("user-profile", {
    title: `${user.name} profile`,
    profileUser: user,
  });
};
module.exports.signup = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/user/profile");
  }
  return res.render("user_sign_up", {
    title: "Codieal | Sign Up",
  });
};
module.exports.signin = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/user/profile");
  }
  return res.render("user_sign_in", {
    title: "Codieal | Sign in",
  });
};
module.exports.signout = function (req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
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
