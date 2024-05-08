require('dotenv').config();
const ADMIN_API_KEY = process.env.ADMIN_API_KEY;
const DELETE_API_KEY = process.env.DELETE_API_KEY;

const adminApiKey = (key)=>{
  if(ADMIN_API_KEY === key){
    return true
  }
  return false;
};

const DeleteApiKey = (key)=>{
  if(DELETE_API_KEY === key){
    return true
  }
  return false;
};

module.exports = {
                    adminApiKey,
                    DeleteApiKey
                  };