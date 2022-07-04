const mysql = require('mysql2/promise');
const dbConfig = require('../config');

async function getAllRecipesFromDb() {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const [result] = await conn.query('SELECT * FROM recipes');
    return result;
  } catch (error) {
    return false;
  }
}

async function createRecipeInDb(newRecipeData) {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const sql = `INSERT INTO recipes (user_id, category_id, title, ingredients, process, img_url) VALUES
                          (?, ?, ?, ?, ?, ?)`;
    const {
      user_id,
      category_id,
      title,
      ingredients,
      process,
      img_url,
    } = newRecipeData;
    const [rows] = await conn.query(sql, [
      user_id,
      category_id,
      title,
      ingredients,
      process,
      img_url,
    ]);
    return rows;
  } catch (error) {
    return false;
  }
}

async function deleteRecipeInDb(id, user_id) {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const sql = 'DELETE FROM recipes WHERE id = ? and user_id = ? LIMIT 1';
    const [rows] = await conn.execute(sql, [id, user_id]);
    return rows;
  } catch (error) {
    return false;
  }
}

async function getSingleRecipeById(id) {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const sql = 'SELECT * FROM recipes WHERE id = ?';
    const [rows] = await conn.execute(sql, [id]);
    return rows;
  } catch (error) {
    return false;
  }
}

async function getRecipesByCategoryId(id) {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const sql = 'SELECT * FROM recipes WHERE category_id = ?';
    const [rows] = await conn.execute(sql, [id]);
    return rows;
  } catch (error) {
    return false;
  }
}

async function getUserRecipesByUserToken(userId) {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const sql = 'SELECT * FROM recipes WHERE user_id = ?';
    const [rows] = await conn.execute(sql, [userId]);
    return rows;
  } catch (error) {
    return false;
  }
}

async function updateRecipeInDb(newPostData, id, user_id) {
  try {
    const connection = await mysql.createConnection(
      dbConfig
    );
    const sql = `
      UPDATE recipes 
      SET category_id = ?, title = ?, ingredients = ?, process = ?, img_url = ?
      WHERE id = ? AND user_id = ?
      LIMIT 1
      `;
    const { category_id, title, ingredients, process, img_url } = newPostData;
    const [rows] = await connection.execute(sql, [
      category_id,
      title,
      ingredients,
      process,
      img_url,
      id,
      user_id
    ]);
    return rows;
  } catch (error) {
    return false;
  }
}

module.exports = {
  getAllRecipesFromDb,
  createRecipeInDb,
  deleteRecipeInDb,
  getSingleRecipeById,
  getRecipesByCategoryId,
  getUserRecipesByUserToken,
  updateRecipeInDb,
};
