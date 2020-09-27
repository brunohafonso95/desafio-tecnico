import Joi from '@hapi/joi';

export default Joi.object({
  MONGODB_HOST: Joi.string().required(),
  MONGODB_USER: Joi.string().optional(),
  MONGODB_SSL: Joi.boolean().required(),
  MONGODB_PORT: Joi.number().required(),
  MONGODB_PASSWORD: Joi.string().optional(),
  MONGODB_DATABASE: Joi.string().required(),
});
