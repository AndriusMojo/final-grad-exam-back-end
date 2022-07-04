const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_TOKEN_SECRET;

function hashPass(plainPassword) {
  return bcrypt.hashSync(plainPassword, 10);
}

function verifyHash(enteredPass, userObj) {
  return bcrypt.compareSync(enteredPass, userObj.password);
}

function generateJwtToken(userObj) {
  return jwt.sign({ id: userObj.id }, jwtSecret, { expiresIn: '2h' });
}

function verifyJwtToken(token) {
  try {
    const payload = jwt.verify(token, jwtSecret);
    return payload;
  } catch (err) {
    return false;
  }
}

module.exports = {
  hashPass,
  verifyHash,
  generateJwtToken,
  verifyJwtToken,
};
