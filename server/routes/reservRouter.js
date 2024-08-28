const express = require("express");
const reservRouter = express.Router();
const controller = require("../controllers/reservController");
const reservMiddleware = require('../middleware/reservationMiddleware')
const userAuthMiddleware = require('../middleware/userAuthMiddleware')


reservRouter.get('/user', userAuthMiddleware, controller.getReservByUserID);
reservRouter.get('/:sessionID', controller.getReservBySessionID);
reservRouter.get('/', controller.getReserv);
reservRouter.post('/pay', userAuthMiddleware, reservMiddleware, controller.makePayment);
reservRouter.delete('/delete', userAuthMiddleware, controller.deleteReservation);


module.exports = reservRouter;