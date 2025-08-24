const express = require("express");

const auth = require("../controller/auth");

const router = express.Router();

router.post("/auth", auth.signUp);

module.exports = router;
