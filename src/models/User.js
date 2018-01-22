const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  login: {
    type: String,
    unique: true,
  },
  pushToken: {
    type: String,
    unique: true,
  },
  pushEnabled: {
    type: Boolean,
    default: true,
  },
  pushCommit: {
    type: Boolean,
    default: true,
  },
  pushIssue: {
    type: Boolean,
    default: true,
  },
  pushPr: {
    type: Boolean,
    default: true,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = { User };
