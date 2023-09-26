import { Request, Response, NextFunction } from 'express';
// eslint-disable-next-line
import { ObjectSchema } from 'joi';
import { HttpError } from '../helpers/HttpError';

const validateBody = (schema: ObjectSchema) => {
  const wrapper = (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    const { error } = schema.validate(data);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };
  return wrapper;
};
export default validateBody;
