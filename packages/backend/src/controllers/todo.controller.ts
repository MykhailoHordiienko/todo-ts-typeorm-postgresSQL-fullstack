import { Response, Request } from 'express';
import TodoService from '../services/todo.service';

export class TodoController {
  constructor(private todoService: TodoService) {}

  async getAllTodo(req: Request, res: Response) {
    const { user } = req;
    const todos = await this.todoService.getAllToDo(user as string);
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
