import { BACKEND_KEYS } from '../modules/common/consts/app-keys.const';
import {
  AddTodoType,
  TodoType,
  TodoWithPaginationType
} from '../modules/common/types/student.types';
import HttpService from './http.service';

const URL = BACKEND_KEYS.TODOS;

export default class HttpTodoService {
  private httpTodoService: HttpService;

  constructor() {
    this.httpTodoService = new HttpService();
  }

  async getTodos(filter = 'all', search = '', pageNumber = '1', limit = '5') {
    const { data } = await this.httpTodoService.get<TodoWithPaginationType>(
      {
        url: `${URL}?pageNumber=${pageNumber}&limit=${limit}&filter=${filter}&search=${search}`
      },
      true
    );
    return data;
  }

  async addTodo(todo: AddTodoType) {
    await this.httpTodoService.post<AddTodoType>({ url: URL, data: todo }, true);
  }

  async updateTodo({ id, ...updatedTodo }: TodoType) {
    await this.httpTodoService.put<TodoType>(
      {
        url: `${URL}/${id}`,
        data: updatedTodo
      },
      true
    );
  }

  async deleteTodo(id: string) {
    await this.httpTodoService.delete<null>({ url: `${URL}/${id}` }, true);
  }
}
