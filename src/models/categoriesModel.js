const mysql = require('mysql2/promise');
const dbConfig = require('../config');

async function getAllCategoriesFromDb() {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const [result] = await conn.query(
      'SELECT * FROM categories',
    );
    return result;
  } catch (error) {
    return false;
  }
}

async function createCategoryInDb(newCategoryData) {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const sql = `INSERT INTO categories (title) VALUES
                        (?)`;
    const { title } = newCategoryData;
    const [rows] = await conn.query(sql, [title]);

    return rows;
  } catch (error) {
    return false;
  }
}

module.exports = {
  getAllCategoriesFromDb,
  createCategoryInDb,
};
