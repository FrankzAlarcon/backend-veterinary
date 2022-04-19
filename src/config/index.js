require('dotenv').config();

const config = {
  isProd: process.env.NODE_ENV === 'production',
  dbName: process.env.DB_NAME,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbPort: process.env.DB_PORT,
  dbHost: process.env.DB_HOST,
  dbUri: process.env.DATABASE_URL,
};

module.exports = config;
