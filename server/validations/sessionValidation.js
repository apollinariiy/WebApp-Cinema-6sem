const Joi = require('joi');

exports.sessionValidation = (data) => {
  const schema = Joi.object({
    date: Joi.date().greater(new Date()).required(),
    movieId: Joi.number().min(1).required(),
    hallId: Joi.number().min(1).required(),
  });
  return schema.validate(data);
};