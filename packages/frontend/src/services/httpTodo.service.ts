import { BACKEND_KEYS } from '../modules/common/consts/app-keys.const';
import { AddTodoType, TodoType } from '../modules/common/types/student.types';
import HttpService from './http.service';

const URL = BACKEND_KEYS.TODOS;

export default class HttpTodoService {
  private httpTodoService: HttpService;

  constructor() {
    this.httpTodoService = new HttpService();
  }

  async getTodos() {
    const { data } = await this.httpTodoService.get<TodoType[]>({ url: URL });
    return data;
  }

  async addTodo(todo: AddTodoType) {
    await this.httpTodoService.post<AddTodoType>({ url: URL, data: todo });
  }

  async updateTodo({ id, ...updatedTodo }: TodoType) {
    await this.httpTodoService.put<TodoType>({
      url: `${URL}/${id}`,
      data: updatedTodo
    });
  }

  async deleteTodo(id: string) {
    await this.httpTodoService.delete<null>({ url: `${URL}/${id}` });
  }
}