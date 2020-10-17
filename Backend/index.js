const express = require("express");

const bodyparser = require("body-parser");

const app = express();

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

app.get("/", (req, res) => {
  res.send("Working");
});

app.use("/api/", (req, res) => {
  res.json({
    hello: ["chris", "ben"],
  });
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Running`));
