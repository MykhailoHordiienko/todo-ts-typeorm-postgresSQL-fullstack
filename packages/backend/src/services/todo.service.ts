import { ILike } from 'typeorm';
import { ToDo } from '../entities/ToDo';
import connectDB from '../config/database';
import { HttpError } from '../helpers/HttpError';
import { TypeUpdateTodo } from '../types/todos.type';
import { TODO_FILTER } from '../const/consts';

export default class TodoService {
  private db = connectDB.getRepository(ToDo);

  async getToDo(user: string, filter: string, search: string) {
    const usedFilter = filter ?? TODO_FILTER.ALL;
    switch (usedFilter) {
      case TODO_FILTER.ALL: {
        const notPrivateTodos = await this.db.find({
          where: {
            personal: false,
            title: ILike(`%${search}%`)
          }
        });
        const userTodos = await this.db.find({
          where: {
            userId: user,
            personal: !false,
            title: ILike(`%${search}%`)
          }
        });
        const todos = [...notPrivateTodos, ...userTodos];
        return todos;
      }
      case TODO_FILTER.COMPLETED: {
        const notPrivateTodos = await this.db.find({
          where: {
            personal: false,
            isCompleted: true,
            title: ILike(`%${search}%`)
          }
        });
        const userTodos = await this.db.find({
          where: {
            userId: user,
            personal: !false,
            isCompleted: true,
            title: ILike(`%${search}%`)
          }
        });
        const todos = [...notPrivateTodos, ...userTodos];

        return todos;
      }
      case TODO_FILTER.PUBLIC: {
        const todos = await this.db.find({
          where: {
            userId: user,
            personal: false,
            title: ILike(`%${search}%`)
          }
        });

        return todos;
      }
      case TODO_FILTER.PRIVATE: {
        const todos = await this.db.find({
          where: {
            userId: user,
            personal: true,
            title: ILike(`%${search}%`)
          }
        });

        return todos;
      }

      default:
        break;
    }
  }

  async getTodoById(id: string, user: string) {
    const todo = await this.db.findOneBy({ id });

    if (todo?.personal !== false && todo?.userId !== user) {
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
