const mongoose = require("mongoose");

const UsageSchema = new mongoose.Schema(
  {
    date: Date,
    format: String,
    pokemon: String,
    usage: {
      freq: Number,
      percent: Number
    }
  },
  {
    collection: "usage_test"
  }
);

module.exports = Usage = mongoose.model("usage", UsageSchema);
