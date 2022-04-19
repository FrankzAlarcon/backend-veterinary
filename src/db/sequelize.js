const { Sequelize } = require('sequelize');
const config = require('../config');
const setupModels = require('./models/index');

const options = {
  dialect: 'postgres',
  logging: config.isProd ? false : console.log,
};
if (config.isProd) {
  options.dialectOptions = {
    ssl: {
      rejectUnauthorized: false,
    },
  };
}

const sequelize = new Sequelize(config.dbUri, options);

setupModels(sequelize);

module.exports = sequelize;
