const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

module.exports = async function (req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
};
