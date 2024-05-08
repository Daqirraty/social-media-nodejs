const Joi = require('joi');

const createPostValidation = (data)=>{
  const createPostSchema = Joi.object({
    username : Joi.string().required(),
    post: Joi.string().required()
  });
  return {error} = createPostSchema.validate(data);
};


module.exports = {
                    createPostValidation
                  };