import SignupController from '@src/controllers/SignUpController';
import { Router  } from 'express';

const signupController = new SignupController();

const routes = Router();

routes.post('/signup', signupController.handleSignupRoute.bind(signupController));

export default routes;
