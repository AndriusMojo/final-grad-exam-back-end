/* eslint-disable camelcase */
const { registerUser, findUserByEmail } = require('../models/authModel');
const { hashPass, verifyHash, generateJwtToken } = require('../utilities/auth');
const { failResponse, successResponse } = require('../utilities/dbHelper');

async function userRegister(req, res) {
  const {
    name, surname, nickname, email, password,
  } = req.body;
  const hashedPass = hashPass(password);
  const insertResult = await registerUser(name, surname, nickname, email, hashedPass);

  return insertResult === false
    ? failResponse(res)
    : successResponse(res, 'User successfully created');
}

async function userLogin(req, res) {
  const { email, password } = req.body;
  const userFindResult = await findUserByEmail(email);
  if (userFindResult === false) return failResponse(res);
  if (!userFindResult.length) {
    return failResponse(res, 'Email or password incorrect');
  }
  const foundUSerObj = userFindResult[0];
  if (!verifyHash(password, foundUSerObj)) {
    return failResponse(res, 'Email or password incorrect');
  }
  const token = generateJwtToken(foundUSerObj);
  return successResponse(res, token);
}

module.exports = {
  userRegister,
  userLogin,
};
