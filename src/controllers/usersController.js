const { getAllUsersFromDb, getSingleUserById } = require('../models/usersModel');
const { failResponse, successResponse } = require('../utilities/dbHelper');
const { getUserId } = require('../utilities/middleware');

async function getAllUsers(req, res) {
  const allUsers = await getAllUsersFromDb();
  return allUsers === false
    ? failResponse(res)
    : successResponse(res, allUsers);
}

async function getUserById(req, res) {
  const recipeGetResult = await getSingleUserById(
    getUserId(req),
  );
  return recipeGetResult === false
    ? failResponse(res)
    : successResponse(res, recipeGetResult);
}

module.exports = {
  getAllUsers,
  getUserById,
};
