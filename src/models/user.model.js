const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('User', UserSchema);
