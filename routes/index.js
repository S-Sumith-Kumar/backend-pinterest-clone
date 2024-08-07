const dbug = require("debug")("development: indexjs");

const express = require("express");
const router = express.Router();

const Handler = require("../controllers/authController");
const isLoggedIn = require("../middlewares/isLoggedIn");

/* Get Routes */

/* Index Page */
router.get("/", isLoggedIn,function (req, res) {
  res.redirect("/profile");
});

/* Login Page */
router.get("/login", function (req, res) {
  const error = req.flash("error");
  const success = req.flash("success");
  res.render("login", { title: "Login", Handler: true, error, success });
});

/* register Page */
router.get("/register", function (req, res) {
  const error = req.flash("error");
  const success = req.flash("success");
  res.render("signup", { title: "Registration", Handler: true, error, success });
});

/* Profile Page */
router.get("/profile", isLoggedIn, function(req, res) {
  const user = req.user;
  res.render("profile", { title: "Profile", Handler: false, user, imgNo: 3 });
});

/* Post Route */

/* register Post Route */
router.post("/register", Handler.Register);

/* login Post Route */
router.post("/login", Handler.Login);

/* Logout Route */
router.get("/logout", Handler.Logout);

/* exporting router */
module.exports = router;
