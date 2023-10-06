import { Response, Request } from 'express';
import UserService from '../services/user.service';
import { HttpError } from '../helpers/HttpError';
import { getHash, compareToHash } from '../utils/bcrypt.util';
import { generateToken } from '../utils/jwt.util';
// eslint-disable-next-line
import { nanoid } from 'nanoid';
import EmailService from '../services/email.service';
import { User } from '../entities/User';

export class AuthController {
  constructor(private authService: UserService, private emailService: EmailService) {}

  async register(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await this.authService.getUserByEmail(email);
    if (user) {
      throw HttpError(409, 'Email in use');
    }
    const hashPassword = await getHash(password);
    const verificationToken = nanoid();

    const newUser = await this.authService.createUser({
      ...req.body,
      password: hashPassword,
      verificationToken
    });
    await this.emailService.sendVerificationEmail({ verificationToken, email });

    res.status(201).json({
      email: newUser.email,
      id: newUser.id
    });
  }

  async verifyEmail(req: Request, res: Response) {
    const { verificationToken } = req.params;
    const user = await this.authService.getUserByVerification(verificationToken);

    if (!user) {
      throw HttpError(404, 'User not found');
    }

    const updateUser = new User();
    updateUser.isVerified = true;
    updateUser.verificationToken = '';

    await this.authService.updateUser(user.email, updateUser);

    res.redirect(process.env.VERIFI_REDIRECT_URL || 'http://localhost:3000/');
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const userCheck = await this.authService.getUserByEmail(email);
    if (!userCheck) {
      throw HttpError(401, 'Email or password is wrong');
    }

    if (!userCheck.isVerified) {
      throw HttpError(401, 'Verify Email!');
    }

    const comparePassword = await compareToHash(password, userCheck.password);
    if (!comparePassword) {
      throw HttpError(401, 'Email or password is wrong');
    }

    const user = {
      email: userCheck.email,
      id: userCheck.id
    };
    const token = generateToken(userCheck.id);
    res.json({ token, user });
  }

  async changePassword(req: Request, res: Response) {
    const { email, password, newPassword } = req.body;
    const userCheck = await this.authService.getUserByEmail(email);
    if (!userCheck) {
      throw HttpError(401, 'Email or password is wrong');
    }

    const comparePassword = await compareToHash(password, userCheck.password);
    if (!comparePassword) {
      throw HttpError(401, 'Email or password is wrong');
    }

    const hashPassword = await getHash(newPassword);

    const updateUser = new User();
    updateUser.password = hashPassword;

    await this.authService.updateUser(email, updateUser);
    const updatedUser = await this.authService.getUserByEmail(email);
    if (!updatedUser) {
      throw HttpError(401, 'Email or password is wrong');
    }
    const response = {
      id: updatedUser.id,
      email: updatedUser.email
    };

    res.status(200).json(response);
  }

  async current(req: Request, res: Response) {
    const { user } = req;
    if (!user) {
      throw HttpError(401, 'Unauthorized');
    }
    res.status(200).json('Ok');
  }

  async getAll(req: Request, res: Response) {
    const result = await this.authService.getAllUsers();
    res.status(200).json(result);
  }
}

const authController = new AuthController(new UserService(), new EmailService());

export default authController;
