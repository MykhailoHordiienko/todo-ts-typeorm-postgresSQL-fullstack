import { BACKEND_KEYS } from '../modules/common/consts/app-keys.const';
import { AuthResponseType, AuthType } from '../modules/common/types/student.types';
import HttpService from './http.service';

const { LOGIN_USER, REGISTER_USER, CURRENT_USER } = BACKEND_KEYS;

export default class HttpAuthService {
  private httpAuthService: HttpService;

  constructor() {
    this.httpAuthService = new HttpService();
  }

  async signUp(newUser: AuthType) {
    await this.httpAuthService.post<AuthType>({ url: REGISTER_USER, data: newUser });
  }

  async signIn(userData: AuthType) {
    const user = await this.httpAuthService.post<AuthResponseType>({
      url: LOGIN_USER,
      data: userData
    });

    return user;
  }

  async current() {
    const user = await this.httpAuthService.get<AuthResponseType>(
      {
        url: CURRENT_USER
      },
      true
    );

    return user;
  }

  //   async upDateUser() {}
}
