const express = require("express");
const auth = require("./auth");

const router = express.Router();

// mount all auth routes under /auth
router.use("/auth", auth);

module.exports = router;
