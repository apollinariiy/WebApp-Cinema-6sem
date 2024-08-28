const Joi = require('joi');

exports.movieValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    duration: Joi.number().required(),
    genre: Joi.string().required(),
    ageLimit: Joi.number().max(21).required(),
    description: Joi.string().required()
  });

  return schema.validate(data)
}
