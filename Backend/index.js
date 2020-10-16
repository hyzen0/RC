const express = require("express");

const bodyparser = require("body-parser");

const app = express();

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

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
