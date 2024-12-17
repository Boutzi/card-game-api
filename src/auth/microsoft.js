const passport = require("passport");
const MicrosoftStrategy = require("passport-microsoft").Strategy;
require("dotenv").config();

if (!process.env.MICROSOFT_CLIENT_ID || !process.env.MICROSOFT_CLIENT_SECRET) {
  throw new Error("Missing Microsoft Client ID or Secret in environment variables");
}

passport.use(
  new MicrosoftStrategy(
    {
      // Standard OAuth2 options
      clientID: process.env.MICROSOFT_CLIENT_ID,
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
      callbackURL: process.env.MICROSOFT_CALLBACK_URL || "http://localhost:3000/auth/microsoft/callback",
      scope: ["user.read"],
      // optional
      tenant: "common",
      authorizationURL: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
      tokenURL: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
      graphApiVersion: "v1.0",
      addUPNAsEmail: false,
      apiEntryPoint: "https://graph.microsoft.com",
    },
    function (accessToken, refreshToken, profile, done) {
      try {
        profile.provider = "Microsoft";
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
