/* eslint-disable camelcase */
const mysql = require('mysql2/promise');
const dbConfig = require('../config');

async function registerUser(name, surname, nickname, email, pass) {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const sql = `
    INSERT INTO users (name, surname, nickname, email, password) 
    VALUES (?, ?, ?, ?, ?)
    `;
    const [registerResult] = await conn.execute(sql, [name, surname, nickname, email, pass]);
    await conn.close;
    return registerResult;
  } catch (error) {
    return false;
  }
}

async function findUserByEmail(email) {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const sql = 'SELECT * FROM users WHERE email = ?';
    const [userfound] = await conn.execute(sql, [email]);
    await conn.close();
    return userfound;
  } catch (error) {
    return false;
  }
}

module.exports = {
  registerUser,
  findUserByEmail,
};
