const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
require("dotenv").config();

if (!process.env.FACEBOOK_APP_ID || !process.env.FACEBOOK_APP_SECRET) {
  throw new Error("Missing Facebook App ID or Secret in environment variables");
}

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      profileFields: ["displayName", "email", "first_name", "last_name"],
      enableProof: true,
    },
    function (accessToken, refreshToken, profile, done) {
      try {
        profile.provider = "Facebook";
        return done(null, profile);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
