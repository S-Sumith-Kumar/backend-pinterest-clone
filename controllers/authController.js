const debug = require("debug")("development:auth");
const UserModel = require("../models/UserModel");

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.use(new LocalStrategy(UserModel.authenticate()));

const Register = async function (req, res) {
  const { username, password, email, contact } = req.body;

  if (!username || !password || !email || !contact) {
    req.flash("error", "Please fill in all fields");
    return res.redirect("/register");
  }

  try {
    const userData = new UserModel({
      username,
      email,
      contact,
    });

    await UserModel.register(userData, password);

    passport.authenticate("local")(req, res, (err) => {
      if (err) {
        debug("Authentication error:", err);
        req.flash("error", "Authentication error. Please try again.");
        return res.redirect("/register");
      }

      res.redirect("/profile");
    });
  } catch (err) {
    debug("Registration error:", err);

    if (err.name === "UserExistsError") {
      req.flash(
        "error",
        "Username is already taken. Please choose another one."
      );
    } else if (err.code === 11000) {
      // Handling MongoServerError for duplicate email
      if (err.keyPattern && err.keyPattern.email) {
        req.flash(
          "error",
          "Email is already registered. Please use another email."
        );
      } else {
        req.flash("error", "Registration error. Please try again.");
      }
    } else {
      req.flash("error", "Registration error. Please try again.");
    }

    res.redirect("/register");
  }
};

const Login = async function (req, res, next) {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      debug("Authentication error:", err);
      req.flash(
        "error",
        err.message || "Authentication error. Please try again."
      );
      return res.redirect("/login");
    }
    if (!user) {
      req.flash("error", "Invalid username or password.");
      return res.redirect("/login");
    }
    req.logIn(user, function (err) {
      if (err) {
        debug("Login error:", err);
        req.flash("error", err.message || "Login error. Please try again.");
        return res.redirect("/login");
      }
      return res.redirect("/profile");
    });
  })(req, res, next);
};

const Logout = function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      debug("Error logging out:", err); // Log the error using debug
      req.flash("error", "Logout failed. Please try again.");
      return next(err); // Pass the error to the error handler
    }

    req.flash("success", "Logged Out Successfully!");
    res.redirect("/login");
  });
};

const FileUpload = async function (req, res) {
  try {
    const fileName = req.file.filename;
    const User = await UserModel.findOne({
      username: req.session.passport.user,
    });
    User.profileImage = fileName;
    await User.save();
    req.flash("success", "Profile picture updated successfully!");
    res.redirect("/profile");
  } catch (err) {
    debug("Error while uploading file: \n" + err.message);
    req.flash("error", "Error while uploading file. Please try again.");
    res.redirect("/profile");
  }
};

module.exports = { Register, Login, Logout, FileUpload };

/* req.user ?== req.session.passport.user */