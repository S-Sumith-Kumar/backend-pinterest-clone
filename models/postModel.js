const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now, // Automatically sets the current date and time
  },
  postText: {
    type: String,
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
    },
  ],
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User who posted
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
