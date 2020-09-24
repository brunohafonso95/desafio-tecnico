import { Router } from 'express';

import SigninController from '@src/controllers/SignInController';

const signinController = new SigninController();

const routes = Router();

routes.post(
  '/signin',
  signinController.handleSigninRoute.bind(signinController),
);

export default routes;
