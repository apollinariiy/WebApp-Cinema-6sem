const jwt = require('jsonwebtoken');
require('dotenv').config();
const ApiError = require('../exceptions/error');
const tokenService = require('../services/tokenService');

module.exports = async function (socket, next) {
    try {
        const token = socket.handshake.headers.authorization;
        if (!token) {
            return next(ApiError.UnauthorizedError());
        }
        const userData = await tokenService.validateAccessToken(token);
        if (!userData) {
            return next(ApiError.UnauthorizedError());
        }

        socket.user = userData;
        next();
    } catch (e) {
        return next(ApiError.UnauthorizedError());
    }
};