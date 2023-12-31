const User = require("../models/user");
module.exports.update = async function (req, res) {
  try {
    if (req.user.id == req.params.id) {
      await User.findByIdAndUpdate(req.params.id, req.body);
    }
    console.log(req.body);
    console.log("update");
    return res.redirect("back");
  } catch (error) {
    console.log(`error in user controller ${error} `);
    return;
  }
};
module.exports.profile = function (req, res) {
  try {
    return res.render("profile", { title: "Profile page" });
  } catch (error) {
    console.log(`error in user controller ${error} `);
    return;
  }
};
module.exports.userprofile = async function (req, res) {
  try {
    const user = await User.findById(req.params.id);
    return res.render("user-profile", {
      title: `${user.name} profile`,
      profileUser: user,
    });
  } catch (error) {
    console.log(`error in user controller ${error} `);
    return;
  }
};
module.exports.signup = function (req, res) {
  try {
    if (req.isAuthenticated()) {
      return res.redirect("/user/profile");
    }
    return res.render("user_sign_up", {
      title: "Codieal | Sign Up",
    });
  } catch (error) {
    console.log(`error in user controller ${error} `);
    return;
  }
};
module.exports.signin = function (req, res) {
  try {
    if (req.isAuthenticated()) {
      return res.redirect("/user/profile");
    }
    return res.render("user_sign_in", {
      title: "Codieal | Sign in",
    });
  } catch (error) {
    console.log(`error in user controller ${error} `);
    return;
  }
};
module.exports.signout = function (req, res) {
  try {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  } catch (error) {
    console.log(`error in user controller ${error} `);
    return;
  }
};
module.exports.create = async function (req, res) {
  try {
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
  } catch (error) {
    console.log(`error in user controller ${error} `);
    return;
  }
};
module.exports.createSession = function (req, res) {
  try {
    return res.redirect("/");
  } catch (error) {
    console.log(`error in user controller ${error} `);
    return;
  }
};
