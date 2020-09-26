import Joi from '@hapi/joi';
import { pickAll } from 'ramda';

import BaseConfig from '@src/abstracts/BaseConfig';
import IAuthConfig from '@src/interfaces/IAuthConfig';
import IConfig from '@src/interfaces/IConfig';

class AuthConfig extends BaseConfig implements IConfig<IAuthConfig> {
  private readonly schema: Joi.Schema;

  constructor() {
    super();
    this.schema = Joi.object({
      AUTH_SECRET: Joi.string().required(),
      AUTH_EXPIRES_IN: Joi.string().required(),
    });
  }

  public getEnv(): IAuthConfig {
    const mongoEnv: IAuthConfig = pickAll(
      ['AUTH_SECRET', 'AUTH_EXPIRES_IN'],
      process.env,
    );

    return this.validateSchema<IAuthConfig>(this.getSchema(), mongoEnv);
  }

  public getSchema(): Joi.Schema {
    return this.schema;
  }
}

export default new AuthConfig();
