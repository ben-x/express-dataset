const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const hashPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  };
const comparePassword = (hashPassword, password) =>{
    return bcrypt.compareSync(password, hashPassword);
  };
const generateToken = (id, email, avatar_url) => {
    const token = jwt.sign({
      userId: id, email, avatar_url
    },
    process.env.SECRET, { expiresIn: '45m' });
    return token;
  };

  module.exports = {
	hashPassword: hashPassword,
	comparePassword: comparePassword,
	generateToken: generateToken,
};