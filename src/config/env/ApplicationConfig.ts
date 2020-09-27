import Joi from '@hapi/joi';
import { pickAll } from 'ramda';

import BaseConfig from '@src/abstracts/BaseConfig';
import { IConfig, IApplicationConfig } from '@src/interfaces';

class ApplicationConfig
  extends BaseConfig
  implements IConfig<IApplicationConfig> {
  private readonly schema: Joi.Schema;

  constructor() {
    super();
    this.schema = Joi.object({
      NODE_ENV: Joi.string().required(),
      PORT: Joi.number().required(),
    });
  }

  getEnv(): IApplicationConfig {
    const generalEnv: IApplicationConfig = pickAll(
      ['NODE_ENV', 'PORT'],
      process.env,
    );

    return this.validateSchema(this.getSchema(), generalEnv);
  }

  getSchema(): Joi.Schema {
    return this.schema;
  }
}

export default new ApplicationConfig();
