const debug = require("debug")("development: routes");

const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel");
const postModel = require("../models/postModel");

const RegisterHandler = require("../controllers/RegisterController");
const LogoutHandler = require("../controllers/LogoutController");
const LoginHandler = require("../controllers/LoginController");
const isLoggedIn = require("../middlewares/isLoggedIn");

/* GET verification Page. */
router.get("/", isLoggedIn, function (req, res, next) {
  res.redirect("/feed");
});

/* GET Feed Page. */
router.get("/feed", isLoggedIn, function (req, res) {
  let error = req.flash("error") || [];
  let success = req.flash("success") || [];
  res.render("feed", { error, success, title: "Feed" });
});

/* GET Profile Page. */
router.get(
  "/profile",
  // isLoggedIn,
  function (req, res) {
    let error = req.flash("error") || [];
    let success = req.flash("success") || [];
    let info = {
      error,
      success,
      title: "Profile",
      profilePic: "default.jpeg",
      fullName: "Hay!",
      username: "Hay_Me_Profile",
      bio: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellendus, animi!",
      tagline: ["tags", " tags", " tags"]
    };
    res.render("profile", info);
  }
);

/* GET Login Page. */
router.get("/account/login", function (req, res) {
  let error = req.flash("error") || [];
  res.render("login", { error });
});

/* GET Sign Up Page. */
router.get("/account/register", function (req, res) {
  let error = req.flash("error") || [];
  res.render("index", { error });
});

/* POST Sign Up */
router.post("/register", RegisterHandler);

/* POST Login */
router.post("/login", LoginHandler);

/* GET Logout */
router.get("/logout", LogoutHandler);

module.exports = router;
