import Joi from '@hapi/joi';

export default Joi.object({
  NODE_ENV: Joi.string().required(),
  PORT: Joi.number().required(),
});
