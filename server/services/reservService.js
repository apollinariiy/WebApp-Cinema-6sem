const tokenService = require('./tokenService');
require('dotenv').config();
const prisma = require('../models/prismaClient');
const bcrypt = require('bcryptjs');
const ApiError = require('../exceptions/error');
const sessionService = require('./sessionService');
const stripe = require('stripe')(process.env.STRIPE_SECRET);

class ReservService {
  async getReservBySessionID(sessionID) {
    const reserv = await prisma.reservations.findMany({
      where: {
        sessionId: parseInt(sessionID),
      }
    });
    const session = await prisma.sessions.findUnique({
      where: {
        id: parseInt(sessionID),
      },
      include: {
        hall: true,
        movie: true
      },
    });
    if (session == null) {
      throw ApiError.BadRequest('Сеанса не существует');
    }
    return { reserv, session }
  }

  async getReservation() {
    const reserv = await prisma.reservations.findMany({
    });
    return reserv
  }

  async create(reserv) {
    await sessionService.getSessionByID(reserv.sessionId);
    const selectedSeats = await prisma.reservations.findMany({
      where: {
        RowNumber: reserv.RowNumber,
        SeatNumber: reserv.SeatNumber,
        sessionId: parseInt(reserv.sessionId)
      }
    });
    if(selectedSeats.length !== 0){
      throw ApiError.BadRequest('Указанное место занято');
    }
    const newReserv = await prisma.reservations.create({
      data: {
        sessionId: parseInt(reserv.sessionId),
        userId: parseInt(reserv.userId),
        RowNumber: reserv.RowNumber,
        SeatNumber: reserv.SeatNumber
      }
    });
    return newReserv
  }

  async getReservationsForNextHour(userId) {
    const currentTime = new Date();
    currentTime.setUTCHours(currentTime.getUTCHours() + 3);
    const nextHourTime = new Date(currentTime);
    nextHourTime.setUTCHours(nextHourTime.getUTCHours() + 1);
    const reserv = await prisma.reservations.findMany({
      where: {
        userId: parseInt(userId),
        session: {
          date: {
            gte: currentTime,
            lt: nextHourTime
          }
        }
      },
      include: {
        session: true
      }
    });
    return reserv;
  }


  async getReservByUserId(userId) {
    const user = await prisma.users.findMany({
      where: {
        id: parseInt(userId)
      }
    })
    if (user.length == 0) {
      throw ApiError.BadRequest('Пользователь с указанным ID не найден');
    }
    const reserv = await prisma.reservations.findMany({
      where: {
        userId: parseInt(userId)
      },
      include: {
        session: {
          include: {
            movie: true,
            hall: true
          }
        }
      }
    });
    return reserv;
  }


  async deleteReservation(reservId) {
    const currentReserv = await prisma.reservations.findMany({
      where: {
        id: parseInt(reservId)
      }
    });
    if (currentReserv.length == 0) {
      throw ApiError.BadRequest('Бронь с указанным ID не найден');
    }
    const reserv = await prisma.reservations.delete({
      where: {
        id: parseInt(reservId)
      }
    });
    return reserv;
  }

}

module.exports = new ReservService()