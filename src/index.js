const express = require("express");
const session = require("express-session");
const passport = require("passport");
const isLogged = require("./utils/authMiddleware");
const restRoutes = require("./rest");

require("./auth");

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

app.use(express.json());

app.use("/", restRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
