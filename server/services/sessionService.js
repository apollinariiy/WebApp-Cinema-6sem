const tokenService = require('./tokenService');
require('dotenv').config();
const prisma = require('../models/prismaClient');
const bcrypt = require('bcryptjs');
const ApiError = require('../exceptions/error');
const movieService = require('./movieService');
const hallService = require('./hallService');

class SessionService {
  async getSessionsByDate(date, movieId) {
    const movie = await prisma.movies.findMany({
      where: {
        id: parseInt(movieId)
      }
    });
    if (movie.length == 0) {
      throw ApiError.BadRequest('Фильм с указанным ID не найден');
    }
    const sessions = await prisma.sessions.findMany({
      where: {
        movieId: parseInt(movieId),
        date: {
          gte: new Date(date + 'T00:00:00.000Z'),
          lte: new Date(date + 'T23:59:59.999Z'),
        },
      },
      include: {
        movie: true,
        hall: true,
      },
    });
    return sessions
  }


  async getSession() {
    const sessions = await prisma.sessions.findMany({});
    if (!sessions) {
      throw ApiError.BadRequest('Данные не найдены');
    }
    return sessions
  }

  async getSessionByID(sessionID) {
    const sessions = await prisma.sessions.findMany({
      where: {
        id: parseInt(sessionID),
      }
    });
    if (sessions.length == 0) {
      throw ApiError.BadRequest('Сеанс с указанным ID не найден');
    }
    return sessions
  }

  async createSession(data) {

    const selectmovie = await movieService.getMoviesByID(data.movieId);
    const currentTime = new Date(data.date + 'Z');
    const nextHourTime = new Date(currentTime);
    nextHourTime.setUTCMinutes(nextHourTime.getUTCMinutes() + selectmovie[0].duration);
    const sessionByDate = await prisma.sessions.findMany({
      where: {
        hallId: parseInt(data.hallId),
          date: {
            gte: currentTime,
            lte: nextHourTime
          }
      },
    });
    if (sessionByDate.length !== 0){
      throw ApiError.BadRequest('Зал в это время занят');
    }
    await hallService.getHallByID(data.hallId);
    console.log(new Date(data.date + 'Z'));
    const movie = await prisma.sessions.create({
      data: {
        date: new Date(data.date + 'Z'),
        movieId: parseInt(data.movieId),
        hallId: parseInt(data.hallId)
      }
    })
    return movie
  }

  async updateSession(sessionID, data) {
    await this.getSessionByID(sessionID);
    const selectmovie = await movieService.getMoviesByID(data.movieId);
    const currentTime = new Date(data.date + 'Z');
    const nextHourTime = new Date(currentTime);
    nextHourTime.setUTCMinutes(nextHourTime.getUTCMinutes() + selectmovie[0].duration);
    const sessionByDate = await prisma.sessions.findMany({
      where: {
        hallId: parseInt(data.hallId),
          date: {
            gte: currentTime,
            lte: nextHourTime
          }
      },
    });
    if (sessionByDate.length !== 0){
      throw ApiError.BadRequest('Зал в это время занят');
    }
    await hallService.getHallByID(data.hallId);
    const movie = await prisma.sessions.update({
      where: {
        id: parseInt(sessionID)
      },
      data: {
        date: new Date(data.date + 'Z'),
        movieId: parseInt(data.movieId),
        hallId: parseInt(data.hallId)
      }
    })
    console.log(movie);
    return movie
  }

  async deleteSession(sessionID) {
    await this.getSessionByID(sessionID);
    const movie = await prisma.sessions.delete({
      where: {
        id: parseInt(sessionID)
      }
    })
    return movie
  }
}

module.exports = new SessionService()