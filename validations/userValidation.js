const Joi = require('joi');

const createUserValidation = (data) =>{
  const createUserSchema = Joi.object({
    surname: Joi.string().required(),
    othernames: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  return {error} = createUserSchema.validate(data);
};

const editUserValidation = (data) =>{
  const editUserSchema = Joi.object({
    surname: Joi.string(),
    othernames: Joi.string(),
    username: Joi.string(),
    occupation: Joi.string(),
    about_me: Joi.string()
  });
  return {error} = editUserSchema.validate(data);
};

const loginValidation = (data)=>{
  const loginSchema = Joi.object({
    usernameOrEmail: Joi.string().required(),
    password: Joi.string().required()
  });
  return {error} = loginSchema.validate(data);
}

module.exports = {
                  createUserValidation,
                  editUserValidation,
                  loginValidation
};