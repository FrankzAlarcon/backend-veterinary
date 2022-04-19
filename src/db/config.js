const config = require('../config');

module.exports = {
  development: {
    url: config.dbUri,
    dialect: 'postgres',
  },
  production: {
    url: config.dbUri,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
};
