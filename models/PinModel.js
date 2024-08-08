const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const PinSchema = Schema({
    title: { type: String, required: true },
    description: String,
    imageUrl: { type: String, required: true },
    user: { type: ObjectId, ref: "User" },
    // board: { type: ObjectId, ref: "Board" },
    createdAt: { type: Date, default: Date.now },
});

const Pin = mongoose.model("Pin", PinSchema);
module.exports = Pin;