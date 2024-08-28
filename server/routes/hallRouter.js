const express = require("express");
const sessionRouter = express.Router();
const controller = require("../controllers/hallController");
const hallMiddleware = require('../middleware/hallMiddleware');
const adminAuthMiddleware = require("../middleware/adminAuthMiddleware");

sessionRouter.get('/', controller.getHalls);
sessionRouter.get('/:hallID', controller.getHallByID);
sessionRouter.post('/',adminAuthMiddleware, hallMiddleware, controller.createHall);
sessionRouter.put('/:hallID',adminAuthMiddleware, hallMiddleware, controller.updateHall);
sessionRouter.delete('/:hallID',adminAuthMiddleware, controller.deleteHall);


module.exports = sessionRouter;