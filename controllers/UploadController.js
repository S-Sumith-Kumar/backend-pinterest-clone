const userModel = require("../models/userModel");
const postModel = require("../models/postModel");

const UploadHandler = async function (req, res) {
  if (!req.file) {
    req.flash("error", "No file was uploaded");
    return res.status(404).redirect("/profile");
  }

  const User = await userModel.findOne({
    username: req.session.passport.user,
  });

  const post = await postModel.create({
    user: User._id,
    imageUrl: req.file.filename,
    caption: req.body.caption,
  });

  User.posts.push(post._id);
  await User.save();

  req.flash("success", "Uploaded Image successfully");
  res.redirect("/profile");
};

module.exports = UploadHandler;