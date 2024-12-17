const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/microsoft", passport.authenticate("microsoft", { prompt: "select_account" }));

router.get(
  "/microsoft/callback",
  passport.authenticate("microsoft", {
    successRedirect: "/user",
    failureRedirect: "/failure",
  })
);

router.get("/google", passport.authenticate("google", { scope: ["email", "profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/user",
    failureRedirect: "/failure",
  })
);

router.get("/facebook", passport.authenticate("facebook", { scope: ["email", "public_profile"] }));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/user",
    failureRedirect: "/failure",
  })
);

router.get("/failure", (req, res) => {
  res.send("Failed to authenticate..");
});

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).send("Erreur de déconnexion");
    }
    res.redirect("/");
  });
});

module.exports = router;
