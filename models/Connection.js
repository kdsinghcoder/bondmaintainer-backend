const mongoose = require('mongoose');

const ConSchema = new mongoose.Schema({
    UserID: {
        type: String,
        required: true
  },
  Name: {
    type: String,
    required: true
  },
  PhoneNumber: {
    type: String,
    required: true
  },
  ProfilePic: {
    type: String,
    required: true
  }
});

const Con = mongoose.model('Con', ConSchema);

module.exports = Con;
