import bcrypt from 'bcrypt';

import IEncryptProvider from '@src/interfaces/IEncryptProvider';

export default class EncryptProvider implements IEncryptProvider {
  public async generateHash(password: string, salt = 10): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  public async compareHash(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
