const dbug = require("debug")("development: indexjs");

const upload = require("../config/multerConfig");
const express = require("express");
const router = express.Router();

const UserModel = require("../models/UserModel");
const PinModel = require("../models/PinModel");

const Handler = require("../controllers/authController");
const isLoggedIn = require("../middlewares/isLoggedIn");

/* Get Routes */

/* Index Page */
router.get("/", isLoggedIn, function (req, res) {
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
  res.render("signup", {
    title: "Registration",
    Handler: true,
    error,
    success,
  });
});

/* Profile Page */
router.get("/profile", isLoggedIn, function (req, res) {
  const UserAndPin = UserModel.findOne({ username: req.session.passport.user }).populate('pins');
  const user = req.user;
  const error = req.flash("error");
  const success = req.flash("success");
  res.render("profile", {
    title: "Profile",
    error,
    success,
    Handler: true,
    user,
    UserAndPin,
    imgNo: 1,
  });
});

router.get("/add", isLoggedIn, function (req, res) {
  const user = req.user;
  res.render("add", { title: "Add Pin", Handler: false });
});

/* Post Route */

/* register Post Route */
router.post("/register", Handler.Register);

/* login Post Route */
router.post("/login", Handler.Login);

/* Logout Route */
router.get("/logout", Handler.Logout);

/* Pic Image Route */
router.post(
  "/fileupload",
  isLoggedIn,
  upload.single("file"),
  Handler.FileUpload
);

/* Pins Upload Route */
router.post(
  "/createpins",
  isLoggedIn,
  upload.single("postfile"),
  async function (req, res) {
    const imageUrl = req.file.filename;
    const { title, description } = req.body;

    const User = await UserModel.findOne({
      username: req.session.passport.user,
    });

    const Pin = await PinModel.create({
      title,
      description,
      imageUrl,
      user: User._id,
    });
    User.pins.push(Pin._id);
    await User.save();
    req.flash("success", "Pin uploaded successfully!");
    res.redirect("/profile");
  }
);

/* exporting router */
module.exports = router;
