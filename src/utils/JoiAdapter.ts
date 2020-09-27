import { Schema, ValidationError } from '@hapi/joi';

import ISchemaValidator from '@src/interfaces/ISchemaValidator';

export default class JoiAdapter implements ISchemaValidator {
  public validateSchema<T = any>(
    schema: Schema,
    value: any,
    errorMessage = 'Please check the following validation errors',
  ): T {
    const result = schema.validate(value, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (result.error) {
      throw new Error(
        this.getSchemaErrorValidation(result.error, errorMessage),
      );
    }

    return result.value;
  }

  public getSchemaErrorValidation(
    validationErrors: ValidationError,
    message: string,
  ): string {
    const schemaErrorDetails = validationErrors.details
      .map(errorDetail => errorDetail.message)
      .join(' ');

    return `${message}: ${schemaErrorDetails}`;
  }
}
