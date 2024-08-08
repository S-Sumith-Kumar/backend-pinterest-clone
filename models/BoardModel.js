/* --------------------------------------------- */
/*             This for future versions          */
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

/* 

const BoardSchema = Schema({
  title: { type: String, required: true },
  description: String,
  privacy: {
    type: String,
    enum: ["public", "private", "secret"],
    default: "public",
  },
  owner: { type: ObjectId, ref: "User", required: true },
  collaborators: [{ type: ObjectId, ref: "User" }],
  pins: [{ type: ObjectId, ref: "Pin" }],
});

const Board = mongoose.model("Board", BoardSchema);
module.exports = Board;

*/