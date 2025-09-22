const express = require("express");
const verification = require("../controller/verification");
const auth = require("../controller/auth");

const router = express.Router();

router.post("/signin", auth.signIn);
router.post("/signup", auth.signUp);
router.post("/reset-password", auth.resetPassword);
router.post("/send-email", verification.sendEmail);
router.post("/verify-otp", verification.verifyOTP);

module.exports = router;
