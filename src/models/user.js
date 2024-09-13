const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String },
  message: { type: String },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
