const debug = require("debug")("development:login");
// const passport = require("passport");

const Login = async function (req, res, next) {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      debug('Authentication error:', err);
      req.flash('error', err.message || 'Authentication error. Please try again.');
      return res.redirect('/');
    }
    if (!user) {
      req.flash('error', 'Invalid username or password.');
      return res.redirect('/');
    }
    req.logIn(user, function (err) {
      if (err) {
        debug('Login error:', err);
        req.flash('error', err.message || 'Login error. Please try again.');
        return res.redirect('/');
      }
      return res.redirect('/profile');
    });
  })(req, res, next);
};

module.exports = Login;
