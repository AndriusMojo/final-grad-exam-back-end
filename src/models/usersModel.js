const mysql = require('mysql2/promise');
const dbConfig = require('../config');

async function getAllUsersFromDb() {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const [result] = await conn.query('SELECT * FROM users');
    return result;
  } catch (error) {
    return false;
  }
}

async function getSingleUserById(id) {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const sql = 'SELECT * FROM users WHERE id = ?';
    const [rows] = await conn.execute(sql, [id]);
    return rows;
  } catch (error) {
    return false;
  }
}

module.exports = {
  getAllUsersFromDb,
  getSingleUserById,
};
