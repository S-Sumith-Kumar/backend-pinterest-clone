const express = require('express');
const router = express.Router();
const dbug = require("debug")("development: indexjs");

router.get('/', function(req, res) {  
  res.redirect('/login');
});

router.get("/login", function(req, res) {
  res.render("login", { title: "Login" });
});

router.get("/register", function(req, res) {
  res.render('registration', { title: "Registration" });
});

module.exports = router;
