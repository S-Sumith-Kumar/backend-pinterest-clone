const debug = require("debug")("development: routes");

const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel");
const postModel = require("../models/postModel");

const isLoggedIn = require("../middlewares/isLoggedIn");
const LoginHandler = require("../controllers/LoginController");
const LogoutHandler = require("../controllers/LogoutController");
const RegisterHandler = require("../controllers/RegisterController");

const passport = require("passport");

const LocalStrategy = require("passport-local");
passport.authenticate(new LocalStrategy(userModel.authenticate()));

/* GET home page. */
router.get("/", function (req, res, next) {
  let error = req.flash("error") || error;
  res.render("index", { error });
});

router.get("/profile", isLoggedIn, function (req, res) {
  res.send("profile");
});

router.post("/register", RegisterHandler);

router.post("/login", LoginHandler);

router.get("/logout", LogoutHandler);

module.exports = router;
