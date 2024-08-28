const tokenService = require('./tokenService');
require('dotenv').config();
const prisma = require('../models/prismaClient');
const bcrypt = require('bcryptjs');
const ApiError = require('../exceptions/error');

class HallService {
    async getHalls() {
        const hall = await prisma.halls.findMany({})
        return hall
    }
    async getHallByID(hallID) {
        const hall = await prisma.halls.findMany({
            where: {
                id: parseInt(hallID)
            }
        })
        if (hall.length == 0) {
            throw ApiError.BadRequest('Зал с указанным ID не найден');
        }
        return hall
    }
    async createHall(data) {
        const hall = await prisma.halls.create({
            data: {
                hallName: data.hallName,
                rowsCount: parseInt(data.rowsCount),
                seatsCount: parseInt(data.seatsCount),
                price: parseInt(data.price)
            }
        })
        return hall
    }
    async updateHall(hallID, data) {
        await this.getHallByID(hallID);
        const hall = await prisma.halls.update({
            where: {
                id: parseInt(hallID)
            },
            data: {
                hallName: data.hallName,
                rowsCount: parseInt(data.rowsCount),
                seatsCount: parseInt(data.seatsCount),
                price: parseInt(data.price)
            }
        })
        return hall
    }

    async deleteHall(hallID) {
        await this.getHallByID(hallID);
        const hall = await prisma.halls.delete({
            where: {
                id: parseInt(hallID)
            }
        })
        return hall
    }
}

module.exports = new HallService()