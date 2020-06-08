const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports.userSchema = new Schema({
  uid: Number,
  displayName: String,
  email: String,
  userIcon: String,
  token: String,
  password: String,
  roles: Array,
  locale: String,
  creationDate: String
});

// mongoose.model("User", userSchema);