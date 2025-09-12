const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const random = Math.floor(Math.random() * Math.pow(10, 6));
const generateOTP = () => String(random).padEnd(6, 0);
