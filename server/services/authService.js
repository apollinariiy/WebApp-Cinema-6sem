const UserDto = require('../dtos/userdto');
const tokenService = require('./tokenService');
require('dotenv').config();
const prisma = require('../models/prismaClient');
const bcrypt = require('bcryptjs');
const AuthError = require('../exceptions/error');

class AuthService {
    async registration(data) {
        console.log(data);
        const candidate = await prisma.users.findFirst({
            where: {
                email: data.email
            }
        })
        if (candidate) {
            throw AuthError.BadRequest('Пользователь с таким email уже существует');
        }
        const hashPassword = bcrypt.hashSync(data.password, 3);
        const newUser = await prisma.users.create({
            data: {
                surname: data.surname,
                name: data.name,
                email: data.email,
                phone: data.phone,
                password: hashPassword,
                role: 'USER'
            }
        })
        const userDto = new UserDto(newUser);
        const tokens = await tokenService.generateTokens({ id: userDto.id, role: userDto.role })
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {
            ...tokens,
            user: userDto
        }
    }



    async login(email, password) {
        const user = await prisma.users.findFirst({
            where: {
                email: email
            }
        })
        if (!user) {
            throw AuthError.BadRequest('Пользователь с таким email не найден')
        }
        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            throw AuthError.BadRequest('Неверный пароль')
        }
        const userDto = new UserDto(user);
        const tokens = await tokenService.generateTokens({ id: userDto.id, role: userDto.role })
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {
            ...tokens,
            user: userDto
        }
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async update(userID, data) {
        const candidate = await prisma.users.findFirst({
            where: {
                id: parseInt(userID)
            }
        })
        if (candidate.length == 0) {
            throw AuthError.BadRequest('Пользователя не существует');
        }
        const updateUser = await prisma.users.update({
            where: {
                id: candidate.id
            },
            data: {
                surname: data.surname,
                name: data.name,
                email: data.email,
                phone: data.phone
            }
        })
        const userDto = new UserDto(updateUser);
        return {
            user: userDto
        }
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw AuthError.UnauthorizedError();
        }
        const userData = await tokenService.validateRefreshToken(refreshToken);
        const tokenFromDB = await tokenService.findToken(refreshToken)
        if (!userData || !tokenFromDB) {
            throw AuthError.UnauthorizedError();
        }
        const user = await prisma.users.findUnique({
            where: {
                id: userData.id
            }
        })
        const userDto = new UserDto(user);
        const tokens = await tokenService.generateTokens({ id: userDto.id, role: userDto.role })
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {
            ...tokens,
            user: userDto
        }
    }
}

module.exports = new AuthService()