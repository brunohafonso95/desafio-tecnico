export default interface IAuthProvider<T = any> {
  generateToken(payload: {
    [key: string]: string | boolean | number | any;
  }): string;
  decodeToken(token: string): T;
}
