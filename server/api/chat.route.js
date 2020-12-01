const express = require("express");
const router = express.Router();

const { chatPage } = require("../controllers/privatechat");

router.get("/chat", chatPage);

module.exports = router;
