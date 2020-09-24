import { Router } from 'express';

import SignupController from '@src/controllers/SignUpController';

const signupController = new SignupController();

const routes = Router();

routes.post(
  '/signup',
  signupController.handleSignupRoute.bind(signupController),
);

export default routes;
