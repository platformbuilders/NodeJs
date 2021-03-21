import { Router } from 'express';
import UsersController from '../controllers/UsersController';

const usersRouter = Router();
const userController = new UsersController();

usersRouter.get('/', userController.index);
usersRouter.get('/:id', userController.show);
usersRouter.post('/', userController.create);
usersRouter.put('/:id', userController.update);
usersRouter.delete('/:id', userController.delete);

export default usersRouter;
