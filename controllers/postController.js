const PostModel = require('../model/postModel');
const UserModel = require('../model/userModel');
const ReactionModel = require('../model/reactionModel');
const {createPostValidation} = require('../validations/postValidation');
const { v4:uuidv4 } = require('uuid');
const{DeleteApiKey} = require('../utils/authorization');
const {reactionENUM} = require('../constant/enum');


const createPost = async (req, res)=>{

  try{
    createPostValidation(req.body);

  if(error !== undefined) throw new Error(error.details[0].message, 400);

  const {username, post} = req.body;

  const getUserViaUsername = await UserModel.findOne({
    where:{
      username: username
    }
  });

  if(getUserViaUsername === null) throw new Error('Input a valid username', 400);

  const user_id = getUserViaUsername.user_id;
  delete req.body.username;

  req.body.post_id = uuidv4();
  req.body.user_id = user_id;

  const newPost = await PostModel.create(req.body);

  res.status(201).json({
    status: true,
    message: 'Post created successfully',
    data: newPost
  });

  }catch(error){
    res.status(500).json({
      status : false,
      message: error.message
    });
  };

};

const deletePost = async (req, res) =>{
  try{

  const {apikey} = req.headers;
  const {postId} = req.params;

  if(!DeleteApiKey(apikey)) throw new Error('Unauthorized Access', 401)

  const getPost = await PostModel.findOne({
    where: {
      post_id : postId
    }
  });

  if(getPost === null) throw new Error("Invalid Credentials");

  const post_id = getPost.post_id;

  await PostModel.destroy({
    where: {
      post_id : post_id
    }
  });

  res.status(200).json({
    status : true,
    message : " Post Successfully deleted."
  });

  }catch(error){
    console.log(error);
    res.status(500).json({
      status : false,
      mnessage: error.message
    });
  };

};

const getAllPost = (req, res) => {

};

const addReaction = async (req, res)=>{

  try{
    
    const {reaction} = req.query;
    const {user_id, post_id} = req.body;

    if(!user_id || !post_id) throw new Error('All fields are required', 400);

    const getUser = await UserModel.findOne({
      where: {
        user_id
      }
    });

    if(getUser === null) throw new Error('Only registered users are allowed to react to post', 401);

    const getPost = await PostModel.findOne({
      where:{
        post_id
      }
    });

    if(getPost === null) throw new Error('This post does not exit', 400);

    
    if(reaction === reactionENUM.LIKE || ''){
      const like = await ReactionModel.create({
        reaction_id : uuidv4(),
        user_id : user_id,
        post_id : post_id,
        reaction : reactionENUM.LIKE
      });

      res.status(200).json({
        status : true,
        message: "like",
        date: like
      });

    } else if(reaction === reactionENUM.DISLIKE){

      const dislike = await ReactionModel.create({
        reaction_id : uuidv4(),
        user_id : user_id,
        post_id : post_id,
        reaction : reactionENUM.DISLIKE
      });

      res.status(200).json({
        status : true,
        message: "dislike",
        date: dislike
      });

    } else if(reaction === reactionENUM.LOVE){
      
      const love = await ReactionModel.create({
        reaction_id : uuidv4(),
        user_id : user_id,
        post_id : post_id,
        reaction : reactionENUM.LOVE
      });

      res.status(200).json({
        status : true,
        message: "love",
        date: love
      });
    } else if(reaction === reactionENUM.FUNNY){
      
      const funny = await ReactionModel.create({
        reaction_id : uuidv4(),
        user_id : user_id,
        post_id : post_id,
        reaction : reactionENUM.FUNNY
      });

      res.status(200).json({
        status : true,
        message: "funny",
        date: funny
      });
    };
  }catch(error){
    res.status(500).json({
      status: false,
      message: error.message
    });
  }

};

const createComment = (req, res)=>{
  
}

module.exports = {
                    createPost,
                    deletePost,
                    addReaction
                  };