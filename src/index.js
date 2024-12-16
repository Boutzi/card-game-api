const express = require("express");
const passport = require("passport");
const session = require("express-session");
const isLogged = require("./middleware/session");
const { profileSchema, getProfileData, saveProfileData } = require("./services/profileService");

require("./services/authService");

const app = express();
const port = 3000;

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("<a href='/auth/google'>Login with Google</a>");
});

app.get("/profile", isLogged, async (req, res) => {
  const user = req.user;

  const profileData = await getProfileData();
  let userProfile = profileData.find((profile) => profile.email === user.email);

  if (!userProfile) {
    userProfile = profileSchema(
      profileData.length + 1,
      user.given_name,
      user.given_name,
      user.family_name,
      user.email,
      10000
    );

    profileData.push(userProfile);
    await saveProfileData(profileData);
    console.log(userProfile);
  }
  const send = JSON.stringify(userProfile);
  res.send(send);
});

app.get("/auth/google", passport.authenticate("google", { scope: ["email", "profile"] }));

app.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/profile",
    failureRedirect: "/auth/failure",
  })
);

app.get("/auth/failure", (req, res) => {
  res.send("Failed to authenticate..");
});

app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).send("Erreur de déconnexion");
    }
    res.redirect("/");
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
