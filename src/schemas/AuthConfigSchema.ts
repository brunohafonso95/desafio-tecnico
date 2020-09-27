import Joi from '@hapi/joi';

export default Joi.object({
  AUTH_SECRET: Joi.string().required(),
  AUTH_EXPIRES_IN: Joi.string().required(),
});
