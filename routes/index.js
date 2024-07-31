const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel");
const postModel = require("../models/postModel");
const isLoggedIn = require("../middlewares/isLoggedIn");
const passport = require("passport");

const LocalStrategy = require("passport-local");
passport.authenticate(new LocalStrategy(userModel.authenticate()));

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

router.get("/profile", isLoggedIn,function (req, res) {
  res.send("profile");
});

router.post("/register", function (req, res) {
  const { username, password, email, fullName } = req.body;
  const userData = new userModel({ username, email, fullName });

  userModel
    .register(userData, password)
    .then(function () {
      passport.authenticate("local")(req, res, function (err){
        res.redirect("/profile");
      })
    })
    .catch(function (err) {
      req.flash("error", err.message);
      res.redirect("/");
    });
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/profile",
  failureRedirect: "/",
  failureFlash: true,
}), function (req, res) {

});

router.get("/logout", function (req, res) {
  req.logout(function (err) {
    if (err) return next(err);
    req.flash("success", "Logged Out Successfully!");
    res.redirect("/");
  });
});

module.exports = router;
