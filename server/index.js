// require("dotenv").config();

// const express = require("express");
// const mongoose = require("mongoose");
// const passport = require("passport");
// const bodyparser = require("body-parser");
// const morgan = require("morgan");
// const cookieSession = require("cookie-session");
// const cors = require("cors");

// const auth = require("./routes/api/auth");
// const profile = require("./routes/api/profile");
// const blogs = require("./routes/api/blogs");
// const schools = require("./routes/api/schools");

// const app = express();

// require("./strategies/googleStrategy");

// const db = require("./setup/myurl").mongoURL;
// mongoose
//   .connect(db, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//   })
//   .then(() => console.log("Connected"))
//   .catch(err => console.log(err));

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   next();
// });

// app.use(
//   cors({
//     origin: ["http://31.220.48.21:3000", "http://localhost:3000"],
//     optionsSuccessStatus: 200,
//     methods: "GET,POST",
//   })
// );
// app.use(bodyparser.urlencoded({ extended: false }));
// app.use(bodyparser.json());
// app.use(morgan("dev"));

// //Cokie middleware
// app.use(
//   cookieSession({
//     name: "tuto-session",
//     keys: ["key1", "key2"],
//   })
// );

// //Passport middleware
// app.use(passport.initialize());
// app.use(passport.session());

// //Config for JWT strategy
// require("./strategies/jsonwtStrategy")(passport);

// //just for resting -> route
// app.get("/", (req, res) => {
//   res.send("Working");
// });

// //actual routes
// app.use("/api/auth", auth);
// app.use("/api/profile", profile);
// app.use("/api/blogs", blogs);
// app.use("/api/schools", schools);

// app.get(
//   "/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );

// app.get(
//   "/google/callback",
//   passport.authenticate("google", { failureRedirect: "/", session: false }),
//   function (req, res) {
//     var token = req.user.token;
//     res.redirect("http://localhost:3000?token=" + token);
//   }
// );

// app.get("/logout", (req, res) => {
//   req.session = null;
//   req.logout();
//   res.redirect("/");
// });

// const port = process.env.PORT || 5000;

// app.listen(port, () => console.log(`Running on ${port}`));

const express = require("express");
const morgan = require("morgan");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const cors = require("cors");
// Config dotev
require("dotenv").config();

const app = express();

// Connect to database
connectDB();

// body parser
app.use(bodyParser.json());
// Load routes
const authRouter = require("./routes/auth.route");
const userRouter = require("./routes/user.route");

// Dev Logginf Middleware
if (process.env.NODE_ENV === "development") {
  app.use(
    cors({
      origin: process.env.CLIENT_URL,
    })
  );
  app.use(morgan("dev"));
}

// Use Routes
app.use("/api", authRouter);
app.use("/api", userRouter);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    msg: "Page not founded",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
