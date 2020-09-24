export default interface IEncryptProvider {
  generateHash(payload: string, salt: number): Promise<string>;
  compareHash(originalString: string, hashedString: string): Promise<boolean>;
}
