import Joi from 'joi';

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(5).required()
});

const updateSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(5).required(),
  newPassword: Joi.string().min(5).required()
});

export default { userSchema, updateSchema };
