const express = require("express");
const authRouter = express.Router();
const controller = require("../controllers/authController.js");
const userAuthMiddleware = require("../middleware/userAuthMiddleware.js");
const userMiddleware = require("../middleware/userMiddleware.js");


authRouter.post('/registration', userMiddleware, controller.registration);
authRouter.post('/login', controller.login);
authRouter.post('/logout', controller.logout);
authRouter.put('/update', userAuthMiddleware, controller.update);
authRouter.get('/refresh', controller.refresh);

module.exports = authRouter;