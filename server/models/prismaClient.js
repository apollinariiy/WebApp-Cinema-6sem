const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class DBInstance {
    prisma;
    constructor() {
        this.prisma = prisma;
    }
}


module.exports = new DBInstance().prisma;