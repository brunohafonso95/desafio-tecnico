import { Router } from 'express';

import expressRouteAdapter from '@src/adapters/expressRouteAdapter';
import { signinFactoryController } from '@src/factories';

const routes = Router();

routes.post('/signin', expressRouteAdapter(signinFactoryController()));

export default routes;
