const express = require("express");
const verification = require("../controller/verification");

const router = express.Router();

router.post("/send-email", verification.sendEmail);
router.post("/verify-otp", verification.verifyOTP);

module.exports = router;
