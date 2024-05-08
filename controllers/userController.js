require('dotenv').config();
const UserModel = require('../model/userModel');
const PostModel = require('../model/postModel');
const {Op} = require('sequelize');
const { v4 : uuidv4 } = require('uuid');
const {createUserValidation, editUserValidation, loginValidation} = require('../validations/userValidation');
const {hashPassword, comparePassword} = require('../utils/userHelpers');

const createUser = async (req,res)=>{
  try{

    createUserValidation(req.body);

    if(error !== undefined) throw new Error(error.details[0].message, 400);

    const { surname, othernames, username, email, password} = req.body;

    const getUser = await getUserViaEmail(email);

    if(getUser.length > 0) throw new Error('User already exists', 400);

    const {salt, hash} = await hashPassword(password);

    delete req.body.password;

    req.body.user_id = uuidv4();
    req.body.password_hash = hash;
    req.body.password_salt = salt;

    const newUser = await UserModel.create(req.body);
      

    res.status(201).json({
      status: true,
      message: 'User created successfully',
      data: newUser
    });

  }catch(error){
    console.log(error);
    res.status(500).json({
      status: false,
      message: error.message
    });
  }
};

const editUser = async (req, res) => {
  try{
    const {user_id} = req.query;
    editUserValidation(req.body);
    if(error !== undefined) throw new Error(error.details[0].message, 400);

    const getUserId = await getUserViaId(user_id);

    const userId = getUserId.user_id;

    await UserModel.update(req.body,{where:{user_id: userId}});

    res.status(200).json({
      status: true,
      message: 'User updated successfully'
    });


  }catch(error){
    res.status(500).json({
      status: false,
      message: error.message
    });
  };
};

const loginUser = async (req,res) => {
  const {usernameOrEmail, password} = req.body;

  loginValidation(req.body);
  try{
    if(error !== undefined) throw new Error(error.details[0].message);
  
    const getUser = await UserModel.findOne({
      where: {
        [Op.or] : [
                    {username : usernameOrEmail},
                    {email : usernameOrEmail},
                  ],       
      }
    });

    if(getUser === null) throw new Error('Incorrect Email or Password.', 400)

    const DB_Hash = getUser.password_hash;
    const DB_Salt = getUser.password_salt;


    const {hash} = await comparePassword(password, DB_Salt)

    if(hash !== DB_Hash) throw new Error('Incorrect Email or Password', 400);

    const user = await UserModel.findOne({
      attributes : ["user_id", "surname", "othernames", "username", "email", "occupation", "about_me"],
      where: {
        [Op.or] : [
                    {username : usernameOrEmail},
                    {email : usernameOrEmail},
                  ],
        [Op.and] : [
                    {password_hash : hash}
                  ]          
              }
    });

    res.status(200).json({
      status : true,
      message : 'Login Successful',
      data : user
    })

  }catch(error){
    console.log(error);
    res.status(500).json({
      status: false,
      message: error.message
    });
  };
};

const getAllPosts = async (req,res)=>{
  try{

    const {username} = req.query;
    
    if(!username) throw new Error('All credentials required', 400);

    const getUser= await UserModel.findOne({
      where: {username: username}
    });

    if(!getUser) throw new Error('User not found', 400);

    const userId = getUser.user_id;

    const allPosts = await PostModel.findAll({
      attributes: ["post", "post_id"],
      where: {
        user_id : userId
      }
    });

    if(allPosts.length === 0) throw new Error('User has no post yet', 400);

    res.status(200).json({
      status:  true,
      message: "All posts fetched successfully",
      data: allPosts

  });

  } catch(error){
    res.status(500).json({
      status: false,
      message: error.message
    });
  };
};

const getSinglePost = async (req,res) =>{
  try{
    const {username, post_id} = req.query;

    const getUser = await UserModel.findOne({
      where: {username: username}
    });

    if(getUser === null) throw new Error("User not found", 400);

    const userId = getUser.user_id;

    const getPost = await PostModel.findOne({
      attributes: ["post_id", "post"],
      where: {[Op.and] : [
        {post_id: post_id},
        {user_id: userId}
      ]}
    });

    if(getPost === null) throw Error("No post found", 400);

    res.status(200).json({
      status: true,
      message: "Post Fetched successfully",
      data: getPost
    });

  }catch(error){
    res.status(500).json({
      status: false,
      message: error.message
    });
  };
};

const getUserViaId = (userId)=>{
  return UserModel.findOne({
      where: { user_id: userId}
    });
};


const getUserViaEmail = (email)=>{
  return UserModel.findAll({
    where: { email: email}
  });
};

module.exports = {
                    createUser, 
                    editUser,
                    loginUser,
                    getAllPosts,
                    getSinglePost
                  };