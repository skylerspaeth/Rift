const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports.riftSchema = new Schema({
  owner: Number,
  title: String,
  name: String,
  desc: String,
  banner: String
});

// mongoose.model("Rift", riftSchema);
