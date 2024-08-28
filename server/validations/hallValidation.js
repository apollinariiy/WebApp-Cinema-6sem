const Joi = require('joi');

exports.hallValidation = (data) => {
  const schema = Joi.object({
    hallName: Joi.string().required(),
    rowsCount: Joi.number().min(1).required(),
    seatsCount: Joi.number().min(1).required(),
    price: Joi.number().min(10).required(),
  });

  return schema.validate(data);
};
