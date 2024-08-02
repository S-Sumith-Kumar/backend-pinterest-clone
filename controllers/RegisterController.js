const debug = require("debug")("development:register");
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");

const passport = require("passport");

const LocalStrategy = require("passport-local");
passport.use(new LocalStrategy(userModel.authenticate()));

const Register = async function (req, res) {
  const { username, password, email, fullName } = req.body;

  if (!username || !password || !email || !fullName) {
    req.flash("error", "Please fill in all fields");
    return res.redirect("/");
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = new userModel({
      username,
      email,
      fullName,
      password: hashedPassword,
    });

    await userModel.register(userData, password);

    passport.authenticate("local")(req, res, (err) => {
      if (err) {
        debug("Registration error:", err);
        req.flash("error", "Registration error. Please try again.");
        return res.redirect("/");
      }

      res.redirect("/feed");
    });
  } catch (err) {
    debug("Registration error:", err);

    if (err.name === 'UserExistsError') {
      req.flash('error', 'Username is already taken. Please choose another one.');
    } else if (err.code === 11000) {
      // Handling MongoServerError for duplicate email
      if (err.keyPattern && err.keyPattern.email) {
        req.flash('error', 'Email is already registered. Please use another email.');
      } else {
        req.flash('error', 'Registration error. Please try again.');
      }
    } else {
      req.flash('error', 'Registration error. Please try again.');
    }

    res.redirect("/");
  }
};

module.exports = Register;
