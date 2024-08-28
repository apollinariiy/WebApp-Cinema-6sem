const AuthService = require('../services/authService');
const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/error');
const MovieService = require('../services/movieService');
const multer = require('multer');
const mime = require('mime-types');
const upload = multer();


class movieController {
    async getMovie(req, res, next) {
        try {
            const movies = await MovieService.getMovies();
            return res.json(movies)
        } catch (e) {
            next(e)
        }
    }
    async getMovieByID(req, res, next) {
        try {
            const movieID = req.params.movieID;
            if (!Number.isInteger(Number(movieID))) {
                throw ApiError.BadRequest('ID должен быть целым числом');
            }
            const movies = await MovieService.getMoviesByID(movieID);
            return res.json(movies)
        } catch (e) {
            next(e)
        }
    }
    async getMovieByGenre(req, res, next) {
        try {
            const genre = req.params.genre;
            const movies = await MovieService.getMoviesByGenre(genre);
            return res.json(movies)
        } catch (e) {
            next(e)
        }
    }
    async updateMovie(req, res, next) {
        try {
            const data = req.body;
            const movieID = req.params.movieID;
            if (!Number.isInteger(Number(movieID))) {
                throw ApiError.BadRequest('ID должен быть целым числом');
            }
            const movies = await MovieService.updateMovie(movieID, data);
            return res.json(movies)
        } catch (e) {
            next(e)
        }
    }

    async deleteMovie(req, res, next) {
        try {
            const movieID = req.params.movieID;
            if (!Number.isInteger(Number(movieID))) {
                throw ApiError.BadRequest('ID должен быть целым числом');
            }
            const movies = await MovieService.deleteMovie(movieID);
            return res.json(movies)
        } catch (e) {
            next(e)
        }
    }

    async updateMovieImage(req, res, next) {
        try {
            if (!req.file) {
                throw ApiError.BadRequest('Файл не был загружен');
            }
            const movieImage = req.file.buffer;
            const movieID = req.params.movieID;
            if (!Number.isInteger(Number(movieID))) {
                throw ApiError.BadRequest('ID должен быть целым числом');
            }
            const mimeType = mime.contentType(req.file.originalname);
            if (!mimeType || (mimeType !== 'image/jpeg' && mimeType !== 'image/png')) {
                throw ApiError.BadRequest('Неверный тип изображения. Допустимые форматы: JPEG и PNG.');
            }
            const movies = await MovieService.updateMovieImage(movieID, movieImage);
            return res.json(movies)
        } catch (e) {
            next(e)
        }
    }

    async createMovie(req, res, next) {
        try {
            if (!req.file) {
                throw ApiError.BadRequest('Файл не был загружен');
            }
            const movieImage = req.file.buffer;
            const data = req.body;
            const mimeType = mime.contentType(req.file.originalname);
            if (!mimeType || (mimeType !== 'image/jpeg' && mimeType !== 'image/png')) {
                throw ApiError.BadRequest('Неверный тип изображения. Допустимые форматы: JPEG и PNG.');
            }
            const movies = await MovieService.createMovie(movieImage, data);
            return res.json(movies)
        } catch (e) {
            next(e)
        }
    }
}
module.exports = new movieController();