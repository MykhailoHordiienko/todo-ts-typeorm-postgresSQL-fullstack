import { Router } from 'express';
import isExist from '../../middlewares/isExist';
import todoController from '../../controllers/todo.controller';
import { ToDo } from '../../entities/ToDo';
import tryCatchWrapper from '../../middlewares/tryCatchWrapper';
import validateBody from '../../middlewares/validateBody';
import schemas from '../../schemas/todoSchemas';
import authJwt from '../../middlewares/auth';

const todosRouter: Router = Router();

todosRouter.get('', authJwt, tryCatchWrapper(todoController.getTodo.bind(todoController)));

todosRouter.get(
  '/:id',
  authJwt,
  isExist(ToDo),
  tryCatchWrapper(todoController.getTodoById.bind(todoController))
);

todosRouter.post(
  '',
  authJwt,
  validateBody(schemas.createTodoSchema),
  tryCatchWrapper(todoController.addTodo.bind(todoController))
);

todosRouter.put(
  '/:id',
  authJwt,
  isExist(ToDo),
  validateBody(schemas.updateTodoSchema),
  tryCatchWrapper(todoController.updateTodo.bind(todoController))
);

todosRouter.delete(
  '/:id',
  authJwt,
  isExist(ToDo),
  tryCatchWrapper(todoController.deleteTodo.bind(todoController))
);

export default todosRouter;
