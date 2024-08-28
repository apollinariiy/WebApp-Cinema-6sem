const express = require("express");
const movieRouter = express.Router();
const controller = require("../controllers/movieController.js");
const movieMiddleware = require('../middleware/movieMiddleware.js')
const multer  = require('multer');
const adminAuthMiddleware = require("../middleware/adminAuthMiddleware.js");
const upload = multer();

movieRouter.get('/:movieID', controller.getMovieByID);
movieRouter.get('/genre/:genre', controller.getMovieByGenre);
movieRouter.post('/create',adminAuthMiddleware, upload.single('file'), movieMiddleware, controller.createMovie);
movieRouter.put('/update/:movieID',adminAuthMiddleware,movieMiddleware, controller.updateMovie);
movieRouter.put('/update/image/:movieID',adminAuthMiddleware, upload.single('file'), controller.updateMovieImage);
movieRouter.get('/', controller.getMovie);
movieRouter.delete('/:movieID',adminAuthMiddleware, controller.deleteMovie);

module.exports = movieRouter;