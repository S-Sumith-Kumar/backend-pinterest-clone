const dbug = require("debug")("development: indexjs");

const express = require("express");
const router = express.Router();

const Handler = require("../controllers/authController");

/* Get Routes */

/* Index Page */
router.get("/", function (req, res) {
  res.redirect("/login");
});

/* Login Page */
router.get("/login", function (req, res) {
  const error = req.flash("error");
  const success = req.flash("success");
  res.render("login", { title: "Login", error, success });
});

/* register Page */
router.get("/register", function (req, res) {
  res.render("signup", { title: "Registration" });
});

/* Post Route */

/* register Post Route */
router.post("/register", Handler.Register);

/* login Post Route */
router.post("/login", Handler.Login);

/* Logout Route */
router.get("/logout", Handler.Logout);

router.get("/backups", function(req, res) {
  res.send("Backup Page");
});

module.exports = router;
