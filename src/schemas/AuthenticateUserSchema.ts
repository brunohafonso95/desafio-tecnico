import Joi from '@hapi/joi';

export default Joi.object({
  email: Joi.string().email().required(),
  senha: Joi.string().required(),
});
