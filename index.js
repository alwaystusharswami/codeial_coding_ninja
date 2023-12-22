const express = require("express");
const port = 8080;
const router = express.Router();
const mongoose = require("./config/mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-stratergy");
// ejs layout with express
const expressLayout = require("express-ejs-layouts");

const app = express();



// set view engine
app.set("view engine", "ejs");
app.set("views", "views");
// middle ware
app.use(expressLayout);
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

// passport session
app.use(
  session({
    name: "codieal",
    secret: "blashsomething", // change secret in deploy in production
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
// app.use(passport.setAuthenticatedUser);
// router calling
app.use("/", require("./routes"));

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`server is running up at port ${port}`);
});
