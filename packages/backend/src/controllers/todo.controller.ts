import { Response, Request } from 'express';
import TodoService from '../services/todo.service';

export class TodoController {
  constructor(private todoService: TodoService) {}

  async getAllTodo(_: Request, res: Response) {
    const todos = await this.todoService.getAllToDo();
    res.send(todos);
  }

  async getTodoById(req: Request, res: Response) {
    const { id } = req.params;
    const todo = await this.todoService.getTodoById(id);
    res.send(todo);
  }

  async addTodo(req: Request, res: Response) {
    const data = req.body;
    const todo = await this.todoService.createTodo(data);
    res.status(201).send(todo);
  }

  async updateTodo(req: Request, res: Response) {
    const { id } = req.params;
    const data = req.body;
    const todo = await this.todoService.updateTodo(id, data);
    res.send(todo);
  }

  async deleteTodo(req: Request, res: Response) {
    const { id } = req.params;
    const result = await this.todoService.deleteTodo(id);
    res.send(result);
  }
}

const todoController = new TodoController(new TodoService());
export default todoController;
