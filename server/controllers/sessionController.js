const AuthService = require('../services/authService');
const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/error');
const SessionService = require('../services/sessionService');
const movieService = require('../services/movieService');

class sessionController {
    async getSessionByDate(req, res, next) {
        try {
            const date = req.params.date;
            const movieID = req.params.movieID;
            if (!Number.isInteger(Number(movieID))) {
                throw ApiError.BadRequest('ID должен быть целым числом');
            }
            await movieService.getMoviesByID(movieID)
            const session = await SessionService.getSessionsByDate(date, movieID);
            return res.json(session)
        } catch (e) {
            next(e)
        }
    }

    async getSession(req, res, next) {
        try {
            const session = await SessionService.getSession();
            return res.json(session)
        } catch (e) {
            next(e)
        }
    }

    async getSessionByID(req, res, next) {
        try {
            const sessionID = req.params.sessionID;
            if (!Number.isInteger(Number(sessionID))) {
                throw ApiError.BadRequest('ID должен быть целым числом');
            }
            const session = await SessionService.getSessionByID(sessionID);
            return res.json(session)
        } catch (e) {
            next(e)
        }
    }
    async createSession(req, res, next) {
        try {
            const data = req.body;
            const session = await SessionService.createSession(data);
            return res.json(session)
        } catch (e) {
            next(e)
        }
    }

    async updateSession(req, res, next) {
        try {
            const data = req.body;
            const sessionID = req.params.sessionID;
            if (!Number.isInteger(Number(sessionID))) {
                throw ApiError.BadRequest('ID должен быть целым числом');
            }
            const session = await SessionService.updateSession(sessionID, data);
            return res.json(session)
        } catch (e) {
            next(e)
        }
    }

    async deleteSession(req, res, next) {
        try {
            const sessionID = req.params.sessionID;
            if (!Number.isInteger(Number(sessionID))) {
                throw ApiError.BadRequest('ID должен быть целым числом');
            }
            const session = await SessionService.deleteSession(sessionID);
            return res.json(session)
        } catch (e) {
            next(e)
        }
    }



}
module.exports = new sessionController();