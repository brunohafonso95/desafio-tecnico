export default interface IService<T = any, R = any> {
  execute(payload: T): Promise<R>
}
