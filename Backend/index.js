const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyparser = require("body-parser");

const auth = require("./routes/api/auth");
const profile = require("./routes/api/profile");

const app = express();

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

//Passport middleware
app.use(passport.initialize());

//Config for JWT strategy
require("./strategies/jsonwtStrategy")(passport);

//just for resting -> route
app.get("/", (req, res) => {
  res.send("Working");
});

//actual routes
app.use("/api/auth", auth);
app.use("/api/profile", profile);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Running on ${port}`));
