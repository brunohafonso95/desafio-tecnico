import { Router } from 'express';

import expressRouteAdapter from '@src/adapters/expressRouteAdapter';
import { signupFactoryController } from '@src/factories';

const routes = Router();

routes.post('/signup', expressRouteAdapter(signupFactoryController()));

export default routes;
