import { Router } from 'express';

import expressRouteAdapter from '@src/adapters/expressRouteAdapter';
import { signinFactoryController } from '@src/factories';

const routes = Router();

/**
 * POST /signin
 * @tag Users
 * @summary Authenticate an user.
 * @description Authenticate an user
 * @bodyContent {UserAuth} application/json
 * @bodyRequired
 * @response 201 - The user credentials of authentication
 * @responseContent {AuthenticatedUserResponse} 201.application/json
 * @response 400 - Invalid parameters
 * @responseContent {Error} 400.application/json
 * @response 401 - Unauthorized
 * @responseContent {AuthenticationError} 401.application/json
 * @response 500 - Internal Server Error
 * @responseContent {InternalServerError} 500.application/json
 */
routes.post('/signin', expressRouteAdapter(signinFactoryController()));

export default routes;
