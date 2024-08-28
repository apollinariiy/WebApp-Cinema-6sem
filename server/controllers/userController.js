const prisma = require('../models/prismaClient');

class userController {
    async deleteUser(req, res, next) {
        try {
            const userID = req.params.userID;
            if (!Number.isInteger(Number(userID))) {
                throw ApiError.BadRequest('ID должен быть целым числом');
            }
            const user = await prisma.users.delete({
                where: {
                    id: parseInt(userID)
                }
            });
            return res.json(user)
        } catch (e) {
            next(e)
        }
    }
    async getUsers(req, res, next) {
        try {
            const users = await prisma.users.findMany({});
            return res.json(users)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new userController();