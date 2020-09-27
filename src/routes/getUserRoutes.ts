import { Router } from 'express';

import expressRouteAdapter from '@src/adapters/expressRouteAdapter';
import { getUserFactoryController } from '@src/factories';
import authMiddleware from '@src/middlewares/authMiddleware';

const routes = Router();

routes.get(
  '/users/:user_id',
  authMiddleware,
  expressRouteAdapter(getUserFactoryController()),
);

export default routes;
