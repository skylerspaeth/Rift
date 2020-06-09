const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports.messageSchema = new Schema({
  author: Number,
  content: String,
  visibility: Array,
  location: Array,
  reaction: Array,
  editedDate: String,
  creationDate: String
});

// mongoose.model("Message", messageSchema);
