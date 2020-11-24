require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyparser = require("body-parser");
const morgan = require("morgan");
const cookieSession = require("cookie-session");
const cors = require("cors");

const auth = require("./routes/api/auth");
const profile = require("./routes/api/profile");
const blogs = require("./routes/api/blogs");
const schools = require("./routes/api/schools");

const app = express();

require("./strategies/googleStrategy");

const db = require("./setup/myurl").mongoURL;
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Connected"))
  .catch(err => console.log(err));

app.use(
  cors({
    origin: "http://31.220.48.21:3000",
    optionsSuccessStatus: 200,
    methods: "GET,POST",
  })
);
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(morgan("dev"));

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
app.use("/api/blogs", blogs);
app.use("/api/schools", schools);

app.get(
  "/google",
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/plus.login"],
  })
);

app.get(
  "/google/callback",
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
