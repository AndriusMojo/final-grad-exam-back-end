require('dotenv').config();

const config = {
  jwtSecret: process.env.JWT_TOKEN_SECRET,
};

module.exports = config;
