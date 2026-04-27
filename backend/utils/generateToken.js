const jwt = require("jsonwebtoken");
require('dotenv').config();
const generateToken = (userId) => {
  const token = jwt.sign({ id: userId }, process.env.SECRET, {
    expiresIn: "1d",
  });
  return token 
};
module.exports = generateToken