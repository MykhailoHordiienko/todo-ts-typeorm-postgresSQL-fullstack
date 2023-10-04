import { ToDo } from '../entities/ToDo';
import connectDB from '../config/database';
import { HttpError } from '../helpers/HttpError';
import { TypeUpdateTodo } from '../types/todos.type';

export default class TodoService {
  private db = connectDB.getRepository(ToDo);

  async getAllToDo(user: string) {
    const noyPrivateTodos = await this.db.find({
      where: {
        private: false
      }
    });
    const userTodos = await this.db.find({
      where: {
        userId: user
      }
    });
    const todos = [...noyPrivateTodos, ...userTodos];
    return todos;
  }

  async getTodoById(id: string, user: string) {
    const todo = await this.db.findOneBy({ id });

    if (todo?.private !== false && todo?.userId !== user) {
      throw HttpError(404, `Todo with id ${id} private`);
    }

    if (!todo) {
      throw HttpError(404, `Todo with id ${id} not found`);
    }
    return todo;
  }

  async createTodo(data: ToDo) {
    const todo = await this.db.save(data);
    return todo;
  }

  async updateTodo(id: string, data: TypeUpdateTodo, user: string) {
    const todo = await this.getTodoById(id, user);
    this.db.merge(todo, data);
    const result = await this.createTodo(todo);
    return result;
  }

  async deleteTodo(id: string, user: string) {
    const todoTodelete = await this.getTodoById(id, user);
    if (todoTodelete) {
      await this.db.delete(id);
    }
    return { message: `ToDo with id: ${id} deleted` };
  }
}
