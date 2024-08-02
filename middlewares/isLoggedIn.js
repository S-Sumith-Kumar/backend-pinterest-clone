const isLoggedIn = async function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/account/login"); // Redirect to login or another appropriate page
};

module.exports = isLoggedIn;