const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports.postSchema = new Schema({
  owner: Number,
  title: String,
  content: String,
  visibility: Array,
  votes: Array,
  edited: Boolean,
  editedDate: String,
  creationDate: String
});

// mongoose.model("Post", postSchema);
