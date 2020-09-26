import { Router } from 'express';

import GetUserController from '@src/controllers/GetUserController';
import authMiddleware from '@src/middlewares/authMiddleware';

const getUserController = new GetUserController();

const routes = Router();

routes.get(
  '/users/:user_id',
  authMiddleware,
  getUserController.handleGetUserByIdRoute.bind(getUserController),
);

export default routes;
