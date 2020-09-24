import Joi from '@hapi/joi';
import { pickAll } from 'ramda';

import BaseConfig from '@src/abstracts/BaseConfig';
import IConfig from '@src/interfaces/IConfig';
import IMongoConfig from '@src/interfaces/IMongoConfig';

class MongoConfig extends BaseConfig implements IConfig<IMongoConfig> {
  private readonly schema: Joi.Schema;

  constructor() {
    super();
    this.schema = Joi.object({
      MONGODB_HOST: Joi.string().required(),
      MONGODB_USER: Joi.string().optional(),
      MONGODB_SSL: Joi.boolean().required(),
      MONGODB_PORT: Joi.number().required(),
      MONGODB_PASSWORD: Joi.string().optional(),
      MONGODB_DATABASE: Joi.string().required(),
    });
  }

  public getEnv(): IMongoConfig {
    const mongoEnv: IMongoConfig = pickAll(
      [
        'MONGODB_HOST',
        'MONGODB_USER',
        'MONGODB_SSL',
        'MONGODB_PORT',
        'MONGODB_PASSWORD',
        'MONGODB_DATABASE',
      ],
      process.env,
    );

    return this.validateSchema<IMongoConfig>(this.getSchema(), mongoEnv);
  }

  public getSchema(): Joi.Schema {
    return this.schema;
  }
}

export default new MongoConfig();
