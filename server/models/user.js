const Sequelize = require('sequelize');
const sequelize = require('../db');
const bcrypt = require('bcrypt-as-promised');

const User = sequelize.define('user', {
  email: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  username: {
    type: Sequelize.STRING
  }
}, {
  underscored: true
});

User.beforeCreate(function(user) {
  return bcrypt.genSalt(10)
    .then(function(salt) {
      return bcrypt.hash(user.password, salt);
    })
    .then(function(hash) {
      user.password = hash;
    });
});

User.Instance.prototype.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = User;
