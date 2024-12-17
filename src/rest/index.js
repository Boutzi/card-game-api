const express = require("express");
const userRoutes = require("./user");
const authRoutes = require("./auth");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("<a href='/auth/google'>Login with Google</a> <a href='/auth/facebook'>Login with Facebook</a>");
});

router.use("/user", userRoutes);
router.use("/auth", authRoutes);

module.exports = router;
