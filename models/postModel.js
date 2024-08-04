const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  caption: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User who posted
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      default: [], // Array to store the user IDs who have liked the post
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now, // Automatically sets the current date and time
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
