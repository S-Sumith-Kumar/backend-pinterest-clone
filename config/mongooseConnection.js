const mongoose = require("mongoose");
const config = require("config");

const dbgr = require("debug")("development:mongoose");

mongoose
  .connect(`${config.get("MONGODB_URI")}/PinterestDB`)
  .then(function () {
    dbgr("connected");
  })
  .catch(function (err) {
    dbgr(err.message);
  });

module.exports = mongoose.connection;
