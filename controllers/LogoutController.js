const debug = require("debug")("development:logout"); 

const Logout = function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      debug("Error logging out:", err); // Log the error using debug
      req.flash("error", "Logout failed. Please try again.");
      return next(err); // Pass the error to the error handler
    }

    req.flash("success", "Logged Out Successfully!");
    res.redirect("/");
  });
};

module.exports = Logout;
