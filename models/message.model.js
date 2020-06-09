const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports.messageSchema = new Schema({
  author: Number,
  content: String,
  visibility: Array,
  location: Array,
  reaction: Array,
  edited: Boolean,
  editedDate: String,
  creationDate: String
});

// mongoose.model("Message", messageSchema);
