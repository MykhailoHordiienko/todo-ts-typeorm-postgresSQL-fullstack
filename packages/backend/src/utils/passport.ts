// eslint-disable-next-line
import passport from 'passport';
// eslint-disable-next-line
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';

import UserService from '../services/user.service';

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

const userService = new UserService();

passport.use(
  new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      const user = await userService.getUserById(payload);
      if (user) {
        return done(null, user);
      }

      return done(null, false);
    } catch (error) {
      return done(error, false);
    }
  })
);

export const passportJwt = passport.initialize();
