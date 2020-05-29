const mongoose = require("mongoose");

var riftSchema = new mongoose.Schema(
  ((owner: {
    type: Integer,
  }),
  (title: {
    type: String,
  }),
  (name: {
    type: String,
  }),
  (desc: {
    type: String,
  }),
  (banner: {
    type: String,
  }))
);

mongoose.model("Rift", riftSchema);
