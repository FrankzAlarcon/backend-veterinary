const config = require('../config');

const DB_USER = encodeURIComponent(config.dbUser);
const DB_PASSWORD = encodeURIComponent(config.dbPassword);

const URI = `postgres://${DB_USER}:${DB_PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

module.exports = {
  development: {
    URI,
    dialect: 'postgres',
  },
  production: {
    URI,
    dialect: 'postgres',
  },
};
