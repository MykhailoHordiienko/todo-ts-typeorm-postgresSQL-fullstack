import { User } from '../entities/User';
import connectDB from '../config/database';
import { HttpError } from '../helpers/HttpError';

export default class UserService {
  private db = connectDB.getRepository(User);

  async createUser(user: User) {
    const newUser = await this.db.save(user);
    return newUser;
  }

  async getAllUsers() {
    const users = await this.db.find();
    return users;
  }

  async getUserById(id: string) {
    const user = await this.db.findOneBy({ id });
    if (!user) {
      throw HttpError(404, `User with id ${id} not found`);
    }
    return user;
  }

  async getUserByVerification(verificationToken: string) {
    const user = await this.db.findOneBy({ verificationToken });
    if (!user) {
      throw HttpError(404, `User with id ${verificationToken} not found`);
    }
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.db.findOneBy({
      email
    });
    return user;
  }

  async updateUser(id: string, userToUpdate: User) {
    const user = await this.getUserById(id);
    this.db.merge(user, userToUpdate);
    const result = await this.createUser(user);
    return result;
  }
}
