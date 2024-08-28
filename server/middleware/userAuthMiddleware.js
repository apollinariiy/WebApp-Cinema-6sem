const jwt = require('jsonwebtoken');
require('dotenv').config();
const ApiError = require('../exceptions/error');
const tokenService = require('../services/tokenService');

module.exports = async function (req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(ApiError.UnauthorizedError());
        }
        const userData = await tokenService.validateAccessToken(authorizationHeader);
        if (userData.role !== 'USER') {
            return next(ApiError.BadRequest('Только авторизованные пользователи могут выполнять эту операцию'));
        }
        req.user = userData;
        next()
    } catch (e) {
        return next(ApiError.UnauthorizedError());
    }
};