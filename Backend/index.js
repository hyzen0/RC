require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyparser = require("body-parser");
const cookieSession = require("cookie-session");

const auth = require("./routes/api/auth");
const profile = require("./routes/api/profile");

const app = express();

require("./strategies/googleStrategy");

const db = require("./setup/myurl").mongoURL;
mongoose
  .connect(db)
  .then(() => console.log("Connected"))
  .catch(err => console.log(err));

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE,GET");
    return res.status(200).json({});
  }
  next();
});

//Cokie middleware
app.use(
  cookieSession({
    name: "tuto-session",
    keys: ["key1", "key2"],
  })
);

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Config for JWT strategy
require("./strategies/jsonwtStrategy")(passport);

//just for resting -> route
app.get("/", (req, res) => {
  res.send("Working");
});

//actual routes
app.use("/api/auth", auth);
app.use("/api/profile", profile);

app.get(
  "/google",
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/plus.login"],
  })
);

app.get(
  "auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/failed",
    successRedirect: "/",
  }),
  (req, res) => {
    res.json({
      name: req.user.displayName,
      pic: req.user.photos[0].value,
      email: req.user.emails[0].value,
    });
  }
);

app.get("/logout", (req, res) => {
  req.session = null;
  req.logout();
  res.redirect("/");
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Running on ${port}`));
