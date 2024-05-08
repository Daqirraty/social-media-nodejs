const bcrypt = require('bcrypt');
const saltRounds = 10;

const hashPassword = (password)=>{
  return new Promise((res,rej)=>{
    bcrypt.genSalt(saltRounds, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
          res({
            salt: salt, 
            hash: hash
          })
      });
    });
  });
};

const comparePassword = (password, salt) => {
  return new Promise((res, rej)=>{
    bcrypt.hash(password, salt, (err, hash) => {
        res({
          hash: hash
        })
    });
  });
};  

module.exports = {
                  hashPassword,
                  comparePassword
                };