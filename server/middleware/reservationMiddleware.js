const jwt = require('jsonwebtoken');
require('dotenv').config();
const ApiError = require('../exceptions/error');
const tokenService = require('../services/tokenService');
const { reservationValidation } = require('../validations/reservationValidation');

module.exports = function (req, res, next) {
    try {
        console.log('req.body');
        const { dataPay, reservations } = req.body
        if (reservations.length === 0) {
            return next(ApiError.BadRequest(`Выберите место`));
        }
        console.log(reservations);
        next();
    } catch (e) {
        return next(e);
    }
};