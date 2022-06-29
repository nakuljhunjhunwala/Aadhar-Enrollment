const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true
  },
  password: String,
  role: String,
  aadharLink: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Aadhar"
  }
}, {
  timestamps: true
});

let users = mongoose.model('User', userSchema)
module.exports = users;

