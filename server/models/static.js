const { PrismaClient } = require('@prisma/client');

class StaticClass {
    static userSockets = [];
}

module.exports = StaticClass;