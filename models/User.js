const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },

  phonenumber: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  Notes: {
    type: String,
  },
  ProfilePic: {
    Type: String,
    required: false,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
