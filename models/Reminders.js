const mongoose = require("mongoose");

const RemSchema = new mongoose.Schema({
  ConnectionID: {
    type: String,
    required: true,
  },
  Title: {
    type: String,
    required: true,
  },
  Message: {
    type: String,
    required: true,
  },
  Date: {
    type: Date,
    required: true,
  },
  Frequency: {
    type: String,
    required: true,
  },
});

const Rem = mongoose.model("Rem", RemSchema);

module.exports = Rem;
