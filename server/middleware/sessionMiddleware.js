const jwt = require('jsonwebtoken');
require('dotenv').config();
const ApiError = require('../exceptions/error');
const tokenService = require('../services/tokenService');
const { sessionValidation } = require('../validations/sessionValidation');

module.exports = function (req, res, next) {
    try {
        console.log(req.body);
        const { error } = sessionValidation(req.body);
        console.log(error);
        if (error) {
            return next(ApiError.BadRequest(`Ошибка параметров: ${error.details[0].message}`));
        }
        next();
    } catch (e) {
        return next(e);
    }
};