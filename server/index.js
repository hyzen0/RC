const express = require("express");
const morgan = require("morgan");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const cors = require("cors");
const socketIO = require("socket.io");
const http = require("http");
// Config dotev
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Connect to database
connectDB();

// body parser
app.use(bodyParser.json());
// Load routes
const authRouter = require("./api/auth.route");
const userRouter = require("./api/user.route");

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

server.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
