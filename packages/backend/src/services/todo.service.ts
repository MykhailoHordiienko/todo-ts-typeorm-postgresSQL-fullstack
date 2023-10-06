// import { ILike } from 'typeorm';
import { ToDo } from '../entities/ToDo';
import connectDB from '../config/database';
import { HttpError } from '../helpers/HttpError';
import { TypeUpdateTodo } from '../types/todos.type';
import { TODO_FILTER } from '../const/consts';

export default class TodoService {
  private db = connectDB.getRepository(ToDo);

  async getToDo(user: string, filter: string, search: string, page: number, pageSize: number) {
    const usedFilter = filter ?? TODO_FILTER.ALL;
    let queryBuilder = this.db.createQueryBuilder('todo');

    switch (usedFilter) {
      case TODO_FILTER.ALL: {
        queryBuilder = queryBuilder
          .where('(todo.personal = false AND todo.title ILike :search)')
          .orWhere('(todo.userId = :userId AND todo.personal = true AND todo.title ILike :search)')
          .setParameters({ userId: user, search: `%${search}%` });
        break;
      }
      case TODO_FILTER.COMPLETED: {
        queryBuilder = queryBuilder
          .where('(todo.personal = false AND todo.isCompleted = true AND todo.title ILike :search)')
          .orWhere(
            '(todo.userId = :userId AND todo.personal = true AND todo.isCompleted = true AND todo.title ILike :search)'
          )
          .setParameters({ userId: user, search: `%${search}%` });
        break;
      }
      case TODO_FILTER.PUBLIC: {
        queryBuilder = queryBuilder
          .where('(todo.userId = :userId AND todo.personal = false AND todo.title ILike :search)')
          .setParameters({ userId: user, search: `%${search}%` });
        break;
      }
      case TODO_FILTER.PRIVATE: {
        queryBuilder = queryBuilder
          .where('(todo.userId = :userId AND todo.personal = true AND todo.title ILike :search)')
          .setParameters({ userId: user, search: `%${search}%` });
        break;
      }
      default:
        break;
    }

    const [todos, totalCount] = await queryBuilder
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();

    return { todos, totalCount, totalPages: Math.ceil(totalCount / pageSize) };
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
