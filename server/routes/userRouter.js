const express = require("express");
const userController = require("../controllers/userController.js");
const userRouter = express.Router();
const authMiddleware = require('../middleware/userAuthMiddleware.js');
const adminAuthMiddleware = require("../middleware/adminAuthMiddleware.js");

userRouter.delete("/:userID",adminAuthMiddleware, userController.deleteUser);
userRouter.get("/",adminAuthMiddleware, userController.getUsers);

module.exports = userRouter;