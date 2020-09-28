import {
  IAuthProvider,
  ICreateUserService,
  IUser,
  IUserRepository,
} from '@src/interfaces';
import ISchemaValidator from '@src/interfaces/ISchemaValidator';
import * as schemas from '@src/schemas';

interface ICreateUser extends IUser {
  id: string;
}
export default class CreateUserService implements ICreateUserService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly authProvider: IAuthProvider,
    private readonly joiAdapter: ISchemaValidator,
  ) {}

  public async execute(userData: IUser): Promise<ICreateUser> {
    const validatedUserData = this.joiAdapter.validateSchema<IUser>(
      schemas.UserSchema,
      userData,
    );
    const token = this.authProvider.generateUserToken(validatedUserData);
    const newUser = (await this.userRepository.create({
      ...userData,
      token,
    })) as ICreateUser;

    return newUser;
  }
}
