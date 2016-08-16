const config = require('./config/config').development;
const Sequelize = require('sequelize');

// DB Setup
const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect
});

module.exports = sequelize;
