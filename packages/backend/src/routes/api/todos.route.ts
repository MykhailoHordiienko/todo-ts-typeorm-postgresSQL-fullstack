import { Router } from 'express';
import isExist from '../../middlewares/isExist';
import todoController from '../../controllers/todo.controller';
import { ToDo } from '../../entities/ToDo';
import tryCatchWrapper from '../../middlewares/tryCatchWrapper';
import validateBody from '../../middlewares/validateBody';
import schemas from '../../schemas/todoSchemas';

const todosRouter: Router = Router();

todosRouter.get('', tryCatchWrapper(todoController.getAllTodo.bind(todoController)));

todosRouter.get(
  '/:id',
  isExist(ToDo),
  tryCatchWrapper(todoController.getTodoById.bind(todoController))
);

todosRouter.post(
  '',
  validateBody(schemas.createTodoSchema),
  tryCatchWrapper(todoController.addTodo.bind(todoController))
);

todosRouter.put(
  '/:id',
  isExist(ToDo),
  validateBody(schemas.updateTodoSchema),
  tryCatchWrapper(todoController.updateTodo.bind(todoController))
);

todosRouter.delete(
  '/:id',
  isExist(ToDo),
  tryCatchWrapper(todoController.deleteTodo.bind(todoController))
);

export default todosRouter;
