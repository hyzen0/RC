const express = require("express");
const mongoose = require("mongoose");

const auth = require("./routes/api/auth");

const bodyparser = require("body-parser");

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

//just for resting -> route
app.get("/", (req, res) => {
  res.send("Working");
});

//actual routes
app.use("/api/auth", auth);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Running on ${port}`));
