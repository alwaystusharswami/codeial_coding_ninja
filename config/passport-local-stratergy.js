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
passport.serializeUser(function(user,done){
    done(null,user.id);
})

// deserilize the user from the key in the cookies 
passport.deserializeUser(async function(id,done){
    const user=await User.findById(id);
    return done(null,user);

})
module.exports=passport;
