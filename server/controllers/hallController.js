const AuthService = require('../services/authService');
const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/error');
const SessionService = require('../services/sessionService');
const hallService = require('../services/hallService');

class hallController {
    async getHalls(req, res, next) {
        try {
            const session = await hallService.getHalls();
            return res.json(session)
        } catch (e) {
            next(e)
        }
    }

    async getHallByID(req, res, next) {
        try {
            const hallID = req.params.hallID;
            if (!Number.isInteger(Number(hallID))) {
                throw ApiError.BadRequest('ID должен быть целым числом');
            }
            const hall = await hallService.getHallByID(hallID);
            return res.json(hall)
        } catch (e) {
            next(e)
        }
    }

    async createHall(req, res, next) {
        try {
            const data = req.body;
            const hall = await hallService.createHall(data);
            return res.json(hall)
        } catch (e) {
            next(e)
        }
    }

    async updateHall(req, res, next) {
        try {
            const hallID = req.params.hallID;
            if (!Number.isInteger(Number(hallID))) {
                throw ApiError.BadRequest('ID должен быть целым числом');
            }
            const data = req.body;
            const hall = await hallService.updateHall(hallID, data);
            return res.json(hall)
        } catch (e) {
            next(e)
        }
    }

    async deleteHall(req, res, next) {
        try {
            const hallID = req.params.hallID;
            if (!Number.isInteger(Number(hallID))) {
                throw ApiError.BadRequest('ID должен быть целым числом');
            }
            const hall = await hallService.deleteHall(hallID);
            return res.json(hall)
        } catch (e) {
            next(e)
        }
    }


}
module.exports = new hallController();