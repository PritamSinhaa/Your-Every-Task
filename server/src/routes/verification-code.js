const express = require("express");

const verification = require("../controller/verification");

const router = express.Router();

router.post("/forget-password", verification.sendEmail);
