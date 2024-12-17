const express = require("express");
const { getProfileDataByEmail, createProfile, updateProfile } = require("../database/queries");
const isLogged = require("../utils/authMiddleware");

const router = express.Router();

router.get("/", isLogged, async (req, res) => {
  const user = req.user;

  const normalizedUser = {
    displayName: user.displayName || user.name?.givenName || "",
    givenName: user.name?.givenName || user.given_name || "",
    familyName: user.name?.familyName || user.family_name || "",
    email: user.emails[0].value || user.email,
    provider: user.provider,
  };

  let userProfile = await getProfileDataByEmail(normalizedUser.email, normalizedUser.provider);

  if (!userProfile) {
    userProfile = await createProfile({
      displayName: normalizedUser.displayName,
      givenName: normalizedUser.givenName,
      familyName: normalizedUser.familyName,
      email: normalizedUser.email,
      stack: 10000,
      provider: normalizedUser.provider,
    });
  } else {
    userProfile = await updateProfile(userProfile.id, {
      displayName: normalizedUser.displayName,
      givenName: normalizedUser.givenName,
      familyName: normalizedUser.familyName,
    });
  }

  res.json(userProfile);
});

module.exports = router;
