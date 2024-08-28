const express = require("express");
const sessionRouter = express.Router();
const controller = require("../controllers/sessionController");
const sessionMiddleware = require('../middleware/sessionMiddleware');
const adminAuthMiddleware = require("../middleware/adminAuthMiddleware");
const deleteOldSession = require("../middleware/deleteOldSession");
sessionRouter.use(deleteOldSession);
sessionRouter.get('/session/:movieID/:date', controller.getSessionByDate);
sessionRouter.get('/', controller.getSession);
sessionRouter.get('/:sessionID', controller.getSessionByID);
sessionRouter.post('/create', adminAuthMiddleware, sessionMiddleware, controller.createSession);
sessionRouter.put('/:sessionID', adminAuthMiddleware, sessionMiddleware, controller.updateSession);
sessionRouter.delete('/:sessionID', adminAuthMiddleware, controller.deleteSession);


module.exports = sessionRouter;