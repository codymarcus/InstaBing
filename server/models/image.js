const Sequelize = require('sequelize');
const sequelize = require('../db');
const User = require('./user');

const Image = sequelize.define('image', {
  userId: {
    type: Sequelize.INTEGER,
    field: 'user_id'
  },
  url: {
    type: Sequelize.STRING
  },
  comment: {
    type: Sequelize.STRING
  }
}, {
  underscored: true
});

Image.belongsTo(User);

module.exports = Image;
