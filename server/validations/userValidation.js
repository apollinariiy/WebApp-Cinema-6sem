const Joi = require('joi');

exports.userValidation = (data) => {
  const schema = Joi.object({
    surname: Joi.string().required(),
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().length(12).required(),
    password: Joi.string().min(6).required()
  });

  return schema.validate(data);
};