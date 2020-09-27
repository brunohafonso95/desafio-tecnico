import SignupController from '@src/controllers/SignUpController';
import UserRepository from '@src/repositories/UserRepository';
import CreateUserService from '@src/services/CreateUserService';

export default (): SignupController => {
  const userRepository = new UserRepository();
  const createUserService = new CreateUserService(userRepository);
  return new SignupController(createUserService);
};
