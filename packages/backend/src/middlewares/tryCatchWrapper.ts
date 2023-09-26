import { NextFunction, Request, Response } from 'express';

const tryCatchWrapper = (
  ctrl: (req: Request, res: Response, next: NextFunction) => Promise<void>
) => {
  const wrapper = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await ctrl(req, res, next);
    } catch (err) {
      next(err);
    }
  };
  return wrapper;
};

export default tryCatchWrapper;
