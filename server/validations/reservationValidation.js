const Joi = require('joi');

exports.reservationValidation = (data) => {
  const schema = Joi.object({
    sessionId: Joi.number().min(1).required(),
    userId: Joi.number().min(1).required(),
    RowNumber: Joi.number().min(1).required().message('Выберите место'),
    SeatNumber: Joi.number().min(1).required().message('Выберите место'),
  });
  return schema.validate(data);
};