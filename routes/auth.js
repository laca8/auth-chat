// server/routes/auth.js
const express = require("express");
const {
  login,
  register,
  googleAuth,
  forgetPassword,
  resetPassword,
} = require("../controller/auth");
const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/profile", googleAuth);
router.post("/facebook", googleAuth);
router.post("/send-email", forgetPassword);
router.post("/reset-password/:id", resetPassword);
// Routes

module.exports = router;
