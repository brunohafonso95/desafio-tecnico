export default interface ISchemaValidator {
  validateSchema<T = any>(schema: any, value: any, errorMessage?: string): T;
  getSchemaErrorValidation(validationErrors: any, message: 'string'): string;
}
