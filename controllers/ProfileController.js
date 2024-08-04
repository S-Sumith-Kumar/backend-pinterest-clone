const nameSplitter = require("../utils/userspliter");
const userModel = require("../models/userModel");
const postModel = require("../models/postModel");

const ProfileHandler = async function (req, res) {
  let error = req.flash("error") || [];
  let success = req.flash("success") || [];

  const User = await userModel
    .findOne({
      username: req.session.passport.user,
    })
    .populate("posts");

  const Posts = User.posts;

  const { profilePic, username, fullName, bio } = User;

  let info = {
    error,
    success,
    title: "Profile",
    profilePic,
    fullName,
    username: nameSplitter(username),
    bio,
    Posts,
  };
  res.render("profile", info);
};

module.exports = ProfileHandler;
