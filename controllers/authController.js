const debug = require("debug")("development:register");
const bcrypt = require("bcrypt");

const passport = require("passport");

const LocalStrategy = require("passport-local");
passport.use(new LocalStrategy(userModel.authenticate()));