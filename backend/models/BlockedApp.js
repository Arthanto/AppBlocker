const mongoose = require("mongoose");

const BlockedAppSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ["social", "design", "browser", "productivity", "communication", "entertainment", "utility", "unknown"],
    default: "unknown"
  },
  appType: {
    type: String,
    enum: ["exe", "app", "deb", "msi", "dmg", "bin", "sh", "jar", "apk", "custom"],
    default: "custom"
  },
  path: {
    type: String,
    default: null
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  blockedReason: {
    type: String,
    default: "User blocked"
  }
});

module.exports = mongoose.model("BlockedApp", BlockedAppSchema);
