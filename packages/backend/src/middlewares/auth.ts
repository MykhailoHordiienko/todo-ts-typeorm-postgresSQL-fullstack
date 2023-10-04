import { NextFunction, Request, Response } from 'express';
// eslint-disable-next-line import/no-extraneous-dependencies
import passport from 'passport';

import { HttpError } from '../helpers/HttpError';
import { User } from '../entities/User';

const authJwt = (req: Request, res: Response, next: NextFunction) =>
  passport.authenticate('jwt', { session: false }, (err: Error, user: User) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      throw HttpError(401, 'Unauthorized');
    }

    if (!user.isVerified) {
      throw HttpError(401, 'Verify email');
    }

    req.user = user.id;
    next();
  })(req, res, next);

export default authJwt;
