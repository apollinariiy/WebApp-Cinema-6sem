const AuthService = require('../services/authService');
const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/error');
const authService = require('../services/authService');

class authController {
    async registration(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(ApiError.BadRequest('Ошибка при валидации', errors.array()));
        }
        try {
            const data = req.body;
            console.log(data);
            const userData = await AuthService.registration(data)
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true })
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const userData = await AuthService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true })
            return res.json(userData)
        } catch (e) {
            next(e)

        }

    }

    async update(req, res, next) {
        try {
            const data = req.body;
            const userID = req.user.id;
            console.log(data);
            const userData = await AuthService.update(userID, data)
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const token = await authService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token)
        } catch (e) {
            next(e)
        }

    }

    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const token = await authService.refresh(refreshToken);
            res.cookie('refreshToken', token.refreshToken, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true })
            return res.json(token)
        } catch (e) {
            next(e)
        }

    }
}

module.exports = new authController();