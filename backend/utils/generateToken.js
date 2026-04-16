const jwt = require("jsonwebtoken");
require('dotenv').config();
const generateToken = (userId) => {
  const token = jwt.sign({ _id: userId }, process.env.JWT_TOKEN, {
    expiresIn: "1d",
  });
  return token 
};
module.exports = generateToken