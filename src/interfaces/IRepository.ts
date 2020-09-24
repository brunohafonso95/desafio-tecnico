export default interface IRepository {
  create<T = any, R = any>(payload: T): Promise<R>;
  getBySpecificField<T = any, R = any>(
    fieldName: keyof T,
    fieldValue: any,
  ): Promise<R | null>;
  updateBySpecificField<T = any, R = any>(
    fieldName: keyof T,
    fieldValue: any,
    payload: Partial<T>,
  ): Promise<R | null>;
}
