import { NextFunction, Request, Response } from 'express';
import { EntityTarget, ObjectLiteral } from 'typeorm';
import connectDB from '../config/database';
import { HttpError } from '../helpers/HttpError';
import tryCatchWrapper from './tryCatchWrapper';

const isExist = (entity: EntityTarget<ObjectLiteral>) =>
  tryCatchWrapper(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const db = connectDB.getRepository(entity);
    const element = await db.findOneBy({ id });

    if (!element) {
      throw HttpError(404, 'Not Found');
    }
    next();
  });

export default isExist;
