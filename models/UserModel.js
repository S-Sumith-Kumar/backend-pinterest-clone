const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const UserSchema = Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImage: { type: String },
  contact: { type: Number, default: null},
  bio: { type: String, default: null },
  website: { type: String, default: null }, // make it in future versions
  location: { type: String, default: null }, // make it in future versions
  joined: { type: Date, default: Date.now },
  active: { type: Boolean, default: true }, // make it in future versions
  following: [{ type: ObjectId, ref: "User" }], // make it in future versions
  followers: [{ type: ObjectId, ref: "User" }], // make it in future versions
  pins: [{ type: ObjectId, ref: "Pin" }],
  boards: [{ type: ObjectId, ref: "Board" }],
});

UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", UserSchema);
module.exports = User;