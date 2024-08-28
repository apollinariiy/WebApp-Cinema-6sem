const tokenService = require('./tokenService');
require('dotenv').config();
const prisma = require('../models/prismaClient');
const bcrypt = require('bcryptjs');
const ApiError = require('../exceptions/error');
const ImageService = require('./ImageService');

class MovieService {
  async getMovies() {
    const movies = await prisma.movies.findMany({});
    return movies
  }
  async getMoviesByID(movieID) {
    const movies = await prisma.movies.findMany({
      where: {
        id: parseInt(movieID)
      }
    });
    if (movies.length === 0) {
      throw ApiError.BadRequest('Фильм с указанным ID не найден');
    }
    return movies
  }
  async getMoviesByGenre(genre) {
    const movies = await prisma.movies.findMany({
      where: {
        genre: genre
      }
    });
    if (!movies) {
      throw ApiError.BadRequest('Данные не найдены');
    }
    return movies
  }
  async deleteMovie(movieID) {
    await this.getMoviesByID(movieID);
    const movies = await prisma.movies.delete({
      where: {
        id: parseInt(movieID)
      }
    });
    return movies
  }
  async updateMovie(movieID, data) {
    await this.getMoviesByID(movieID);
    const movies = await prisma.movies.update({
      where: {
        id: parseInt(movieID)
      },
      data: {
        title: data.title,
        duration: parseInt(data.duration),
        genre: data.genre,
        ageLimit: parseInt(data.ageLimit),
        description: data.description
      }
    });
    if (!movies) {
      throw ApiError.BadRequest('Ошибка при обновлении');
    }
    return movies
  }
  async updateMovieImage(movieID, movieImage) {
    await this.getMoviesByID(movieID);
    const image = await ImageService.uploadImage(movieImage);
    if (!image) {
      throw ApiError.BadRequest('Ошибка при обновлении фото');
    }
    const movies = await prisma.movies.update({
      where: {
        id: parseInt(movieID)
      },
      data: {
        image: image
      }
    });
    if (!movies) {
      throw ApiError.BadRequest('Ошибка при обновлении');
    }
    return movies
  }

  async createMovie(movieImage, data) {

    const image = await ImageService.uploadImage(movieImage);
    if (!image) {
      throw ApiError.BadRequest('Ошибка при обновлении фото');
    }
    const movie = await prisma.movies.create({
      data: {
        title: data.title,
        duration: parseInt(data.duration),
        genre: data.genre,
        ageLimit: parseInt(data.ageLimit),
        description: data.description,
        image: image
      }
    });
    if (!movie) {
      throw ApiError.BadRequest('Фильм не создан');
    }
    return movie
  }
}

module.exports = new MovieService()