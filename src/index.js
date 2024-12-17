const express = require("express");
const session = require("express-session");
const passport = require("passport");
const isLogged = require("./utils/authMiddleware");
const restRoutes = require("./rest");
const cors = require("cors");

require("./auth");

const app = express();
const port = 3000;

const allowedOrigins = ["http://localhost:3001"];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Origin not allowed by CORS"));
    }
  },
  credentials: true, // Si tu utilises des sessions/cookies
};

app.use(cors(corsOptions));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

app.use("/", restRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
