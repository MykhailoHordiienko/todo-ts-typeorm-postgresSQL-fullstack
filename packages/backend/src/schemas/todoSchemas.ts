// eslint-disable-next-line
import joi from 'joi';

const createTodoSchema = joi.object({
  title: joi.string().required(),
  description: joi.string().required()
});

const updateTodoSchema = joi.object({
  title: joi.string().required(),
  description: joi.string().required(),
  isCompleted: joi.boolean().required()
});

export default { createTodoSchema, updateTodoSchema };
