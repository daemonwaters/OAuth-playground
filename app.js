const express = require("express");
const initPassport = require("./config/passport.config");
const app = express();
const passport = require("passport");
const connectToDb = require("./config/db.config");
const PORT = process.env.PORT || 6500;
const session = require("express-session");
const IsLoggedIn = require("./middleware/checkIsLoggedIn");

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: "my-super-secret",
  })
);

connectToDb();
initPassport(passport);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", require("./routes/auth.routes"));

//render home page
app.get("/", (req, res) => {
  res.render("home", { user: req.user });
});

//render dashboard
app.get("/dashboard", IsLoggedIn, (req, res) => {
  res.render("dashboard", { user: req.user });
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
