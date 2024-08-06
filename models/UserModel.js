const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const UserSchema = Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  profileImage: { type: String },
  contact: { type: Number, default: null },
  bio: { type: String, default: null },
  joined: { type: Date, default: Date.now },
  pins: [{ type: ObjectId, ref: "Pin" }],
  boards: [{ type: ObjectId, ref: "Board" }],
  /* --------------------------------------------- */
  /*             This for future versions          */
  /* website: { type: String, default: null },     */
  /* location: { type: String, default: null },    */
  /* active: { type: Boolean, default: true },     */
  /* following: [{ type: ObjectId, ref: "User" }], */
  /* followers: [{ type: ObjectId, ref: "User" }], */
  /* Interests: [{ type: String, default: [] }],   */
  /* SavedPins: [{ type: ObjectId, ref: "Pin" }],  */
  /* --------------------------------------------- */
});

UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", UserSchema);
module.exports = User;
