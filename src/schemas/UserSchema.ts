import Joi from '@hapi/joi';

export default Joi.object({
  nome: Joi.string().required(),
  email: Joi.string().email().required(),
  senha: Joi.string().required(),
  telefones: Joi.array()
    .items(
      Joi.object({
        numero: Joi.string().required(),
        ddd: Joi.string().required(),
      }),
    )
    .required(),
});
