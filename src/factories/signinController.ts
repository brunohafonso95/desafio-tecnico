import SigninController from '@src/controllers/SignInController';
import AuthProvider from '@src/providers/AuthProvider';
import EncryptProvider from '@src/providers/EncryptProvider';
import UserRepository from '@src/repositories/UserRepository';
import AuthenticateUserService from '@src/services/AuthenticateUserService';
import JoiAdapter from '@src/utils/JoiAdapter';

export default (): SigninController => {
  const userRepository = new UserRepository();
  const authProvider = new AuthProvider();
  const encryptProvider = new EncryptProvider();
  const joiAdapter = new JoiAdapter();
  const authenticateUserService = new AuthenticateUserService(
    userRepository,
    authProvider,
    encryptProvider,
    joiAdapter,
  );
  return new SigninController(authenticateUserService);
};
