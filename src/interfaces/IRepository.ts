export default interface IRepository<T = any, R = any> {
  create(payload: T): Promise<R>;
}
