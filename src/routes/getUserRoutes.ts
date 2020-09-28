import { Router } from 'express';

import expressRouteAdapter from '@src/adapters/expressRouteAdapter';
import { getUserFactoryController } from '@src/factories';
import authMiddleware from '@src/middlewares/authMiddleware';

const routes = Router();

/**
 * GET /users/{user_id}
 * @tag Users
 * @security apiKey
 * @summary Get information of an user based on Id.
 * @pathParam {string} user_id
 * @description Get information of an user based on Id
 * @response 200 - The user credentials of authentication
 * @responseContent {AuthenticatedUserResponse} 200.application/json
 * @response 400 - Invalid parameters
 * @responseContent {Error} 400.application/json
 * @response 401 - Unauthorized
 * @responseContent {AuthenticationError} 401.application/json
 * @response 500 - Internal Server Error
 * @responseContent {InternalServerError} 500.application/json
 */
routes.get(
  '/users/:user_id',
  authMiddleware,
  expressRouteAdapter(getUserFactoryController()),
);

export default routes;
