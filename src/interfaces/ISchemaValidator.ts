export default interface ISchemaValidator {
  validateSchema(schema: any, value: any, errorMessage: string): any;
  getSchemaErrorValidation(validationErrors: any, message: 'string'): string;
}
