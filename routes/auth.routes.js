const express = require("express");
const passport = require("passport");
const isAuthorized = require("../middleware/checkIsAuthorized");
const router = express.Router();

//GET @ /auth/login
router.get("/login", isAuthorized, (req, res) => {
  res.render("login", { user: req.user });
});

//GET @ /auth/google
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

//GET @ /auth/google/redirect
//redirect for google auth
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  res.redirect("/dashboard/");
});

//GET @ /auth/logout
router.get("/logout", (req, res) => {
  req.logOut((err) => {
    if (err) return console.error(err);
    res.redirect("/");
  });
});

module.exports = router;
