'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  head: { type: Number, default: 0 },
  wordList: [{ spanish: String, english: String, mVal: Number, next: Number }],
  correctCount: { type: Number },
  totalGuesses: { type: Number }
});

userSchema.methods.validatePassword = function(password) {
  return password === this.password;
};

userSchema.set('toObject', {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.password;
    delete ret.__v;
    delete ret.wordList;
    // ret.wordList = doc.wordList[doc.head];
  }
});

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
};

module.exports = mongoose.model('User', userSchema);
