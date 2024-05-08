const UserModel = require('../model/userModel');
const PostModel = require('../model/postModel')
const {adminApiKey} = require('../utils/authorization')


const getAllUsers = async (req, res)=>{
  
  try{

    const {apikey} = req.headers;
    if(!adminApiKey(apikey)) throw new Error('Unauthorized access', 401);

    const getAllUser = await UserModel.findAll();

    res.status(200).json({
      status : true,
      message: "All Users",
      data: getAllUser
    });

  } catch(error){
    res.status(500).json({
      status: false,
      message: error.message
    });
  };
};

const getSingleUser = async(req, res)=>{
  try{
    const {apikey} = req.headers;
    const {user_id} = req.query;

    if(!adminApiKey(apikey)) throw new Error('Unauthorized access', 401);

    const singleUser = await UserModel.findOne({
      where: {user_id : user_id}
    });

    if(singleUser === null) throw new Error('The user does not exist', 400);

    res.status(200).json({
      status: true,
      message: "User Fetched.",
      data: singleUser
    });
  }catch(error){
    console.log(error);
    res.status(500).json({
      status: false,
      message: error.message
    });
  }
};

const getUserAllPost = async (req, res) => {
  try{
    const allUsersPosts = await PostModel.findAll({
      attributes: ["user_id", "post"]
    });
    res.status(200).json({
      status: true,
      message: "Users and posts fetched.",
      data: allUsersPosts
    });
  }catch(error){
    res.status(500).json({
      status: false,
      message: error.message
    });
  };
};


module.exports = {
                    getAllUsers,
                    getSingleUser,
                    getUserAllPost
                  };
                  