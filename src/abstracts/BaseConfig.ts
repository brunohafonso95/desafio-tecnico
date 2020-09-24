import Joi from '@hapi/joi';

export default abstract class BaseConfig {
  validateSchema<T = any>(schema: Joi.Schema, value: T): T {
    const result = schema.validate(value, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (result.error) {
      throw new Error(this.getSchemaErrorValidation(result.error));
    }

    return result.value;
  }

  getSchemaErrorValidation(validationErrors: Joi.ValidationError): string {
    const schemaErrorDetails = validationErrors.details
      .map(errorDetail => errorDetail.message)
      .join(' ');

    return `Error on env variables, please check the follow datails:\n\n ${schemaErrorDetails}`;
  }
}
