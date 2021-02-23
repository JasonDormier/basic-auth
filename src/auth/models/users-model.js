'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Create a mongoose model
const usersSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

usersSchema.pre('save', function (next) {
  const user = this;
  console.log(this);
  bcrypt.hash(user.password, 10, (error, hash) => {
    if (error) {
      next(error);
    } else {
      user.password = hash;
      next();
    }
  });

});

usersSchema.statics.user = async function (username, password, next, req) {
  const user = await this.findOne({ username: username });
  const valid = await bcrypt.compare(password, user.password);
  if (valid) {
    req.user = user;
    next();
  }
  else {
    throw new Error('Invalid User');
  }
};

const Users = mongoose.model('users', usersSchema);
module.exports = Users;