import SignupController from '@src/controllers/SignUpController';
import AuthProvider from '@src/providers/AuthProvider';
import UserRepository from '@src/repositories/UserRepository';
import CreateUserService from '@src/services/CreateUserService';
import JoiAdapter from '@src/utils/JoiAdapter';

export default (): SignupController => {
  const userRepository = new UserRepository();
  const authProvider = new AuthProvider();
  const joiAdapter = new JoiAdapter();
  const createUserService = new CreateUserService(
    userRepository,
    authProvider,
    joiAdapter,
  );
  return new SignupController(createUserService);
};
