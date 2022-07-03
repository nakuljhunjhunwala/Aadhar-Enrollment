const mongoose = require('mongoose');

const aadharSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  phoneNumber: {
    type: Number,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  homeAddress: String,
  state: String
}, {
  timestamps: true
});

let aadhar = mongoose.model('Aadhar', aadharSchema)
module.exports = aadhar;

