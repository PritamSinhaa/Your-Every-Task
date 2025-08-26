const express = require("express");

const auth = require("../controller/auth");

const router = express.Router();

router.post("/auth/sign-up", auth.signUp);
router.post("/auth/sign-in", auth.signIn);

module.exports = router;
