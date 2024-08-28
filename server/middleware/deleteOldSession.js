const prismaClient = require("../models/prismaClient");

module.exports = async function (req, res, next) {
    try {
        const currentTime = new Date();
        currentTime.setUTCHours(currentTime.getUTCHours() + 3);
        await prismaClient.sessions.deleteMany({
            where: {
                date: {
                    lt: currentTime
                }
            }
        });
        next();
    } catch (error) {
        next(error);
    }
};