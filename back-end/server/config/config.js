require('dotenv').config();
module.exports = {
  development: {
    username: process.env.DB_USERNAME_DEV || 'vbwandie',
    password: process.env.DB_PASSWORD_DEV || '123456',
    database: process.env.DB_DEV || 'chapter-11',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  test: {
    username: process.env.DB_USERNAME_TEST,
    password: process.env.DB_PASSWORD_TEST,
    database: process.env.DB_TEST,
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  production: {
    username: process.env.DB_USERNAME_PROD,
    password: process.env.DB_PASSWORD_PROD,
    database: process.env.DB_PROD,
    host: '127.0.0.1',
    dialect: 'postgres',
  },
};
