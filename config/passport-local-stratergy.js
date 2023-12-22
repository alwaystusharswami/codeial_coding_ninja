const passport = require("passport");

const LocalStrategy = require("passport-local");

const User = require("../models/user");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async function (email, password, done) {
      const user = await User.findOne({ email: email });
      if (!user || user.password != password) {
        console.log(`invalid username and password`);
        return done(null, false);
      } else {
        return done(null, user);
      }
    }
  )
);

// serilizing the user to decide which key is to be kept in cookies
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// deserilize the user from the key in the cookies
passport.deserializeUser(async function (id, done) {
  const user = await User.findById(id);
  return done(null, user);
});
// check if the user is authenticated
// passport.checkAuthentication = function (req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   return res.redirect("/user/sign-in");
// };
// passport.setAuthenticatedUser = function (req, res, next) {
//   if (req.isAuthenticated()) {
//     res.locals.user = req.user;
//   }
//   next();
// };
module.exports = passport;
