import Joi from '@hapi/joi';

export default interface IConfig<T> {
  getEnv: () => T;
  readonly getSchema: () => Joi.Schema;
}
