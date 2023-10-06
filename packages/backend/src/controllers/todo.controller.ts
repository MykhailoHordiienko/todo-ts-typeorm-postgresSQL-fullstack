import { Response, Request } from 'express';
import TodoService from '../services/todo.service';

export class TodoController {
  constructor(private todoService: TodoService) {}

  async getTodo(req: Request, res: Response) {
    const { user } = req;
    const { filter, search, pageNumber, limit } = req.query;
    const page = pageNumber ? parseInt(pageNumber as string, 10) : 1;
    const pageSize = limit ? parseInt(limit as string, 10) : 5;
    const todos = await this.todoService.getToDo(
      user as string,
      filter as string,
      search as string,
      page,
      pageSize
    );
    res.send(todos);
  }

  async getTodoById(req: Request, res: Response) {
    const { id } = req.params;
    const { user } = req;

    const todo = await this.todoService.getTodoById(id, user as string);
    res.send(todo);
  }

  async addTodo(req: Request, res: Response) {
    const data = req.body;
    const { user } = req;
    const dataToAdd = { ...data, userId: user };

    const todo = await this.todoService.createTodo(dataToAdd);
    res.status(201).send(todo);
  }

  async updateTodo(req: Request, res: Response) {
    const { id } = req.params;
    const data = req.body;
    const { user } = req;

    const todo = await this.todoService.updateTodo(id, data, user as string);
    res.send(todo);
  }

  async deleteTodo(req: Request, res: Response) {
    const { id } = req.params;
    const { user } = req;

    const result = await this.todoService.deleteTodo(id, user as string);
    res.send(result);
  }
}

const todoController = new TodoController(new TodoService());
export default todoController;
