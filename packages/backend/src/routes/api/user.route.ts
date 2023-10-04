import { Router } from 'express';
import tryCatchWrapper from '../../middlewares/tryCatchWrapper';
import authController from '../../controllers/auth.controller';
import validateBody from '../../middlewares/validateBody';
import schemas from '../../schemas/authSchemas';

const userRouter: Router = Router();

userRouter.post(
  '/register',
  validateBody(schemas.userSchema),
  tryCatchWrapper(authController.register.bind(authController))
);

userRouter.get(
  '/verify/:verificationToken',
  tryCatchWrapper(authController.verifyEmail.bind(authController))
);
userRouter.post(
  '/login',
  validateBody(schemas.userSchema),
  tryCatchWrapper(authController.login.bind(authController))
);

userRouter.put(
  '/update',
  validateBody(schemas.updateSchema),
  tryCatchWrapper(authController.changePassword.bind(authController))
);

userRouter.get('/all', tryCatchWrapper(authController.getAll.bind(authController)));

export default userRouter;
