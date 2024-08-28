const StaticClass = require("../models/static.js");
const reservService = require("./reservService.js");

class SocketService {

    static async addUser(userId, socketId) {
        const index = StaticClass.userSockets.findIndex(user => user.id === userId);
        if (index !== -1) {
            StaticClass.userSockets[index].socketId = socketId;
        } else {
            StaticClass.userSockets.push({ userId, socketId });
        }
    }
    static async deleteUser(socketId) {
        StaticClass.userSockets = StaticClass.userSockets.filter(socketUser => socketUser.socketId != socketId);
    }
    static async checkAndNotify(io) {
        for (const user of StaticClass.userSockets) {
            const reservUser = await reservService.getReservationsForNextHour(user.userId);
            if (reservUser) {
                for (const reserv of reservUser) {
                    io.to(user.socketId).emit('reserv-alert', {
                        date: reserv.session.date
                    });
                }
            }
        }

    }

}

module.exports = SocketService;