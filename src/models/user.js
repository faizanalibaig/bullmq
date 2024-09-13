const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  status: { type: String, required: true },
  processedAt: { type: Date, default: Date.now },
  jobData: { type: mongoose.Schema.Types.Mixed },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
