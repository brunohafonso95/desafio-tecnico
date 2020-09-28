import { Router } from 'express';

import expressRouteAdapter from '@src/adapters/expressRouteAdapter';
import { signupFactoryController } from '@src/factories';

const routes = Router();

/**
 * POST /signup
 * @tag Users
 * @summary Create a new user.
 * @description Create a new user
 * @bodyContent {User} application/json
 * @bodyRequired
 * @response 201 - The user has been created
 * @responseContent {UserCreatedResponse} 201.application/json
 * @response 400 - Invalid parameters
 * @responseContent {Error} 400.application/json
 * @response 401 - Unauthorized
 * @responseContent {AuthenticationError} 401.application/json
 * @response 500 - Internal Server Error
 * @responseContent {InternalServerError} 500.application/json
 */
routes.post('/signup', expressRouteAdapter(signupFactoryController()));

export default routes;
