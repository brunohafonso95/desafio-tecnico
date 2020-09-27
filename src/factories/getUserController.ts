import GetUserController from '@src/controllers/GetUserController';
import UserRepository from '@src/repositories/UserRepository';
import GetUserService from '@src/services/GetUserService';

export default (): GetUserController => {
  const userRepository = new UserRepository();
  const getUserService = new GetUserService(userRepository);
  return new GetUserController(getUserService);
};
