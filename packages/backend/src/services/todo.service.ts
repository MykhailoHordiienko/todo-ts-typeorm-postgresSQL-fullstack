import { ToDo } from '../entities/ToDo';
import connectDB from '../config/database';
import { HttpError } from '../helpers/HttpError';
import { TypeTodo, TypeUpdateTodo } from '../types/todos.type';

export default class TodoService {
  private db = connectDB.getRepository(ToDo);

  async getAllToDo() {
    const toDos = await this.db.find();
    return toDos;
  }

  async getTodoById(id: string) {
    const todo = await this.db.findOneBy({ id });
    if (!todo) {
      throw HttpError(404, `Todo with id ${id} not found`);
    }
    return todo;
  }

  async createTodo(data: TypeTodo) {
    const todo = await this.db.save(data);
    return todo;
  }

  async updateTodo(id: string, data: TypeUpdateTodo) {
    const todo = await this.getTodoById(id);
    this.db.merge(todo, data);
    const result = await this.createTodo(todo);
    return result;
  }

  async deleteTodo(id: string) {
    await ToDo.delete(id);
    return { message: `ToDo with id: ${id} deleted` };
  }
}
