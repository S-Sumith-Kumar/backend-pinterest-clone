const debug = require("debug")("development: routes");

const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel");
const postModel = require("../models/postModel");

const RegisterHandler = require("../controllers/RegisterController");
const ProfileHandler = require("../controllers/ProfileController");
const LogoutHandler = require("../controllers/LogoutController");
const UploadHandler = require("../controllers/UploadController.js");
const LoginHandler = require("../controllers/LoginController");
const isLoggedIn = require("../middlewares/isLoggedIn");

const upload = require("../config/multer");

/* GET verification Page. */
router.get("/", isLoggedIn, function (req, res, next) {
  res.redirect("/feed");
});

/* GET Feed Page. */
router.get("/feed", async function (req, res) {
  let error = req.flash("error") || [];
  let success = req.flash("success") || [];

  const Posts = await postModel.find();
  res.render("feed", { error, success, title: "Feed", Posts });
});

/* GET Login Page. */
router.get("/account/login", function (req, res) {
  let error = req.flash("error") || [];
  res.render("login", { error });
});

/* GET Profile Page. */
router.get("/profile", isLoggedIn, ProfileHandler);

/* GET Sign Up Page. */
router.get("/account/register", function (req, res) {
  let error = req.flash("error") || [];
  res.render("index", { error });
});

/* POST upload */
// router.post("/upload", UploadHandler);
router.post("/upload", isLoggedIn, upload.single("image"), UploadHandler);

/* POST Sign Up */
router.post("/register", RegisterHandler);

/* POST Login */
router.post("/login", LoginHandler);

/* GET Logout */
router.get("/logout", LogoutHandler);

module.exports = router;
