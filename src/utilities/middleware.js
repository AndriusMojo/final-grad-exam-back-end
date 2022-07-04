const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { joiPassword } = require('joi-password');
const { verifyJwtToken } = require('./auth');
const { failResponse } = require('./dbHelper');
const { jwtSecret } = require('./jwtSecret');

async function registerUserValidate(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().min(2).required(),
    surname: Joi.string().min(2).required(),
    nickname: Joi.string().min(5).required(),
    email: Joi.string().email().required(),
    password: joiPassword
      .string()
      .min(5)
      .max(100)
      .minOfSpecialCharacters(1)
      .minOfLowercase(2)
      .minOfUppercase(1)
      .minOfNumeric(1)
      .noWhiteSpaces()
      .required(),
  });
  try {
    await schema.validateAsync(req.body, {
      abortEarly: false,
    });
    next();
  } catch (error) {
    // map
    const formatedError = error.details.map((detail) => ({
      message: detail.message,
      field: detail.context.key,
    }));
    failResponse(res, formatedError);
  }
}

async function loginUserValidate(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: joiPassword
      .string()
      .min(5)
      .max(100)
      .minOfSpecialCharacters(1)
      .minOfLowercase(2)
      .minOfUppercase(1)
      .minOfNumeric(1)
      .noWhiteSpaces()
      .required(),
  });
  try {
    await schema.validateAsync(req.body, {
      abortEarly: false,
    });
    next();
  } catch (error) {
    // map
    const formatedError = error.details.map((detail) => ({
      message: detail.message,
      field: detail.context.key,
    }));
    failResponse(res, formatedError);
  }
}

async function validateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const tokenGotFromUser =
    authHeader && authHeader.split(' ')[1];
  if (!tokenGotFromUser) {
    return failResponse(res, 'token not found', 401);
  }
  const verifyResult = verifyJwtToken(tokenGotFromUser);
  if (verifyResult === false) {
    return failResponse(res, 'invalid token', 403);
  }
  req.userId = verifyResult.id;
  next();
}

async function isLoggedIn(req, res, next) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    req.token = jwt.verify(token, jwtSecret);
    next();
  } catch (error) {
    res.status(401).send({ error: 'invalid token' });
  }
}

function getUserId(req) {
  const authHeader = req.headers.authorization;
  const tokenGotFromUser = authHeader && authHeader.split(' ')[1];
  const verifyResult = verifyJwtToken(tokenGotFromUser);
  return verifyResult.id;
}

function getObjWithUserId(req, data) {
  return Object.assign(
    { user_id: getUserId(req) },
      data
  );
}

module.exports = {
  registerUserValidate,
  loginUserValidate,
  validateToken,
  isLoggedIn,
  getObjWithUserId,
  getUserId
};
