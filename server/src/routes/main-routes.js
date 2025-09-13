const express = require("express");

const verification = require("../controller/verification");

const router = express.Router();

router.post("/auth/send-email", verification.sendEmail);

module.exports = router;
